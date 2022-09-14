import {ChevronDownIcon, ChevronRightIcon} from '@primer/octicons-react'
import {useSSRSafeId} from '@react-aria/ssr'
import React from 'react'
import styled from 'styled-components'
import Box from '../Box'
import sx, {SxProp} from '../sx'

// ----------------------------------------------------------------------------
// Context

const RootContext = React.createContext<{isFocused: boolean; activeDescendant: string}>({
  isFocused: false,
  activeDescendant: ''
})

const ItemContext = React.createContext<{
  level: number
  isExpanded: boolean
}>({
  level: 1,
  isExpanded: false
})

// ----------------------------------------------------------------------------
// TreeView

export type TreeViewProps = {
  'aria-label'?: React.AriaAttributes['aria-label']
  'aria-labelledby'?: React.AriaAttributes['aria-labelledby']
  children: React.ReactNode
}

const UlBox = styled.ul<SxProp>(sx)

const Root: React.FC<TreeViewProps> = ({'aria-label': ariaLabel, 'aria-labelledby': ariaLabelledby, children}) => {
  const [isFocused, setIsFocused] = React.useState(false)
  const [activeDescendant, setActiveDescendant] = React.useState('')

  React.useEffect(() => {
    // Initialize the active descendant to the first item in the tree
    if (!activeDescendant) {
      const firstItem = document.querySelector('[role="treeitem"]')
      if (firstItem) setActiveDescendant(firstItem.id)
    }
  }, [activeDescendant])

  return (
    <RootContext.Provider value={{isFocused, activeDescendant}}>
      <UlBox
        tabIndex={0}
        role="tree"
        aria-label={ariaLabel}
        aria-labelledby={ariaLabelledby}
        aria-activedescendant={activeDescendant}
        sx={{
          listStyle: 'none',
          padding: 0,
          margin: 0,
          // We'll display a focus ring around the active descendant
          // instead of the tree itself
          outline: 0
        }}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        onKeyDown={event => {
          const activeElement = document.getElementById(activeDescendant)

          if (!activeElement) return

          const nextElement = getNextFocusableElement(activeElement, event)
          if (nextElement) {
            // Move active descendant if necessary
            setActiveDescendant(nextElement.id)
            event.preventDefault()
          } else {
            // If the active descendant didn't change,
            // forward the event to the active descendant
            activeElement.dispatchEvent(new KeyboardEvent(event.type, event))
          }
        }}
      >
        {children}
      </UlBox>
    </RootContext.Provider>
  )
}

// DOM utilities used for focus management

function getNextFocusableElement(
  activeElement: HTMLElement,
  event: React.KeyboardEvent<HTMLElement>
): HTMLElement | undefined {
  const elementState = getElementState(activeElement)

  // Reference: https://www.w3.org/WAI/ARIA/apg/patterns/treeview/#keyboard-interaction-24
  switch (`${elementState} ${event.key}`) {
    case 'open ArrowRight':
      // Focus first child node
      return getFirstChildElement(activeElement)

    case 'open ArrowLeft':
      // Close node; don't change focus
      return

    case 'closed ArrowRight':
      // Open node; don't change focus
      return

    case 'closed ArrowLeft':
      // Focus parent element
      return getParentElement(activeElement)

    case 'end ArrowRight':
      // Do nothing
      return

    case 'end ArrowLeft':
      // Focus parent element
      return getParentElement(activeElement)
  }

  // ArrowUp and ArrowDown behavior is the same regarless of element state
  switch (event.key) {
    case 'ArrowUp':
      // Focus previous visible element
      return getVisibleElement(activeElement, 'previous')

    case 'ArrowDown':
      // Focus next visible element
      return getVisibleElement(activeElement, 'next')
  }

  // TODO: Handle home and end keys
}

function getElementState(element: HTMLElement): 'open' | 'closed' | 'end' {
  if (element.getAttribute('role') !== 'treeitem') {
    throw new Error('Element is not a treeitem')
  }

  switch (element.getAttribute('aria-expanded')) {
    case 'true':
      return 'open'
    case 'false':
      return 'closed'
    default:
      return 'end'
  }
}

function getVisibleElement(element: HTMLElement, direction: 'next' | 'previous'): HTMLElement | undefined {
  const root = element.closest('[role=tree]')

  if (!root) return

  const walker = document.createTreeWalker(root, NodeFilter.SHOW_ELEMENT, node => {
    if (!(node instanceof HTMLElement)) return NodeFilter.FILTER_SKIP
    return node.getAttribute('role') === 'treeitem' ? NodeFilter.FILTER_ACCEPT : NodeFilter.FILTER_SKIP
  })

  let current = walker.firstChild()

  while (current !== element) {
    current = walker.nextNode()
  }

  let next = direction === 'next' ? walker.nextNode() : walker.previousNode()

  // If next element is nested inside a collapsed subtree, continue iterating
  while (next instanceof HTMLElement && next.parentElement?.closest('[role=treeitem][aria-expanded=false]')) {
    next = direction === 'next' ? walker.nextNode() : walker.previousNode()
  }

  return next instanceof HTMLElement ? next : undefined
}

function getFirstChildElement(element: HTMLElement): HTMLElement | undefined {
  const firstChild = element.querySelector('[role=treeitem]')
  return firstChild instanceof HTMLElement ? firstChild : undefined
}

function getParentElement(element: HTMLElement): HTMLElement | undefined {
  const groupElement = element.closest('[role=group]')
  const parent = groupElement?.closest('[role=treeitem]')
  return parent instanceof HTMLElement ? parent : undefined
}

// ----------------------------------------------------------------------------
// TreeView.Item

