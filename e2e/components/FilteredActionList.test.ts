import {test, expect} from '@playwright/test'
import {contrastOnly} from '../test-helpers/axe'
import {visit} from '../test-helpers/storybook'
import {themes} from '../test-helpers/themes'

test.describe('FilteredActionList', () => {
  test.describe('Default', () => {
    for (const theme of themes) {
      test.describe(theme, () => {
        test('default @vrt', async ({page}) => {
          await visit(page, {
            id: 'components-filteredactionlist--default',
            globals: {
              colorScheme: theme,
            },
          })

          // Default state
          expect(await page.screenshot()).toMatchSnapshot(`FilteredActionList.Default.${theme}.png`)
        })

        test('axe @aat', async ({page}) => {
          await visit(page, {
            id: 'components-filteredactionlist--default',
            globals: {
              colorScheme: theme,
            },
          })

          if (theme !== 'dark_dimmed') {
            await expect(page).toHaveNoViolations(contrastOnly)
          }
        })
      })
    }

    test('axe @aat', async ({page}) => {
      await visit(page, {
        id: 'components-filteredactionlist--default',
      })

      await expect(page).toHaveNoViolations({
        rules: {
          'color-contrast': {
            enabled: false,
          },
        },
      })
    })
  })
})
