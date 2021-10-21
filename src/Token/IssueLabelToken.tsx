import React, {forwardRef, MouseEventHandler, useMemo} from 'react'
import {CSSObject} from '@styled-system/css'
import TokenBase, {defaultTokenSize, isTokenInteractive, TokenBaseProps} from './TokenBase'
import RemoveTokenButton from './_RemoveTokenButton'
import {parseToHsla, parseToRgba} from 'color2k'
import {useTheme} from '../ThemeProvider'
import TokenTextContainer from './_TokenTextContainer'

export interface IssueLabelTokenProps extends TokenBaseProps {
  /**
   * The color that corresponds to the label
   */
  fillColor?: string
  /**
   * Whether the remove button should be rendered in the token
   */
  hideRemoveButton?: boolean
}

const tokenBorderWidthPx = 1

const lightModeStyles = {
  '--lightness-threshold': '0.453',
  '--border-threshold': '0.96',
  '--border-alpha': 'max(0, min(calc((var(--perceived-lightness) - var(--border-threshold)) * 100), 1))',
  background: 'rgb(var(--label-r), var(--label-g), var(--label-b))',
  color: 'hsl(0, 0%, calc(var(--lightness-switch) * 100%))',
  borderWidth: tokenBorderWidthPx,
  borderStyle: 'solid',
  borderColor: 'hsla(var(--label-h),calc(var(--label-s) * 1%),calc((var(--label-l) - 25) * 1%),var(--border-alpha))'
}

const darkModeStyles = {
  '--lightness-threshold': '0.6',
  '--background-alpha': '0.18',
  '--border-alpha': '0.3',
  '--lighten-by': 'calc(((var(--lightness-threshold) - var(--perceived-lightness)) * 100) * var(--lightness-switch))',
  borderWidth: tokenBorderWidthPx,
  borderStyle: 'solid',
  background: 'rgba(var(--label-r), var(--label-g), var(--label-b), var(--background-alpha))',
  color: 'hsl(var(--label-h), calc(var(--label-s) * 1%), calc((var(--label-l) + var(--lighten-by)) * 1%))',
  borderColor:
    'hsla(var(--label-h), calc(var(--label-s) * 1%),calc((var(--label-l) + var(--lighten-by)) * 1%),var(--border-alpha))'
}

const IssueLabelToken = forwardRef<HTMLElement, IssueLabelTokenProps>((props, forwardedRef) => {
  const {as, fillColor = '#999', onRemove, id, isSelected, text, size, hideRemoveButton, href, onClick, ...rest} = props
  const interactiveTokenProps = {
    as,
    href,
    onClick
  }
  const {colorScheme} = useTheme()
  const hasMultipleActionTargets = isTokenInteractive(props) && Boolean(onRemove) && !hideRemoveButton
  const onRemoveClick: MouseEventHandler = e => {
    e.stopPropagation()
    onRemove && onRemove()
  }
  const labelStyles: CSSObject = useMemo(() => {
    const [r, g, b] = parseToRgba(fillColor)
    const [h, s, l] = parseToHsla(fillColor)

    // label hack taken from https://github.com/github/github/blob/master/app/assets/stylesheets/hacks/hx_primer-labels.scss#L43-L108
    // this logic should eventually live in primer/components. Also worthy of note is that the dotcom hack code will be moving to primer/css soon.
    return {
      '--label-r': String(r),
      '--label-g': String(g),
      '--label-b': String(b),
      '--label-h': String(Math.round(h)),
      '--label-s': String(Math.round(s * 100)),
      '--label-l': String(Math.round(l * 100)),
      '--perceived-lightness':
        'calc(((var(--label-r) * 0.2126) + (var(--label-g) * 0.7152) + (var(--label-b) * 0.0722)) / 255)',
      '--lightness-switch': 'max(0, min(calc((var(--perceived-lightness) - var(--lightness-threshold)) * -1000), 1))',
      paddingRight: hideRemoveButton || !onRemove ? undefined : 0,
      position: 'relative',
      ...(colorScheme === 'light' ? lightModeStyles : darkModeStyles),
      ...(isSelected
        ? {
            background:
              colorScheme === 'light'
                ? 'hsl(var(--label-h), calc(var(--label-s) * 1%), calc((var(--label-l) - 5) * 1%))'
                : darkModeStyles.background,
            ':focus': {
              outline: 'none'
            },
            ':after': {
              content: '""',
              position: 'absolute',
              zIndex: 1,
              top: `-${tokenBorderWidthPx * 2}px`,
              right: `-${tokenBorderWidthPx * 2}px`,
              bottom: `-${tokenBorderWidthPx * 2}px`,
              left: `-${tokenBorderWidthPx * 2}px`,
              display: 'block',
              pointerEvents: 'none',
              boxShadow: `0 0 0 ${tokenBorderWidthPx * 2}px ${
                colorScheme === 'light'
                  ? 'rgb(var(--label-r), var(--label-g), var(--label-b))'
                  : 'hsl(var(--label-h), calc(var(--label-s) * 1%), calc((var(--label-l) + var(--lighten-by)) * 1%))'
              }`,
              borderRadius: '999px'
            }
          }
        : {})
    }
  }, [colorScheme, fillColor, isSelected, hideRemoveButton, onRemove])

  return (
    <TokenBase
      onRemove={onRemove}
      id={id?.toString()}
      isSelected={isSelected}
      text={text}
      size={size}
      sx={labelStyles}
      {...(!hasMultipleActionTargets ? interactiveTokenProps : {})}
      {...rest}
      ref={forwardedRef}
    >
      <TokenTextContainer {...(hasMultipleActionTargets ? interactiveTokenProps : {})}>{text}</TokenTextContainer>
      {!hideRemoveButton && onRemove ? (
        <RemoveTokenButton
          borderOffset={tokenBorderWidthPx}
          onClick={onRemoveClick}
          size={size}
          aria-hidden={hasMultipleActionTargets ? 'true' : 'false'}
          isParentInteractive={isTokenInteractive(props)}
          sx={{
            '&:hover, &:focus': {
              backgroundColor: 'hsla(0, 0%, calc(var(--lightness-switch) * 100%), 0.1)'
            },
            '&:active': {
              backgroundColor: 'hsla(0, 0%, calc(var(--lightness-switch) * 100%), 0.2)'
            },

            ...(hasMultipleActionTargets
              ? {
                  position: 'relative',
                  zIndex: '1'
                }
              : {})
          }}
        />
      ) : null}
    </TokenBase>
  )
})

IssueLabelToken.defaultProps = {
  fillColor: '#999',
  size: defaultTokenSize
}

IssueLabelToken.displayName = 'IssueLabelToken'

export default IssueLabelToken
