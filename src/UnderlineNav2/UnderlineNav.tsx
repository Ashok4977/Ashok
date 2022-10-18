import React, {useRef, forwardRef, useCallback, useState, MutableRefObject, RefObject} from 'react'
import Box from '../Box'
import sx, {merge, BetterSystemStyleObject, SxProp} from '../sx'
import {UnderlineNavContext} from './UnderlineNavContext'
import {ActionMenu} from '../ActionMenu'
import {ActionList} from '../ActionList'
import {useResizeObserver, ResizeObserverEntry} from '../hooks/useResizeObserver'
import CounterLabel from '../CounterLabel'
import {useTheme} from '../ThemeProvider'
import {ChildWidthArray, ResponsiveProps} from './types'

import {moreBtnStyles, getDividerStyle, getNavStyles, ulStyles, moreMenuStyles, menuItemStyles} from './styles'
import styled from 'styled-components'
import {LoadingCounter} from './LoadingCounter'

export type UnderlineNavProps = {
  'aria-label'?: React.AriaAttributes['aria-label']
  as?: React.ElementType
  align?: 'right'
  sx?: SxProp
  variant?: 'default' | 'small'
  /**
   * loading state for all counters (to prevent multiple layout shifts)
   */
  loadingCounters?: boolean
  afterSelect?: (event: React.MouseEvent<HTMLLIElement> | React.KeyboardEvent<HTMLLIElement>) => void
  children: React.ReactNode
}
// When page is loaded, we don't have ref for the more button as it is not on the DOM yet.
// However, we need to calculate number of possible items when the more button present as well. So using the width of the more button as a constant.
const MORE_BTN_WIDTH = 86

// Needed this because passing a ref using HTMLULListElement to `Box` causes a type error
const NavigationList = styled.ul`
  ${sx};
`

const MoreMenuListItem = styled.li`
  display: flex;
`

const overflowEffect = (
  navWidth: number,
  moreMenuWidth: number,
  childArray: Array<React.ReactElement>,
  childWidthArray: ChildWidthArray,
  noIconChildWidthArray: ChildWidthArray,
  updateListAndMenu: (props: ResponsiveProps, iconsVisible: boolean) => void
) => {
  let iconsVisible = true
  let overflowStyles: BetterSystemStyleObject | null = {}
  if (childWidthArray.length === 0) {
    updateListAndMenu({items: childArray, actions: [], overflowStyles}, iconsVisible)
  }

  const numberOfItemsPossible = calculatePossibleItems(childWidthArray, navWidth)
  const numberOfItemsWithoutIconPossible = calculatePossibleItems(noIconChildWidthArray, navWidth)
  // We need to take more menu width into account when calculating the number of items possible
  const numberOfItemsPossibleWithMoreMenu = calculatePossibleItems(
    noIconChildWidthArray,
    navWidth,
    moreMenuWidth || MORE_BTN_WIDTH
  )
  const items: Array<React.ReactElement> = []
  const actions: Array<React.ReactElement> = []

  // For fine pointer devices, first we check if we can fit all the items with icons
  if (childArray.length <= numberOfItemsPossible) {
    items.push(...childArray)
  } else if (childArray.length <= numberOfItemsWithoutIconPossible) {
    // if we can't fit all the items with icons, we check if we can fit all the items without icons
    iconsVisible = false
    items.push(...childArray)
  } else {
    // if we can't fit all the items without icons, we keep the icons hidden and show the rest in the menu
    iconsVisible = false
    overflowStyles = moreMenuStyles
    for (const [index, child] of childArray.entries()) {
      if (index < numberOfItemsPossibleWithMoreMenu) {
        items.push(child)
        // keeping selected item always visible.
      } else if (child.props.selected) {
        // If selected item's index couldn't make the list, we swap it with the last item in the list.
        const propsectiveAction = items.splice(numberOfItemsPossibleWithMoreMenu - 1, 1, child)[0]
        actions.push(propsectiveAction)
      } else {
        actions.push(child)
      }
    }
  }

  updateListAndMenu({items, actions, overflowStyles}, iconsVisible)
}

const getValidChildren = (children: React.ReactNode) => {
  return React.Children.toArray(children).filter(child => React.isValidElement(child)) as React.ReactElement[]
}