export type TreeViewItemProps = {
  children: React.ReactNode
  onSelect?: (event: React.MouseEvent<HTMLElement> | KeyboardEvent) => void
  onToggle?: (isExpanded: boolean) => void
}

const Item: React.FC<TreeViewItemProps> = ({onSelect, onToggle, children}) => {
  const {isFocused, activeDescendant} = React.useContext(RootContext)
  const itemId = useSSRSafeId()
  const itemRef = React.useRef<HTMLLIElement>(null)
  const {level} = React.useContext(ItemContext)
  const [isExpanded, setIsExpanded] = React.useState(false)
  const {hasSubTree, subTree, childrenWithoutSubTree} = useSubTree(children)

  // Expand or collapse the subtree
  const toggle = React.useCallback(
    (event?: React.MouseEvent) => {
      onToggle?.(!isExpanded)
      setIsExpanded(!isExpanded)
      event?.stopPropagation()
    },
    [isExpanded, onToggle]
  )

  React.useEffect(() => {
    const element = itemRef.current

    function handleKeyDown(event: KeyboardEvent) {
      // WARNING: Removing this line will cause an infinite loop!
      // The root element receives all keyboard events and forwards them
      // to the active descendant. If we don't stop propagation here,
      // the event will bubble back up to the root element and be forwarded
      // back to the active descendant infinitely.
      event.stopPropagation()

      switch (event.key) {
        case 'Enter':
        case ' ':
          if (onSelect) {
            onSelect(event)
          } else {
            toggle()
          }
          break

        case 'ArrowRight':
          if (!isExpanded) setIsExpanded(true)
          break

        case 'ArrowLeft':
          if (isExpanded) setIsExpanded(false)
          break
      }
    }

    element?.addEventListener('keydown', handleKeyDown)
    return () => element?.removeEventListener('keydown', handleKeyDown)
  }, [toggle, onSelect, isExpanded])

  return (
    <ItemContext.Provider value={{level: level + 1, isExpanded}}>
      <li
        id={itemId}
        ref={itemRef}
        role="treeitem"
        // TODO: aria-label for treeitem
        aria-level={level}
        aria-expanded={hasSubTree ? isExpanded : undefined}
      >
        <Box
          onClick={event => {
            if (onSelect) {
              onSelect(event)
            } else {
              toggle(event)
            }
          }}
          sx={{
            display: 'grid',
            gridTemplateColumns: `calc(${level - 1} * 8px) 16px 1fr`,
            gridTemplateAreas: `"spacer toggle content"`,
            width: '100%',
            height: 32,
            fontSize: 1,
            color: 'fg.default',
            borderRadius: 2,
            cursor: 'pointer',
            transition: 'background 33.333ms linear',
            outline: isFocused && activeDescendant === itemId ? '2px solid' : 'none',
            outlineColor: 'accent.fg',
            '&:hover': {
              backgroundColor: 'actionListItem.default.hoverBg'
            }
          }}
        >
          {hasSubTree ? (
            <Box
              onClick={event => {
                if (onSelect) {
                  toggle(event)
                }
              }}
              sx={{
                gridArea: 'toggle',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                height: '100%',
                color: 'fg.muted',
                borderTopLeftRadius: level === 1 ? 2 : 0,
                borderBottomLeftRadius: level === 1 ? 2 : 0,
                '&:hover': {
                  backgroundColor: onSelect ? 'actionListItem.default.hoverBg' : null
                }
              }}
            >
              {isExpanded ? <ChevronDownIcon /> : <ChevronRightIcon />}
            </Box>
          ) : null}
          <Box
            sx={{
              gridArea: 'content',
              display: 'flex',
              alignItems: 'center',
              height: '100%',
              px: 2
            }}
          >
            {childrenWithoutSubTree}
          </Box>
        </Box>
        {subTree}
      </li>
    </ItemContext.Provider>
  )
}

// ----------------------------------------------------------------------------
// TreeView.LinkItem

export type TreeViewLinkItemProps = TreeViewItemProps & {
  href?: string
}

// TODO: Use an <a> element to enable native browser behavior like opening links in a new tab
const LinkItem: React.FC<TreeViewLinkItemProps> = ({href, onSelect, ...props}) => {
  return (
    <Item
      onSelect={event => {
        // Navigate by clicking or pressing enter
        if (event.type === 'click' || ('key' in event && event.key === 'Enter')) {
          window.open(href, '_self')
        }

        onSelect?.(event)
      }}
      {...props}
    />
  )
}

// ----------------------------------------------------------------------------
// TreeView.SubTree

export type TreeViewSubTreeProps = {
  children?: React.ReactNode
}

const SubTree: React.FC<TreeViewSubTreeProps> = ({children}) => {
  const {isExpanded} = React.useContext(ItemContext)
  return (
    <Box
      as="ul"
      role="group"
      hidden={!isExpanded}
      sx={{
        listStyle: 'none',
        padding: 0,
        margin: 0
      }}
    >
      {children}
    </Box>
  )
}

function useSubTree(children: React.ReactNode) {
  return React.useMemo(() => {
    const subTree = React.Children.toArray(children).find(
      child => React.isValidElement(child) && child.type === SubTree
    )

    const childrenWithoutSubTree = React.Children.toArray(children).filter(
      child => !(React.isValidElement(child) && child.type === SubTree)
    )

    return {
      subTree,
      childrenWithoutSubTree,
      hasSubTree: Boolean(subTree)
    }
  }, [children])
}

// ----------------------------------------------------------------------------
// Export

export const TreeView = Object.assign(Root, {
  Item,
  LinkItem,
  SubTree
})
