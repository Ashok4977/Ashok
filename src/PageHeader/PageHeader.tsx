import React from 'react'
import {Box} from '..'
import {useResponsiveValue, ResponsiveValue} from '../hooks/useResponsiveValue'
import {SxProp, merge, BetterSystemStyleObject} from '../sx'
import Heading from '../Heading'
import {ArrowLeftIcon} from '@primer/octicons-react'
import Link, {LinkProps as BaseLinkProps} from '../Link'
import {useProvidedRefOrCreate} from '../hooks'

import {ForwardRefComponent as PolymorphicForwardRefComponent} from '../utils/polymorphic'
import {getBreakpointDeclarations} from '../utils/getBreakpointDeclarations'
const GRID_ROW_ORDER = {
  ContextArea: 1,
  LeadingAction: 2,
  TitleArea: 2,
  TrailingAction: 2,
  Actions: 2,
  Description: 3,
  Navigation: 4,
}

const TITLE_AREA_REGION_ORDER = {
  LeadingVisual: 0,
  Title: 1,
  TrailingVisual: 2,
}

const CONTEXT_AREA_REGION_ORDER = {
  ParentLink: 0,
  ContextBar: 1,
  ContextAreaActions: 2,
}

// Types that are shared between PageHeader children components
export type ChildrenPropTypes = {
  hidden?: boolean | ResponsiveValue<boolean>
} & SxProp

// Default state for the `visible` prop when a sub component is only visible on narrow viewport
const hiddenOnRegularAndWide = {
  narrow: false,
  regular: true,
  wide: true,
}

// Default state for the `visible` prop when a sub component is visible on regular and wide viewport
const hiddenOnNarrow = {
  narrow: true,
  regular: false,
  wide: false,
}

// Root
// -----------------------------------------------------------------------------
export type PageHeaderProps = {
  'aria-label'?: React.AriaAttributes['aria-label']
  as?: React.ElementType | 'header' | 'div'
} & SxProp

const Root = React.forwardRef<HTMLDivElement, React.PropsWithChildren<PageHeaderProps>>(
  ({children, sx = {}, as = 'div'}, forwardedRef) => {
    const rootRef = useProvidedRefOrCreate<HTMLDivElement>(forwardedRef as React.RefObject<HTMLDivElement>)

    const [contextArea, setContextArea] = React.useState<string>('contextArea contextArea contextArea contextArea')
    const [titleArea, setTitleArea] = React.useState<string>('titleArea titleArea titleArea titleArea')
    const [description, setDescription] = React.useState<string>('description description description description')
    const [navigation, setNavigation] = React.useState<string>('navigation navigation navigation navigation')

    const [templateAreaStructure, setTemplateAreaStructure] = React.useState<string>('')
    const rootStyles = {
      display: 'grid',
      // We have 4 columns.
      gridTemplateColumns: 'auto auto auto 1fr',
      gridTemplateAreas: templateAreaStructure,
      gap: 'var(--stack-gap-condensed, 0.5rem)',
    }

    const [visibility, setVisibility] = React.useState({
      contextArea: false,
      titleArea: false,
      leadingAction: false,
      trailingAction: false,
      actions: false,
      description: false,
      navigation: false,
    })

    React.useEffect(() => {
      const observer = new IntersectionObserver((entries: IntersectionObserverEntry[]) => {
        for (const entry of entries) {
          setVisibility(prev => ({
            ...prev,
            [entry.target.getAttribute('data-component') as string]: entry.isIntersecting,
          }))
          setVisibility(prev => ({
            ...prev,
            [entry.target.getAttribute('data-component') as string]: entry.isIntersecting,
          }))
        }
      })

      for (const item of rootRef.current?.children || []) {
        observer.observe(item)
      }

      return () => observer.disconnect()
    }, [rootRef])

    React.useEffect(() => {
      // This is not the best way to handle this. TODO: make it better
      setContextArea('')
      setTitleArea('')
      setDescription('')
      setNavigation('')
      setTemplateAreaStructure('')
      if (visibility.contextArea) {
        setContextArea('contextArea contextArea contextArea contextArea')
      }
      if (visibility.description) {
        setDescription('description description description description')
      }
      if (visibility.navigation) {
        setNavigation('navigation navigation navigation navigation')
      }
      if (visibility.titleArea) {
        const leadingAction = visibility.leadingAction ? 'leadingAction' : 'titleArea'
        const trailingAction = visibility.trailingAction ? 'trailingAction' : 'titleArea'
        const actions = visibility.actions ? 'actions' : 'titleArea'
        const title = 'titleArea'
        const titleArea = `${leadingAction} ${title} ${trailingAction} ${actions}`
        setTitleArea(titleArea)
      }
      const templateAreaStructureL = `${contextArea !== '' ? `'${contextArea}' ` : ''}${
        titleArea ? `'${titleArea}' ` : ''
      }${description ? `'${description}' ` : ''}${navigation ? `'${navigation}' ` : ''}`.trim()

      setTemplateAreaStructure(templateAreaStructureL)
    }, [visibility, contextArea, titleArea, description, navigation])

    return (
      <Box ref={rootRef} data-component="pageheader" as={as} sx={merge<BetterSystemStyleObject>(rootStyles, sx)}>
        {children}
      </Box>
    )
  },
) as PolymorphicForwardRefComponent<'div', PageHeaderProps>