const calculatePossibleItems = (childWidthArray: ChildWidthArray, navWidth: number, moreMenuWidth = 0) => {
  const widthToFit = navWidth - moreMenuWidth
  let breakpoint = childWidthArray.length - 1
  let sumsOfChildWidth = 0
  for (const [index, childWidth] of childWidthArray.entries()) {
    if (sumsOfChildWidth > widthToFit) {
      breakpoint = index - 1
      break
    } else {
      sumsOfChildWidth = sumsOfChildWidth + childWidth.width
    }
  }

  return breakpoint
}

export const UnderlineNav = forwardRef(
  (
    {
      as = 'nav',
      align,
      'aria-label': ariaLabel,
      sx: sxProp = {},
      afterSelect,
      variant = 'default',
      loadingCounters = false,
      children
    }: UnderlineNavProps,
    forwardedRef
  ) => {
    const backupRef = useRef<HTMLElement>(null)
    const navRef = (forwardedRef ?? backupRef) as MutableRefObject<HTMLElement>
    const listRef = useRef<HTMLUListElement>(null)
    const moreMenuRef = useRef<HTMLLIElement>(null)

    const {theme} = useTheme()

    function getItemsWidth(itemText: string): number {
      return noIconChildWidthArray.find(item => item.text === itemText)?.width || 0
    }

    const swapMenuItemWithListItem = (
      prospectiveListItem: React.ReactElement,
      indexOfProspectiveListItem: number,
      event: React.MouseEvent<HTMLLIElement> | React.KeyboardEvent<HTMLLIElement>,
      callback: (props: ResponsiveProps, displayIcons: boolean) => void
    ) => {
      // get the selected menu item's width
      const widthToFitIntoList = getItemsWidth(prospectiveListItem.props.children)
      // Check if there is any empty space on the right side of the list
      const availableSpace =
        navRef.current.getBoundingClientRect().width - (listRef.current?.getBoundingClientRect().width || 0)

      // Calculate how many items need to be pulled in to the menu to make room for the selected menu item
      // I.e. if we need to pull 2 items in (index 0 and index 1), breakpoint (index) will return 1.
      const index = getBreakpointForItemSwapping(widthToFitIntoList, availableSpace)
      const indexToSliceAt = responsiveProps.items.length - 1 - index
      // Form the new list of items
      const itemsLeftInList = [...responsiveProps.items].slice(0, indexToSliceAt)
      const updatedItemList = [...itemsLeftInList, prospectiveListItem]
      // Form the new menu items
      const itemsToAddToMenu = [...responsiveProps.items].slice(indexToSliceAt)
      const updatedMenuItems = [...actions]
      // Add itemsToAddToMenu array's items to the menu at the index of the prospectiveListItem and remove 1 count of items (prospectiveListItem)
      updatedMenuItems.splice(indexOfProspectiveListItem, 1, ...itemsToAddToMenu)
      setSelectedLinkText(prospectiveListItem.props.children)
      callback(
        {items: updatedItemList, actions: updatedMenuItems, overflowStyles: responsiveProps.overflowStyles},
        false
      )
    }
    // How many items do we need to pull in to the menu to make room for the selected menu item.
    function getBreakpointForItemSwapping(widthToFitIntoList: number, availableSpace: number) {
      let widthToSwap = 0
      let breakpoint = 0
      for (const [index, item] of [...responsiveProps.items].reverse().entries()) {
        widthToSwap += getItemsWidth(item.props.children)
        if (widthToFitIntoList < widthToSwap + availableSpace) {
          breakpoint = index
          break
        }
      }
      return breakpoint
    }

    const [selectedLink, setSelectedLink] = useState<RefObject<HTMLElement> | undefined>(undefined)

    // selectedLinkText is needed to be able set the selected menu item as selectedLink.
    // This is needed because setSelectedLink only accepts ref but at the time of setting selected menu item as selectedLink, its ref as a list item is not available
    const [selectedLinkText, setSelectedLinkText] = useState<string>('')
    // Capture the mouse/keyboard event when a menu item is selected so that we can use it to fire the onSelect callback after the menu item is swapped with the list item
    const [selectEvent, setSelectEvent] = useState<
      React.MouseEvent<HTMLLIElement> | React.KeyboardEvent<HTMLLIElement> | null
    >(null)

    const [iconsVisible, setIconsVisible] = useState<boolean>(true)

    const afterSelectHandler = (event: React.MouseEvent<HTMLLIElement> | React.KeyboardEvent<HTMLLIElement>) => {
      if (!event.defaultPrevented) {
        if (typeof afterSelect === 'function') afterSelect(event)
      }
    }

    const [responsiveProps, setResponsiveProps] = useState<ResponsiveProps>({
      items: getValidChildren(children),
      actions: [],
      overflowStyles: {}
    })

    const updateListAndMenu = useCallback((props: ResponsiveProps, displayIcons: boolean) => {
      setResponsiveProps(props)
      setIconsVisible(displayIcons)
    }, [])

    const actions = responsiveProps.actions
    const [childWidthArray, setChildWidthArray] = useState<ChildWidthArray>([])
    const setChildrenWidth = useCallback(size => {
      setChildWidthArray(arr => {
        const newArr = [...arr, size]
        return newArr
      })
    }, [])

    const [noIconChildWidthArray, setNoIconChildWidthArray] = useState<ChildWidthArray>([])
    const setNoIconChildrenWidth = useCallback(size => {
      setNoIconChildWidthArray(arr => {
        const newArr = [...arr, size]
        return newArr
      })
    }, [])

    useResizeObserver((resizeObserverEntries: ResizeObserverEntry[]) => {
      const childArray = getValidChildren(children)
      const navWidth = resizeObserverEntries[0].contentRect.width
      const moreMenuWidth = moreMenuRef.current?.getBoundingClientRect().width ?? 0
      overflowEffect(navWidth, moreMenuWidth, childArray, childWidthArray, noIconChildWidthArray, updateListAndMenu)
    }, navRef as RefObject<HTMLElement>)

    if (!ariaLabel) {
      // eslint-disable-next-line no-console
      console.warn('Use the `aria-label` prop to provide an accessible label for assistive technology')
    }

    return (
      <UnderlineNavContext.Provider
        value={{
          theme,
          setChildrenWidth,
          setNoIconChildrenWidth,
          selectedLink,
          setSelectedLink,
          selectedLinkText,
          setSelectedLinkText,
          selectEvent,
          afterSelect: afterSelectHandler,
          variant,
          loadingCounters,
          iconsVisible
        }}
      >
        <Box
          as={as}
          sx={merge<BetterSystemStyleObject>(getNavStyles(theme, {align}), sxProp)}
          aria-label={ariaLabel}
          ref={navRef}
        >
          <NavigationList sx={merge<BetterSystemStyleObject>(responsiveProps.overflowStyles, ulStyles)} ref={listRef}>
            {responsiveProps.items}
            {actions.length > 0 && (
              <MoreMenuListItem ref={moreMenuRef}>
                <Box sx={getDividerStyle(theme)}></Box>
                <ActionMenu>
                  <ActionMenu.Button sx={moreBtnStyles}>More</ActionMenu.Button>
                  <ActionMenu.Overlay align="end">
                    <ActionList selectionVariant="single">
                      {actions.map((action, index) => {
                        const {children: actionElementChildren, ...actionElementProps} = action.props
                        return (
                          <ActionList.Item
                            sx={menuItemStyles}
                            key={index}
                            {...actionElementProps}
                            onSelect={(event: React.MouseEvent<HTMLLIElement> | React.KeyboardEvent<HTMLLIElement>) => {
                              swapMenuItemWithListItem(action, index, event, updateListAndMenu)
                              setSelectEvent(event)
                            }}
                          >
                            <Box
                              as="span"
                              sx={{display: 'flex', alignItems: 'center', justifyContent: 'space-between'}}
                            >
                              {actionElementChildren}

                              {loadingCounters ? (
                                <LoadingCounter />
                              ) : (
                                <CounterLabel>{actionElementProps.counter}</CounterLabel>
                              )}
                            </Box>
                          </ActionList.Item>
                        )
                      })}
                    </ActionList>
                  </ActionMenu.Overlay>
                </ActionMenu>
              </MoreMenuListItem>
            )}
          </NavigationList>
        </Box>
      </UnderlineNavContext.Provider>
    )
  }
)
