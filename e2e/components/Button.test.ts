import {test, expect} from '@playwright/test'
import {contrastOnly} from '../test-helpers/axe'
import {visit} from '../test-helpers/storybook'
import {themes} from '../test-helpers/themes'

test.describe('Button', () => {
  test.describe('Playground', () => {
    for (const theme of themes) {
      test.describe(theme, () => {
        test('default @vrt', async ({page}) => {
          await visit(page, {
            id: 'components-button--playground',
            globals: {
              colorScheme: theme,
            },
          })

          // Default state
          expect(await page.screenshot()).toMatchSnapshot(`Button.Playground.${theme}.png`)
        })

        test('axe @aat', async ({page}) => {
          await visit(page, {
            id: 'components-button--playground',
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
        id: 'components-button--playground',
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
            id: 'components-button-features--danger',
            globals: {
              colorScheme: theme,
            },
          })

          // Default state
          expect(await page.screenshot()).toMatchSnapshot(`Button.Danger.${theme}.png`)
        })

        test('axe @aat', async ({page}) => {
          await visit(page, {
            id: 'components-button-features--danger',
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
        id: 'components-button-features--danger',
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
            id: 'components-button-features--default',
            globals: {
              colorScheme: theme,
            },
          })

          // Default state
          expect(await page.screenshot()).toMatchSnapshot(`Button.Default.${theme}.png`)
        })

        test('axe @aat', async ({page}) => {
          await visit(page, {
            id: 'components-button-features--default',
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
        id: 'components-button-features--default',
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
            id: 'components-button-features--disabled',
            globals: {
              colorScheme: theme,
            },
          })

          // Default state
          expect(await page.screenshot()).toMatchSnapshot(`Button.Disabled.${theme}.png`)
        })

        test('axe @aat', async ({page}) => {
          await visit(page, {
            id: 'components-button-features--disabled',
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
        id: 'components-button-features--disabled',
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
            id: 'components-button-features--invisible',
            globals: {
              colorScheme: theme,
            },
          })

          // Default state
          expect(await page.screenshot()).toMatchSnapshot(`Button.Invisible.${theme}.png`)
        })

        test('axe @aat', async ({page}) => {
          await visit(page, {
            id: 'components-button-features--invisible',
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
        id: 'components-button-features--invisible',
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
            id: 'components-button-features--large',
            globals: {
              colorScheme: theme,
            },
          })

          // Default state
          expect(await page.screenshot()).toMatchSnapshot(`Button.Large.${theme}.png`)
        })

        test('axe @aat', async ({page}) => {
          await visit(page, {
            id: 'components-button-features--large',
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
        id: 'components-button-features--large',
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

  test.describe('Leading Visual', () => {
    for (const theme of themes) {
      test.describe(theme, () => {
        test('default @vrt', async ({page}) => {
          await visit(page, {
            id: 'components-button-features--leading-visual',
            globals: {
              colorScheme: theme,
            },
          })

          // Default state
          expect(await page.screenshot()).toMatchSnapshot(`Button.Leading Visual.${theme}.png`)
        })

        test('axe @aat', async ({page}) => {
          await visit(page, {
            id: 'components-button-features--leading-visual',
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
        id: 'components-button-features--leading-visual',
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
            id: 'components-button-features--medium',
            globals: {
              colorScheme: theme,
            },
          })

          // Default state
          expect(await page.screenshot()).toMatchSnapshot(`Button.Medium.${theme}.png`)
        })

        test('axe @aat', async ({page}) => {
          await visit(page, {
            id: 'components-button-features--medium',
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
        id: 'components-button-features--medium',
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

  test.describe('Outline', () => {
    for (const theme of themes) {
      test.describe(theme, () => {
        test('default @vrt', async ({page}) => {
          await visit(page, {
            id: 'components-button-features--outline',
            globals: {
              colorScheme: theme,
            },
          })

          // Default state
          expect(await page.screenshot()).toMatchSnapshot(`Button.Outline.${theme}.png`)
        })

        test('axe @aat', async ({page}) => {
          await visit(page, {
            id: 'components-button-features--outline',
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
        id: 'components-button-features--outline',
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
            id: 'components-button-features--primary',
            globals: {
              colorScheme: theme,
            },
          })

          // Default state
          expect(await page.screenshot()).toMatchSnapshot(`Button.Primary.${theme}.png`)
        })

        test('axe @aat', async ({page}) => {
          await visit(page, {
            id: 'components-button-features--primary',
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
        id: 'components-button-features--primary',
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
            id: 'components-button-features--small',
            globals: {
              colorScheme: theme,
            },
          })

          // Default state
          expect(await page.screenshot()).toMatchSnapshot(`Button.Small.${theme}.png`)
        })

        test('axe @aat', async ({page}) => {
          await visit(page, {
            id: 'components-button-features--small',
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
        id: 'components-button-features--small',
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

  test.describe('Trailing Counter', () => {
    for (const theme of themes) {
      test.describe(theme, () => {
        test('default @vrt', async ({page}) => {
          await visit(page, {
            id: 'components-button-features--trailing-counter',
            globals: {
              colorScheme: theme,
            },
          })

          // Default state
          expect(await page.screenshot()).toMatchSnapshot(`Button.Trailing Counter.${theme}.png`)
        })

        test('axe @aat', async ({page}) => {
          await visit(page, {
            id: 'components-button-features--trailing-counter',
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
        id: 'components-button-features--trailing-counter',
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

  test.describe('Trailing Visual', () => {
    for (const theme of themes) {
      test.describe(theme, () => {
        test('default @vrt', async ({page}) => {
          await visit(page, {
            id: 'components-button-features--trailing-visual',
            globals: {
              colorScheme: theme,
            },
          })

          // Default state
          expect(await page.screenshot()).toMatchSnapshot(`Button.Trailing Visual.${theme}.png`)
        })

        test('axe @aat', async ({page}) => {
          await visit(page, {
            id: 'components-button-features--trailing-visual',
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
        id: 'components-button-features--trailing-visual',
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