// PageHeader.ContextArea : Only visible on narrow viewports by default to provide user context of where they are at their journey. `hidden` prop available
// to manage their custom visibility but consumers should be careful if they choose to hide this on narrow viewports.
// PageHeader.ContextArea Sub Components: PageHeader.ParentLink, PageHeader.ContextBar, PageHeader.ContextAreaActions
// ---------------------------------------------------------------------
const ContextArea: React.FC<React.PropsWithChildren<ChildrenPropTypes>> = ({
  children,
  hidden = hiddenOnRegularAndWide,
  sx = {},
}) => {
  const contentNavStyles = {
    gridRow: GRID_ROW_ORDER.ContextArea,
    gridArea: 'contextArea',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    gap: '0.5rem',

    ...getBreakpointDeclarations(hidden, 'display', value => {
      return value ? 'none' : 'flex'
    }),
  }
  return (
    <Box data-component="contextArea" sx={merge<BetterSystemStyleObject>(contentNavStyles, sx)}>
      {children}
    </Box>
  )
  return <Box sx={merge<BetterSystemStyleObject>(contentNavStyles, sx)}>{children}</Box>
}

type LinkProps = Pick<
  React.AnchorHTMLAttributes<HTMLAnchorElement> & BaseLinkProps,
  'download' | 'href' | 'hrefLang' | 'media' | 'ping' | 'rel' | 'target' | 'type' | 'referrerPolicy' | 'as'
> & {
  'aria-label'?: React.AriaAttributes['aria-label']
}
export type ParentLinkProps = React.PropsWithChildren<ChildrenPropTypes & LinkProps>

// PageHeader.ParentLink : Only visible on narrow viewports by default to let users navigate up in the hierarchy.
const ParentLink = React.forwardRef<HTMLAnchorElement, ParentLinkProps>(
  ({children, sx = {}, href, 'aria-label': ariaLabel, as = 'a', hidden = hiddenOnRegularAndWide}, ref) => {
    return (
      <>
        <Link
          data-component="parentLink"
          ref={ref}
          as={as}
          aria-label={ariaLabel}
          muted
          sx={merge<BetterSystemStyleObject>(
            {
              display: 'flex',
              alignItems: 'center',
              order: CONTEXT_AREA_REGION_ORDER.ParentLink,
              gap: '0.5rem',
              ...getBreakpointDeclarations(hidden, 'display', value => {
                return value ? 'none' : 'flex'
              }),
            },
            sx,
          )}
          href={href}
        >
          <ArrowLeftIcon />
          <Box>{children}</Box>
        </Link>
      </>
    )
  },
) as PolymorphicForwardRefComponent<'a', ParentLinkProps>

