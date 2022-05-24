import classnames from 'classnames'
import React from 'react'
import styled from 'styled-components'
import {get} from './constants'
import sx, {SxProp} from './sx'
import {ComponentProps} from './utils/types'

const TooltipBase = styled.span<SxProp>`
  position: relative;

  &::before {
    position: absolute;
    z-index: 1000001;
    display: none;
    width: 0px;
    height: 0px;
    color: ${get('colors.neutral.emphasisPlus')};
    pointer-events: none;
    content: '';
    border: 6px solid transparent;
    opacity: 0;
  }

  &::after {
    position: absolute;
    z-index: 1000000;
    display: none;
    padding: 0.5em 0.75em;
    font: normal normal 11px/1.5 ${get('fonts.normal')};
    -webkit-font-smoothing: subpixel-antialiased;
    color: ${get('colors.fg.onEmphasis')};
    text-align: center;
    text-decoration: none;
    text-shadow: none;
    text-transform: none;
    letter-spacing: normal;
    word-wrap: break-word;
    white-space: pre;
    pointer-events: none;
    content: attr(aria-label);
    background: ${get('colors.neutral.emphasisPlus')};
    border-radius: ${get('radii.1')};
    opacity: 0;
  }

  // delay animation for tooltip
  @keyframes tooltip-appear {
    from {
      opacity: 0;
    }

    to {
      opacity: 1;
    }
  }

  &:hover,
  &:active,
  &:focus {
    &::before,
    &::after {
      display: inline-block;
      text-decoration: none;
      animation-name: tooltip-appear;
      animation-duration: 0.1s;
      animation-fill-mode: forwards;
      animation-timing-function: ease-in;
      animation-delay: 0.4s;
    }
  }

  &.tooltipped-no-delay:hover,
  &.tooltipped-no-delay:active,
  &.tooltipped-no-delay:focus {
    &::before,
    &::after {
      animation-delay: 0s;
    }
  }

  &.tooltipped-multiline:hover,
  &.tooltipped-multiline:active,
  &.tooltipped-multiline:focus {
    &::after {
      display: table-cell;
    }
  }

  // Tooltipped south
  &.tooltipped-s,
  &.tooltipped-se,
  &.tooltipped-sw {
    &::after {
      top: 100%;
      right: 50%;
      margin-top: 6px;
    }

    &::before {
      top: auto;
      right: 50%;
      bottom: -7px;
      margin-right: -6px;
      border-bottom-color: ${get('colors.neutral.emphasisPlus')};
    }
  }

  &.tooltipped-se {
    &::after {
      right: auto;
      left: 50%;
      margin-left: -${get('space.3')};
    }
  }

  &.tooltipped-sw::after {
    margin-right: -${get('space.3')};
  }

  // Tooltips above the object
  &.tooltipped-n,
  &.tooltipped-ne,
  &.tooltipped-nw {
    &::after {
      right: 50%;
      bottom: 100%;
      margin-bottom: 6px;
    }

    &::before {
      top: -7px;
      right: 50%;
      bottom: auto;
      margin-right: -6px;
      border-top-color: ${get('colors.neutral.emphasisPlus')};
    }
  }

  &.tooltipped-ne {
    &::after {
      right: auto;
      left: 50%;
      margin-left: -${get('space.3')};
    }
  }

  &.tooltipped-nw::after {
    margin-right: -${get('space.3')};
  }

  // Move the tooltip body to the center of the object.
  &.tooltipped-s::after,
  &.tooltipped-n::after {
    transform: translateX(50%);
  }

  // Tooltipped to the left
  &.tooltipped-w {
    &::after {
      right: 100%;
      bottom: 50%;
      margin-right: 6px;
      transform: translateY(50%);
    }

    &::before {
      top: 50%;
      bottom: 50%;
      left: -7px;
      margin-top: -6px;
      border-left-color: ${get('colors.neutral.emphasisPlus')};
    }
  }

  // tooltipped to the right
  &.tooltipped-e {
    &::after {
      bottom: 50%;
      left: 100%;
      margin-left: 6px;
      transform: translateY(50%);
    }

    &::before {
      top: 50%;
      right: -7px;
      bottom: 50%;
      margin-top: -6px;
      border-right-color: ${get('colors.neutral.emphasisPlus')};
    }
  }

  &.tooltipped-multiline {
    &::after {
      width: max-content;
      max-width: 250px;
      word-wrap: break-word;
      white-space: pre-line;
      border-collapse: separate;
    }

    &.tooltipped-s::after,
    &.tooltipped-n::after {
      right: auto;
      left: 50%;
      transform: translateX(-50%);
    }

    &.tooltipped-w::after,
    &.tooltipped-e::after {
      right: 100%;
    }
  }

  &.tooltipped-align-right-2::after {
    right: 0;
    margin-right: 0;
  }

  &.tooltipped-align-right-2::before {
    right: 15px;
  }

  &.tooltipped-align-left-2::after {
    left: 0;
    margin-left: 0;
  }

  &.tooltipped-align-left-2::before {
    left: 10px;
  }

  ${sx};
`

export type TooltipProps = {
  direction?: 'n' | 'ne' | 'e' | 'se' | 's' | 'sw' | 'w' | 'nw'
  text?: string
  noDelay?: boolean
  align?: 'left' | 'right'
  wrap?: boolean
} & ComponentProps<typeof TooltipBase>

function Tooltip({direction = 'n', children, className, text, noDelay, align, wrap, ...rest}: TooltipProps) {
  const classes = classnames(
    className,
    `tooltipped-${direction}`,
    align && `tooltipped-align-${align}-2`,
    noDelay && 'tooltipped-no-delay',
    wrap && 'tooltipped-multiline'
  )
  return (
    <TooltipBase role="tooltip" aria-label={text} {...rest} className={classes}>
      {children}
    </TooltipBase>
  )
}

Tooltip.alignments = ['left', 'right']

Tooltip.directions = ['n', 'ne', 'e', 'se', 's', 'sw', 'w', 'nw']

export default Tooltip
