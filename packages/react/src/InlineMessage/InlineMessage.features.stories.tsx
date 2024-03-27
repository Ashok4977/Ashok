import type {Meta} from '@storybook/react'
import React from 'react'
import {InlineMessage} from '../InlineMessage'

const meta = {
  title: 'Drafts/Components/InlineMessage/Features',
  component: InlineMessage,
} satisfies Meta<typeof InlineMessage>

export default meta

export const Warning = () => {
  return <InlineMessage variant="warning">An example inline message</InlineMessage>
}

export const Critical = () => {
  return <InlineMessage variant="critical">An example inline message</InlineMessage>
}

export const Success = () => {
  return <InlineMessage variant="success">An example inline message</InlineMessage>
}

export const Unavailable = () => {
  return <InlineMessage variant="unavailable">An example inline message</InlineMessage>
}
