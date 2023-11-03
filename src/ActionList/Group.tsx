import React from 'react'
import {useId} from '../hooks/useId'
import Box from '../Box'
import {SxProp, BetterSystemStyleObject, merge} from '../sx'
import {ListContext, ActionListProps} from './List'
import {AriaRole} from '../utils/types'
import {default as Heading} from '../Heading'
import {useSlots} from '../hooks/useSlots'
import {defaultSxProp} from '../utils/defaultSxProp'
import {warning} from '../utils/warning'

export type ActionListGroupProps = {
  /**
   * Style variations. Usage is discretionary.
   *
   * - `"filled"` - Superimposed on a background, offset from nearby content
   * - `"subtle"` - Relatively less offset from nearby content
   */
  variant?: 'subtle' | 'filled'
  /**
   * Primary text which names a `Group`.
   */
  title?: string
  /**
   * Secondary text which provides additional information about a `Group`.
   */
  auxiliaryText?: string
  /**
   * The ARIA role describing the function of the list inside `Group` component. `listbox` or `menu` are a common values.
   */
  role?: AriaRole
} & SxProp & {
    /**
     * Whether multiple Items or a single Item can be selected in the Group. Overrides value on ActionList root.
     */
    selectionVariant?: ActionListProps['selectionVariant'] | false
  }

type ContextProps = Pick<ActionListGroupProps, 'selectionVariant'>
export const GroupContext = React.createContext<ContextProps>({})

export const Group: React.FC<React.PropsWithChildren<ActionListGroupProps>> = ({
  title,
  variant = 'subtle',
  auxiliaryText,
  selectionVariant,
  role,
  sx = {},
  ...props
}) => {
  const id = useId()
  const {role: listRole} = React.useContext(ListContext)

  const [slots, childrenWithoutSlots] = useSlots(props.children, {
    groupHeading: GroupHeading,
  })

  const headingId = slots.groupHeading ? slots.groupHeading.props.id ?? id : title ? id : undefined

  return (
    <Box
      as="li"
      role={listRole ? 'none' : undefined}
      sx={{
        '&:not(:first-child)': {marginTop: 2},
        listStyle: 'none', // hide the ::marker inserted by browser's stylesheet
        ...sx,
      }}
      {...props}
    >
      {(title || slots.groupHeading) && (
        <GroupHeading
          title={title}
          variant={variant}
          auxiliaryText={auxiliaryText}
          labelId={headingId}
          as={slots.groupHeading?.props.as}
        >
          {slots.groupHeading ? slots.groupHeading.props.children : null}
        </GroupHeading>
      )}
      <GroupContext.Provider value={{selectionVariant}}>
        <Box
          as="ul"
          sx={{paddingInlineStart: 0}}
          aria-labelledby={listRole ? undefined : headingId}
          aria-label={listRole ? title ?? (slots.groupHeading?.props.children as string) : undefined}
          role={role || (listRole && 'group')}
        >
          {slots.groupHeading ? childrenWithoutSlots : props.children}
        </Box>
      </GroupContext.Provider>
    </Box>
  )
}

export type GroupHeadingProps = Pick<ActionListGroupProps, 'variant' | 'title' | 'auxiliaryText'> & {
  as?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6'
  labelId?: string
  id?: string
} & SxProp

/**
 * Displays the name and description of a `Group`.
 *
 * For visual presentation only.
 */
export const GroupHeading: React.FC<React.PropsWithChildren<GroupHeadingProps>> = ({
  as,
  variant,
  title,
  auxiliaryText,
  labelId,
  children,
  sx = defaultSxProp,
  ...props
}) => {
  const {variant: listVariant, role: listRole} = React.useContext(ListContext)
  // for list role, the headings are proper heading tags, for menu and listbox, they are just representational and divs
  warning(
    listRole === undefined && children !== null && as === undefined,
    `You are setting a heading for a list, that requires a heading level. Please use 'as' prop to set a proper heading level.`,
  )

  const styles = {
    paddingY: '6px',
    paddingX: listVariant === 'full' ? 2 : 3,
    fontSize: 0,
    fontWeight: 'bold',
    color: 'fg.muted',
    ...(variant === 'filled' && {
      backgroundColor: 'canvas.subtle',
      marginX: 0,
      marginBottom: 2,
      borderTop: '1px solid',
      borderBottom: '1px solid',
      borderColor: 'neutral.muted',
    }),
  }

  return (
    <>
      {listRole ? (
        <Box sx={styles} role="presentation" aria-hidden="true" {...props}>
          <span id={labelId}>{title ?? children}</span>
          {auxiliaryText && <span>{auxiliaryText}</span>}
        </Box>
      ) : (
        <Heading
          as={as || 'h3'}
          // use custom id if it is provided. Otherwise, use the id from the context
          id={labelId}
          sx={merge<BetterSystemStyleObject>(styles, sx)}
          {...props}
        >
          {title ?? children}
        </Heading>
      )}
    </>
  )
}
