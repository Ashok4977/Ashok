import React from 'react'
import {Meta} from '@storybook/react'
import TabNav from './TabNav'
import {ComponentProps} from '../internal/types'

export default {
  title: 'Components/TabNav/Features',
  component: TabNav,
  subcomponents: {
    'TabNav.Link': TabNav.Link,
  },
} as Meta<ComponentProps<typeof TabNav>>

export const Selected = () => (
  <TabNav aria-label="Main">
    <TabNav.Link href="#">Home</TabNav.Link>
    <TabNav.Link href="#" selected>
      Documentation
    </TabNav.Link>
    <TabNav.Link href="#">Support</TabNav.Link>
  </TabNav>
)
