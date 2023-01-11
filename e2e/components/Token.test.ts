import {test, expect} from '@playwright/test'
import {contrastOnly} from '../test-helpers/axe'
import {visit} from '../test-helpers/storybook'
import {themes} from '../test-helpers/themes'

test.describe('Token', () => {
  test.describe('Default', () => {
    for (const theme of themes) {
      test.describe(theme, () => {
        test('default @vrt', async ({page}) => {
          await visit(page, {
            id: 'components-token--default-token',
            globals: {
              colorScheme: theme,
            },
          })

          // Default state
          expect(await page.screenshot()).toMatchSnapshot(`Token.Default.${theme}.png`)
        })

        test('axe @aat', async ({page}) => {
          await visit(page, {
            id: 'components-token--default-token',
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
        id: 'components-token--default-token',
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

  test.describe('Interactive', () => {
    for (const theme of themes) {
      test.describe(theme, () => {
        test('default @vrt', async ({page}) => {
          await visit(page, {
            id: 'components-token--interactive',
            globals: {
              colorScheme: theme,
            },
          })

          // Default state
          expect(await page.screenshot()).toMatchSnapshot(`Token.Interactive.${theme}.png`)
        })

        test('axe @aat', async ({page}) => {
          await visit(page, {
            id: 'components-token--interactive',
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
        id: 'components-token--interactive',
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

  test.describe('with leadingVisual', () => {
    for (const theme of themes) {
      test.describe(theme, () => {
        test('default @vrt', async ({page}) => {
          await visit(page, {
            id: 'components-token--with-leading-visual',
            globals: {
              colorScheme: theme,
            },
          })

          // Default state
          expect(await page.screenshot()).toMatchSnapshot(`Token.with leadingVisual.${theme}.png`)
        })

        test('axe @aat', async ({page}) => {
          await visit(page, {
            id: 'components-token--with-leading-visual',
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
        id: 'components-token--with-leading-visual',
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

  test.describe('With On Remove Fn', () => {
    for (const theme of themes) {
      test.describe(theme, () => {
        test('default @vrt', async ({page}) => {
          await visit(page, {
            id: 'components-token--with-on-remove-fn',
            globals: {
              colorScheme: theme,
            },
          })

          // Default state
          expect(await page.screenshot()).toMatchSnapshot(`Token.With On Remove Fn.${theme}.png`)
        })

        test('axe @aat', async ({page}) => {
          await visit(page, {
            id: 'components-token--with-on-remove-fn',
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
        id: 'components-token--with-on-remove-fn',
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