// ContextBar
// Generic slot for any component above the title region. Use it for custom breadcrumbs and other navigation elements instead of ParentLink.
// ---------------------------------------------------------------------

const ContextBar: React.FC<React.PropsWithChildren<ChildrenPropTypes>> = ({
  children,
  sx = {},
  hidden = hiddenOnRegularAndWide,
}) => {
  return (
    <Box
      data-component="contextBar"
      sx={merge<BetterSystemStyleObject>(
        {
          display: 'flex',
          order: CONTEXT_AREA_REGION_ORDER.ContextBar,
          ...getBreakpointDeclarations(hidden, 'display', value => {
            return value ? 'none' : 'flex'
          }),
        },
        sx,
      )}
    >
      {children}
    </Box>
  )
}

// ContextAreaActions
// ---------------------------------------------------------------------
const ContextAreaActions: React.FC<React.PropsWithChildren<ChildrenPropTypes>> = ({
  children,
  sx = {},
  hidden = hiddenOnRegularAndWide,
}) => {
  return (
    <Box
      data-component="contextareaActions"
      sx={merge<BetterSystemStyleObject>(
        {
          display: 'flex',
          flexDirection: 'row',
          order: CONTEXT_AREA_REGION_ORDER.ContextAreaActions,
          alignItems: 'center',
          gap: '0.5rem',
          flexGrow: '1',
          justifyContent: 'right',
          ...getBreakpointDeclarations(hidden, 'display', value => {
            return value ? 'none' : 'flex'
          }),
        },
        sx,
      )}
    >
      {children}
    </Box>
  )
}

const MEDIUM_TITLE_HEIGHT = '2rem'
const LARGE_TITLE_HEIGHT = '3rem'

const TitleAreaContext = React.createContext<{
  titleVariant: 'subtitle' | 'medium' | 'large'
  titleAreaHeight?: string | number
}>({
  titleVariant: 'medium',
  titleAreaHeight: MEDIUM_TITLE_HEIGHT,
})

type TitleAreaProps = {
  variant?: 'subtitle' | 'medium' | 'large' | ResponsiveValue<'subtitle' | 'medium' | 'large'>
} & ChildrenPropTypes
// PageHeader.TitleArea: The main title area of the page. Visible on all viewports.
// PageHeader.TitleArea Sub Components: PageHeader.LeadingAction, PageHeader.LeadingVisual,
// PageHeader.Title, PageTitle.TrailingVisual, PageHeader.TrailingAction, PageHeader.Actions
// ---------------------------------------------------------------------

const TitleArea: React.FC<React.PropsWithChildren<TitleAreaProps>> = ({
  children,
  sx = {},
  hidden = false,
  variant = 'medium',
}) => {
  const currentVariant = useResponsiveValue(variant, 'medium')
  const height = currentVariant === 'large' ? LARGE_TITLE_HEIGHT : MEDIUM_TITLE_HEIGHT
  return (
    <TitleAreaContext.Provider value={{titleVariant: currentVariant, titleAreaHeight: height}}>
      <Box
        data-component="titleArea"
        sx={merge<BetterSystemStyleObject>(
          {
            gridRow: GRID_ROW_ORDER.TitleArea,
            gridArea: 'titleArea',
            display: 'flex',
            gap: '0.5rem',
            ...getBreakpointDeclarations(hidden, 'display', value => {
              return value ? 'none' : 'flex'
            }),
            flexDirection: 'row',
            alignItems: 'center',
          },
          sx,
        )}
      >
        {children}
      </Box>
    </TitleAreaContext.Provider>
  )
}

