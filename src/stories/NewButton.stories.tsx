import React, {useState} from 'react'
import Button, {ButtonProps} from '../NewButton'
import {BaseStyles, ThemeProvider} from '..'
import {Meta} from '@storybook/react'
import {XIcon, SearchIcon, EyeIcon, EyeClosedIcon} from '@primer/octicons-react'

export default {
  title: 'Composite components/New Button',

  decorators: [
    Story => {
      return (
        <ThemeProvider>
          <BaseStyles>
            <Story />
          </BaseStyles>
        </ThemeProvider>
      )
    }
  ],
  argTypes: {
    size: {
      control: {
        type: 'radio',
        options: ['small', 'medium', 'large', 'square']
      }
    }
  }
} as Meta

export const defaultButton = ({size = 'medium', ...args}: ButtonProps) => {
  return (
    <Button size={size} {...args}>
      Default
    </Button>
  )
}

export const primaryButton = (args: ButtonProps) => {
  return (
    <Button {...args} variant="primary">
      Primary
    </Button>
  )
}

export const dangerButton = (args: ButtonProps) => {
  return (
    <Button {...args} variant="danger">
      Danger
    </Button>
  )
}

export const invisibleButton = (args: ButtonProps) => {
  return (
    <Button {...args} variant="invisible">
      Invisible
    </Button>
  )
}

export const iconBeforeButton = (args: ButtonProps) => {
  return (
    <Button icon={() => <SearchIcon />} {...args}>
      Before
    </Button>
  )
}

export const iconButton = ({...args}: ButtonProps) => {
  return <Button icon={() => <XIcon />} {...args}></Button>
}

export const invisibleIconButton = ({...args}: ButtonProps) => {
  return <Button icon={() => <XIcon />} {...args} variant="invisible"></Button>
}

export const watchCounterButton = ({...args}: ButtonProps) => {
  const [count, setCount] = useState(0)
  return (
    <Button onClick={() => setCount(count + 1)} {...args}>
      Watch <Button.Counter count={count} />
    </Button>
  )
}

export const watchIconButton = ({...args}: ButtonProps) => {
  const [watching, setWatching] = useState(false)
  const icon = watching ? () => <EyeClosedIcon /> : () => <EyeIcon />
  return (
    <Button onClick={() => setWatching(!watching)} icon={icon} {...args}>
      Watch
    </Button>
  )
}
