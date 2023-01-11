import {test, expect} from '@playwright/test'
import {contrastOnly} from '../test-helpers/axe'
import {visit} from '../test-helpers/storybook'
import {themes} from '../test-helpers/themes'

test.describe('IconButton', () => {
  test.describe('Playground', () => {
    for (const theme of themes) {
      test.describe(theme, () => {
        test('default @vrt', async ({page}) => {
          await visit(page, {
            id: 'components-iconbutton--playground',
            globals: {
              colorScheme: theme,
            },
          })

          // Default state
          expect(await page.screenshot()).toMatchSnapshot(`IconButton.Playground.${theme}.png`)
        })

        test('axe @aat', async ({page}) => {
          await visit(page, {
            id: 'components-iconbutton--playground',
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
        id: 'components-iconbutton--playground',
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

  test.describe('Danger', () => {
    for (const theme of themes) {
      test.describe(theme, () => {
        test('default @vrt', async ({page}) => {
          await visit(page, {
            id: 'components-iconbutton-features--danger',
            globals: {
              colorScheme: theme,
            },
          })

          // Default state
          expect(await page.screenshot()).toMatchSnapshot(`IconButton.Danger.${theme}.png`)
        })

        test('axe @aat', async ({page}) => {
          await visit(page, {
            id: 'components-iconbutton-features--danger',
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
        id: 'components-iconbutton-features--danger',
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

  test.describe('Default', () => {
    for (const theme of themes) {
      test.describe(theme, () => {
        test('default @vrt', async ({page}) => {
          await visit(page, {
            id: 'components-iconbutton-features--default',
            globals: {
              colorScheme: theme,
            },
          })

          // Default state
          expect(await page.screenshot()).toMatchSnapshot(`IconButton.Default.${theme}.png`)
        })

        test('axe @aat', async ({page}) => {
          await visit(page, {
            id: 'components-iconbutton-features--default',
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
        id: 'components-iconbutton-features--default',
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

  test.describe('Disabled', () => {
    for (const theme of themes) {
      test.describe(theme, () => {
        test('default @vrt', async ({page}) => {
          await visit(page, {
            id: 'components-iconbutton-features--disabled',
            globals: {
              colorScheme: theme,
            },
          })

          // Default state
          expect(await page.screenshot()).toMatchSnapshot(`IconButton.Disabled.${theme}.png`)
        })

        test('axe @aat', async ({page}) => {
          await visit(page, {
            id: 'components-iconbutton-features--disabled',
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
        id: 'components-iconbutton-features--disabled',
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

  test.describe('Invisible', () => {
    for (const theme of themes) {
      test.describe(theme, () => {
        test('default @vrt', async ({page}) => {
          await visit(page, {
            id: 'components-iconbutton-features--invisible',
            globals: {
              colorScheme: theme,
            },
          })

          // Default state
          expect(await page.screenshot()).toMatchSnapshot(`IconButton.Invisible.${theme}.png`)
        })

        test('axe @aat', async ({page}) => {
          await visit(page, {
            id: 'components-iconbutton-features--invisible',
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
        id: 'components-iconbutton-features--invisible',
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

  test.describe('Large', () => {
    for (const theme of themes) {
      test.describe(theme, () => {
        test('default @vrt', async ({page}) => {
          await visit(page, {
            id: 'components-iconbutton-features--large',
            globals: {
              colorScheme: theme,
            },
          })

          // Default state
          expect(await page.screenshot()).toMatchSnapshot(`IconButton.Large.${theme}.png`)
        })

        test('axe @aat', async ({page}) => {
          await visit(page, {
            id: 'components-iconbutton-features--large',
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
        id: 'components-iconbutton-features--large',
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

  test.describe('Medium', () => {
    for (const theme of themes) {
      test.describe(theme, () => {
        test('default @vrt', async ({page}) => {
          await visit(page, {
            id: 'components-iconbutton-features--medium',
            globals: {
              colorScheme: theme,
            },
          })

          // Default state
          expect(await page.screenshot()).toMatchSnapshot(`IconButton.Medium.${theme}.png`)
        })

        test('axe @aat', async ({page}) => {
          await visit(page, {
            id: 'components-iconbutton-features--medium',
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
        id: 'components-iconbutton-features--medium',
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

  test.describe('Primary', () => {
    for (const theme of themes) {
      test.describe(theme, () => {
        test('default @vrt', async ({page}) => {
          await visit(page, {
            id: 'components-iconbutton-features--primary',
            globals: {
              colorScheme: theme,
            },
          })

          // Default state
          expect(await page.screenshot()).toMatchSnapshot(`IconButton.Primary.${theme}.png`)
        })

        test('axe @aat', async ({page}) => {
          await visit(page, {
            id: 'components-iconbutton-features--primary',
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
        id: 'components-iconbutton-features--primary',
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

  test.describe('Small', () => {
    for (const theme of themes) {
      test.describe(theme, () => {
        test('default @vrt', async ({page}) => {
          await visit(page, {
            id: 'components-iconbutton-features--small',
            globals: {
              colorScheme: theme,
            },
          })

          // Default state
          expect(await page.screenshot()).toMatchSnapshot(`IconButton.Small.${theme}.png`)
        })

        test('axe @aat', async ({page}) => {
          await visit(page, {
            id: 'components-iconbutton-features--small',
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
        id: 'components-iconbutton-features--small',
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