// PageHeader.LeadingAction and PageHeader.TrailingAction should only be visible on regular viewports.
// So they come as hidden on narrow viewports by default and their visibility can be managed by their `hidden` prop.
const LeadingAction: React.FC<React.PropsWithChildren<ChildrenPropTypes>> = ({
  children,
  sx = {},
  hidden = hiddenOnNarrow,
}) => {
  const {titleAreaHeight} = React.useContext(TitleAreaContext)

  return (
    <Box
      data-component="leadingAction"
      sx={merge<BetterSystemStyleObject>(
        {
          gridRow: GRID_ROW_ORDER.LeadingAction,
          gridArea: 'leadingAction',
          display: 'flex',
          ...getBreakpointDeclarations(hidden, 'display', value => {
            return value ? 'none' : 'flex'
          }),
          alignItems: 'center',
          height: titleAreaHeight,
        },
        sx,
      )}
    >
      {children}
    </Box>
  )
}

// PageHeader.LeadingVisual and PageHeader.TrailingVisual should remain visible on narrow viewports.
const LeadingVisual: React.FC<React.PropsWithChildren<ChildrenPropTypes>> = ({children, sx = {}, hidden = false}) => {
  const {titleAreaHeight} = React.useContext(TitleAreaContext)
  return (
    <Box
      sx={merge<BetterSystemStyleObject>(
        {
          // using flex and order to display the leading visual in the title area.
          display: 'flex',
          order: TITLE_AREA_REGION_ORDER.LeadingVisual,
          ...getBreakpointDeclarations(hidden, 'display', value => {
            return value ? 'none' : 'flex'
          }),
          alignItems: 'center',
          height: titleAreaHeight,
        },
        sx,
      )}
    >
      {children}
    </Box>
  )
}

export type TitleProps = {
  as?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6'
} & ChildrenPropTypes

const Title: React.FC<React.PropsWithChildren<TitleProps>> = ({children, sx = {}, hidden = false, as = 'h2'}) => {
  const {titleVariant} = React.useContext(TitleAreaContext)
  return (
    <Heading
      as={as}
      sx={merge<BetterSystemStyleObject>(
        {
          fontSize: {
            large: '2rem',
            medium: '1.25rem',
            subtitle: '1.25rem',
          }[titleVariant],
          // line-height is calculated with calc(height/font-size) and the below numbers are from @primer/primitives
          lineHeight: {
            large: 1.5, // calc(48/32)
            medium: 1.6, // calc(32/20)
            subtitle: 1.6, // calc(32/20)
          }[titleVariant],
          fontWeight: {
            large: '400',
            medium: '600',
            subtitle: '400',
          }[titleVariant],
          // using flex and order to display the title in the title area.
          display: 'flex',
          order: TITLE_AREA_REGION_ORDER.Title,
          ...getBreakpointDeclarations(hidden, 'display', value => {
            return value ? 'none' : 'block'
          }),
        },
        sx,
      )}
    >
      {children}
    </Heading>
  )
}

// PageHeader.LeadingVisual and PageHeader.TrailingVisual should remain visible on narrow viewports.
const TrailingVisual: React.FC<React.PropsWithChildren<ChildrenPropTypes>> = ({children, sx = {}, hidden = false}) => {
  const {titleAreaHeight} = React.useContext(TitleAreaContext)

  return (
    <Box
      sx={merge<BetterSystemStyleObject>(
        {
          // using flex and order to display the trailing visual in the title area.
          display: 'flex',
          order: TITLE_AREA_REGION_ORDER.TrailingVisual,
          ...getBreakpointDeclarations(hidden, 'display', value => {
            return value ? 'none' : 'flex'
          }),
          alignItems: 'center',
          height: titleAreaHeight,
        },
        sx,
      )}
    >
      {children}
    </Box>
  )
}

