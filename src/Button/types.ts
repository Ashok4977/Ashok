import React, {ComponentPropsWithRef} from 'react'
import styled from 'styled-components'
import {IconProps} from '@primer/octicons-react'
import sx, {SxProp} from '../sx'
import getGlobalFocusStyles from '../_getGlobalFocusStyles'

export const StyledButton = styled.button<SxProp>`
  ${getGlobalFocusStyles('-2px')};
  ${sx};
`

export type VariantType = 'default' | 'primary' | 'invisible' | 'danger'

export type Size = 'small' | 'medium' | 'large'

export type AlignContent = 'start' | 'center'

/**
 * Remove styled-components polymorphic as prop, which conflicts with radix's
 */
type StyledButtonProps = Omit<ComponentPropsWithRef<typeof StyledButton>, 'as'>

type ButtonA11yProps = {'aria-label': string; 'aria-labelby'?: never} | {'aria-label'?: never; 'aria-labelby': string}

export type ButtonBaseProps = {
  /**
   * Determine's the styles on a button one of 'default' | 'primary' | 'invisible' | 'danger'
   */
  variant?: VariantType
  /**
   * Size of button and fontSize of text in button
   */
  size?: Size
  /**
   * Items that are disabled can not be clicked, selected, or navigated through.
   */
  disabled?: boolean
  /**
   * Allow button width to fill its container.
   */
  block?: boolean
} & SxProp &
  React.ButtonHTMLAttributes<HTMLButtonElement> &
  StyledButtonProps

export type ButtonProps = {
  /**
   * The leading icon comes before button content
   */
  alignContent?: AlignContent
  /**
   * The leading icon comes before button content
   */
  leadingVisual?: React.FunctionComponent<React.PropsWithChildren<IconProps>>
  /**
   * The trailing icon comes after button content
   */
  trailingVisual?: React.FunctionComponent<React.PropsWithChildren<IconProps>>
  /**
   * Trailing action appears to the right of the trailing visual and is always locked to the end
   */
  trailingAction?: React.FunctionComponent<React.PropsWithChildren<IconProps>>
  children: React.ReactNode
} & ButtonBaseProps

export type IconButtonProps = ButtonA11yProps & {
  icon: React.FunctionComponent<React.PropsWithChildren<IconProps>>
} & ButtonBaseProps

// adopted from React.AnchorHTMLAttributes
export type LinkButtonProps = {
  underline?: boolean
  download?: string
  href?: string
  hrefLang?: string
  media?: string
  ping?: string
  rel?: string
  target?: string
  type?: string
  referrerPolicy?: React.AnchorHTMLAttributes<HTMLAnchorElement>['referrerPolicy']
}
