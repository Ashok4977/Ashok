import React from 'react'
import {ComponentMeta} from '@storybook/react'
import Truncate, {TruncateProps} from './Truncate'

export default {
  title: 'Components/Truncate',
  component: Truncate,
} as ComponentMeta<typeof Truncate>

export const Default = () => <Truncate title="Some example text">Some example text</Truncate>

export const Playground = (args: TruncateProps) => <Truncate {...args}>{args.title}</Truncate>

Playground.args = {
  title: 'Some example text',
  expandable: false,
  inline: false,
  maxWidth: 125,
}

Playground.argTypes = {
  title: {
    type: 'string',
  },
  expandable: {
    controls: {
      type: 'boolean',
    },
  },
  inline: {
    controls: {
      type: 'boolean',
    },
  },
  maxWidth: {
    type: 'number',
  },
  ref: {
    controls: false,
    table: {
      disable: true,
    },
  },
  sx: {
    controls: false,
    table: {
      disable: true,
    },
  },
  theme: {
    controls: false,
    table: {
      disable: true,
    },
  },
  as: {
    controls: false,
    table: {
      disable: true,
    },
  },
  forwardedAs: {
    controls: false,
    table: {
      disable: true,
    },
  },
}