const TrailingAction: React.FC<React.PropsWithChildren<ChildrenPropTypes>> = ({
  children,
  sx = {},
  hidden = hiddenOnNarrow,
}) => {
  const {titleAreaHeight} = React.useContext(TitleAreaContext)

  return (
    <Box
      data-component="trailingAction"
      sx={merge<BetterSystemStyleObject>(
        {
          gridRow: GRID_ROW_ORDER.TrailingAction,
          gridArea: 'trailingAction',
          display: 'flex',
          ...getBreakpointDeclarations(hidden, 'display', value => {
            return value ? 'none' : 'flex'
          }),
          alignItems: 'center',
          height: titleAreaHeight,
        },
        sx,
      )}
    >
      {children}
    </Box>
  )
}

const Actions: React.FC<React.PropsWithChildren<ChildrenPropTypes>> = ({children, sx = {}, hidden = false}) => {
  const {titleAreaHeight} = React.useContext(TitleAreaContext)
  return (
    <Box
      data-component="actions"
      sx={merge<BetterSystemStyleObject>(
        {
          gridRow: GRID_ROW_ORDER.Actions,
          gridArea: 'actions',
          display: 'flex',
          ...getBreakpointDeclarations(hidden, 'display', value => {
            return value ? 'none' : 'flex'
          }),
          flexDirection: 'row',
          gap: '0.5rem',
          flexGrow: '1',
          justifyContent: 'right',
          height: titleAreaHeight,
          alignItems: 'center',
        },
        sx,
      )}
    >
      {children}
    </Box>
  )
}

// PageHeader.Description: The description area of the header. Visible on all viewports
const Description: React.FC<React.PropsWithChildren<ChildrenPropTypes>> = ({children, sx = {}, hidden = false}) => {
  return (
    <Box
      data-component="description"
      sx={merge<BetterSystemStyleObject>(
        {
          gridRow: GRID_ROW_ORDER.Description,
          gridArea: 'description',
          display: 'flex',
          ...getBreakpointDeclarations(hidden, 'display', value => {
            return value ? 'none' : 'flex'
          }),
          flexDirection: 'row',
          alignItems: 'center',
          gap: '0.5rem',
        },
        sx,
      )}
    >
      {children}
    </Box>
  )
}

export type NavigationProps = {
  as?: 'nav' | 'div'
  'aria-label'?: React.AriaAttributes['aria-label']
  'aria-labelledby'?: React.AriaAttributes['aria-labelledby']
} & ChildrenPropTypes

// PageHeader.Navigation: The local navigation area of the header. Visible on all viewports
const Navigation: React.FC<React.PropsWithChildren<NavigationProps>> = ({
  children,
  sx = {},
  hidden = false,
  as,
  'aria-label': ariaLabel,
  'aria-labelledby': ariaLabelledBy,
}) => {
  // TODO: use warning utility function when it is merged https://github.com/primer/react/pull/2901/
  if (__DEV__) {
    if (as === 'nav' && !ariaLabel && !ariaLabelledBy) {
      // eslint-disable-next-line no-console
      console.warn(
        'Use `aria-label` or `aria-labelledby` prop to provide an accessible label to the `nav` landmark for assistive technology',
      )
    }
  }
  return (
    <Box
      data-component="navigation"
      as={as}
      // Render `aria-label` and `aria-labelledby` only on `nav` elements
      aria-label={as === 'nav' ? ariaLabel : undefined}
      aria-labelledby={as === 'nav' ? ariaLabelledBy : undefined}
      sx={merge<BetterSystemStyleObject>(
        {
          gridRow: GRID_ROW_ORDER.Navigation,
          gridArea: 'navigation',
          display: 'flex',
          ...getBreakpointDeclarations(hidden, 'display', value => {
            return value ? 'none' : 'block'
          }),
        },
        sx,
      )}
    >
      {children}
    </Box>
  )
}

export const PageHeader = Object.assign(Root, {
  ContextArea,
  ParentLink,
  ContextBar,
  TitleArea,
  ContextAreaActions,
  LeadingAction,
  LeadingVisual,
  Title,
  TrailingVisual,
  TrailingAction,
  Actions,
  Description,
  Navigation,
})
