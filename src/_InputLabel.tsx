import React from 'react'
import {Box} from '.'
import {SxProp} from './sx'
import VisuallyHidden from './_VisuallyHidden'

interface Props extends React.HTMLProps<HTMLLabelElement> {
  disabled?: boolean
  required?: boolean
  visuallyHidden?: boolean
}

const InputLabel: React.FC<React.PropsWithChildren<Props & SxProp>> = ({
  children,
  disabled,
  htmlFor,
  id,
  required,
  visuallyHidden,
  sx
}) => {
  return (
    <VisuallyHidden
      isVisible={!visuallyHidden}
      as="label"
      htmlFor={htmlFor}
      id={id}
      sx={{
        fontWeight: 'bold',
        fontSize: 1,
        display: 'block',
        color: disabled ? 'fg.muted' : 'fg.default',
        cursor: disabled ? 'default' : 'pointer',
        alignSelf: 'flex-start',
        ...sx
      }}
    >
      {required ? (
        <Box display="flex" as="span">
          <Box mr={1}>{children}</Box>
          <span aria-hidden="true">*</span>
        </Box>
      ) : (
        children
      )}
    </VisuallyHidden>
  )
}

export default InputLabel
