import {Meta} from '@storybook/react'
import React from 'react'
import {theme, ThemeProvider} from '..'
import BaseStyles from '../BaseStyles'
import {DropdownMenu} from '../DropdownMenu'
import {registerPortalRoot} from '../Portal'

const meta: Meta = {
  title: 'Composite components/DropdownMenu',
  component: DropdownMenu,
  decorators: [
    (Story: React.ComponentType): JSX.Element => {
      // Since portal roots are registered globally, we need this line so that each storybook
      // story works in isolation.
      registerPortalRoot(undefined)
      return (
        <ThemeProvider theme={theme}>
          <BaseStyles>
            <Story />
          </BaseStyles>
        </ThemeProvider>
      )
    }
  ],
  parameters: {
    controls: {
      disable: true
    }
  }
}
export default meta

export function FavoriteColorStory(): JSX.Element {
  return (
    <>
      <h1>Favorite Color</h1>
      <div id="favorite-color-label">Please select your favorite color:</div>
      <DropdownMenu placeholder="🎨" items={[{text: '🔵 Cyan'}, {text: '🔴 Magenta'}, {text: '🟡 Yellow'}]} />
    </>
  )
}
FavoriteColorStory.storyName = 'Favorite Color'
