import {test, expect} from '@playwright/test'
import {contrastOnly} from '../test-helpers/axe'
import {visit} from '../test-helpers/storybook'
import {themes} from '../test-helpers/themes'

test.describe('ActionList', () => {
  test.describe('Playground', () => {
    for (const theme of themes) {
      test.describe(theme, () => {
        test('default @vrt', async ({page}) => {
          await visit(page, {
            id: 'components-actionlist--playground',
            globals: {
              colorScheme: theme,
            },
          })

          // Default state
          expect(await page.screenshot()).toMatchSnapshot(`ActionList.Playground.${theme}.png`)
        })

        test('axe @aat', async ({page}) => {
          await visit(page, {
            id: 'components-actionlist--playground',
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
        id: 'components-actionlist--playground',
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

  test.describe('Group Playground', () => {
    for (const theme of themes) {
      test.describe(theme, () => {
        test('default @vrt', async ({page}) => {
          await visit(page, {
            id: 'components-actionlist--group-playground',
            globals: {
              colorScheme: theme,
            },
          })

          // Default state
          expect(await page.screenshot()).toMatchSnapshot(`ActionList.Group Playground.${theme}.png`)
        })

        test('axe @aat', async ({page}) => {
          await visit(page, {
            id: 'components-actionlist--group-playground',
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
        id: 'components-actionlist--group-playground',
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

  test.describe('Block Description', () => {
    for (const theme of themes) {
      test.describe(theme, () => {
        test('default @vrt', async ({page}) => {
          await visit(page, {
            id: 'components-actionlist-features--block-description',
            globals: {
              colorScheme: theme,
            },
          })

          // Default state
          expect(await page.screenshot()).toMatchSnapshot(`ActionList.Block Description.${theme}.png`)
        })

        test('axe @aat', async ({page}) => {
          await visit(page, {
            id: 'components-actionlist-features--block-description',
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
        id: 'components-actionlist-features--block-description',
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

  test.describe('Child With Side Effects', () => {
    for (const theme of themes) {
      test.describe(theme, () => {
        test('default @vrt', async ({page}) => {
          await visit(page, {
            id: 'components-actionlist-features--child-with-side-effects',
            globals: {
              colorScheme: theme,
            },
          })

          // Default state
          expect(await page.screenshot()).toMatchSnapshot(`ActionList.Child With Side Effects.${theme}.png`)
        })

        test('axe @aat', async ({page}) => {
          await visit(page, {
            id: 'components-actionlist-features--child-with-side-effects',
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
        id: 'components-actionlist-features--child-with-side-effects',
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

  test.describe('Conditional Children', () => {
    for (const theme of themes) {
      test.describe(theme, () => {
        test('default @vrt', async ({page}) => {
          await visit(page, {
            id: 'components-actionlist-features--conditional-children',
            globals: {
              colorScheme: theme,
            },
          })

          // Default state
          expect(await page.screenshot()).toMatchSnapshot(`ActionList.Conditional Children.${theme}.png`)
        })

        test('axe @aat', async ({page}) => {
          await visit(page, {
            id: 'components-actionlist-features--conditional-children',
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
        id: 'components-actionlist-features--conditional-children',
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

  test.describe('Custom Item Children', () => {
    for (const theme of themes) {
      test.describe(theme, () => {
        test('default @vrt', async ({page}) => {
          await visit(page, {
            id: 'components-actionlist-features--custom-item-children',
            globals: {
              colorScheme: theme,
            },
          })

          // Default state
          expect(await page.screenshot()).toMatchSnapshot(`ActionList.Custom Item Children.${theme}.png`)
        })

        test('axe @aat', async ({page}) => {
          await visit(page, {
            id: 'components-actionlist-features--custom-item-children',
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
        id: 'components-actionlist-features--custom-item-children',
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

  test.describe('Disabled Item', () => {
    for (const theme of themes) {
      test.describe(theme, () => {
        test('default @vrt', async ({page}) => {
          await visit(page, {
            id: 'components-actionlist-features--disabled-item',
            globals: {
              colorScheme: theme,
            },
          })

          // Default state
          expect(await page.screenshot()).toMatchSnapshot(`ActionList.Disabled Item.${theme}.png`)
        })

        test('axe @aat', async ({page}) => {
          await visit(page, {
            id: 'components-actionlist-features--disabled-item',
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
        id: 'components-actionlist-features--disabled-item',
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

  test.describe('Group With Filled Title', () => {
    for (const theme of themes) {
      test.describe(theme, () => {
        test('default @vrt', async ({page}) => {
          await visit(page, {
            id: 'components-actionlist-features--group-with-filled-title',
            globals: {
              colorScheme: theme,
            },
          })

          // Default state
          expect(await page.screenshot()).toMatchSnapshot(`ActionList.Group With Filled Title.${theme}.png`)
        })

        test('axe @aat', async ({page}) => {
          await visit(page, {
            id: 'components-actionlist-features--group-with-filled-title',
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
        id: 'components-actionlist-features--group-with-filled-title',
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

  test.describe('Group With Subtle Title', () => {
    for (const theme of themes) {
      test.describe(theme, () => {
        test('default @vrt', async ({page}) => {
          await visit(page, {
            id: 'components-actionlist-features--group-with-subtle-title',
            globals: {
              colorScheme: theme,
            },
          })

          // Default state
          expect(await page.screenshot()).toMatchSnapshot(`ActionList.Group With Subtle Title.${theme}.png`)
        })

        test('axe @aat', async ({page}) => {
          await visit(page, {
            id: 'components-actionlist-features--group-with-subtle-title',
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
        id: 'components-actionlist-features--group-with-subtle-title',
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

  test.describe('Inline Description', () => {
    for (const theme of themes) {
      test.describe(theme, () => {
        test('default @vrt', async ({page}) => {
          await visit(page, {
            id: 'components-actionlist-features--inline-description',
            globals: {
              colorScheme: theme,
            },
          })

          // Default state
          expect(await page.screenshot()).toMatchSnapshot(`ActionList.Inline Description.${theme}.png`)
        })

        test('axe @aat', async ({page}) => {
          await visit(page, {
            id: 'components-actionlist-features--inline-description',
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
        id: 'components-actionlist-features--inline-description',
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

  test.describe('Inside Overlay', () => {
    for (const theme of themes) {
      test.describe(theme, () => {
        test('default @vrt', async ({page}) => {
          await visit(page, {
            id: 'components-actionlist-features--inside-overlay',
            globals: {
              colorScheme: theme,
            },
          })

          // Default state
          expect(await page.screenshot()).toMatchSnapshot(`ActionList.Inside Overlay.${theme}.png`)
        })

        test('axe @aat', async ({page}) => {
          await visit(page, {
            id: 'components-actionlist-features--inside-overlay',
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
        id: 'components-actionlist-features--inside-overlay',
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

  test.describe('Item Dividers', () => {
    for (const theme of themes) {
      test.describe(theme, () => {
        test('default @vrt', async ({page}) => {
          await visit(page, {
            id: 'components-actionlist-features--item-dividers',
            globals: {
              colorScheme: theme,
            },
          })

          // Default state
          expect(await page.screenshot()).toMatchSnapshot(`ActionList.Item Dividers.${theme}.png`)
        })

        test('axe @aat', async ({page}) => {
          await visit(page, {
            id: 'components-actionlist-features--item-dividers',
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
        id: 'components-actionlist-features--item-dividers',
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

  test.describe('Links', () => {
    for (const theme of themes) {
      test.describe(theme, () => {
        test('default @vrt', async ({page}) => {
          await visit(page, {
            id: 'components-actionlist-features--links',
            globals: {
              colorScheme: theme,
            },
          })

          // Default state
          expect(await page.screenshot()).toMatchSnapshot(`ActionList.Links.${theme}.png`)
        })

        test('axe @aat', async ({page}) => {
          await visit(page, {
            id: 'components-actionlist-features--links',
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
        id: 'components-actionlist-features--links',
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

  test.describe('Multi Select', () => {
    for (const theme of themes) {
      test.describe(theme, () => {
        test('default @vrt', async ({page}) => {
          await visit(page, {
            id: 'components-actionlist-features--multi-select',
            globals: {
              colorScheme: theme,
            },
          })

          // Default state
          expect(await page.screenshot()).toMatchSnapshot(`ActionList.Multi Select.${theme}.png`)
        })

        test('axe @aat', async ({page}) => {
          await visit(page, {
            id: 'components-actionlist-features--multi-select',
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
        id: 'components-actionlist-features--multi-select',
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

  test.describe('Simple List', () => {
    for (const theme of themes) {
      test.describe(theme, () => {
        test('default @vrt', async ({page}) => {
          await visit(page, {
            id: 'components-actionlist-features--simple-list',
            globals: {
              colorScheme: theme,
            },
          })

          // Default state
          expect(await page.screenshot()).toMatchSnapshot(`ActionList.Simple List.${theme}.png`)
        })

        test('axe @aat', async ({page}) => {
          await visit(page, {
            id: 'components-actionlist-features--simple-list',
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
        id: 'components-actionlist-features--simple-list',
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

  test.describe('Single Divider', () => {
    for (const theme of themes) {
      test.describe(theme, () => {
        test('default @vrt', async ({page}) => {
          await visit(page, {
            id: 'components-actionlist-features--single-divider',
            globals: {
              colorScheme: theme,
            },
          })

          // Default state
          expect(await page.screenshot()).toMatchSnapshot(`ActionList.Single Divider.${theme}.png`)
        })

        test('axe @aat', async ({page}) => {
          await visit(page, {
            id: 'components-actionlist-features--single-divider',
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
        id: 'components-actionlist-features--single-divider',
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

  test.describe('Single Select', () => {
    for (const theme of themes) {
      test.describe(theme, () => {
        test('default @vrt', async ({page}) => {
          await visit(page, {
            id: 'components-actionlist-features--single-select',
            globals: {
              colorScheme: theme,
            },
          })

          // Default state
          expect(await page.screenshot()).toMatchSnapshot(`ActionList.Single Select.${theme}.png`)
        })

        test('axe @aat', async ({page}) => {
          await visit(page, {
            id: 'components-actionlist-features--single-select',
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
        id: 'components-actionlist-features--single-select',
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

  test.describe('Text Wrap And Truncation', () => {
    for (const theme of themes) {
      test.describe(theme, () => {
        test('default @vrt', async ({page}) => {
          await visit(page, {
            id: 'components-actionlist-features--text-wrap-and-truncation',
            globals: {
              colorScheme: theme,
            },
          })

          // Default state
          expect(await page.screenshot()).toMatchSnapshot(`ActionList.Text Wrap And Truncation.${theme}.png`)
        })

        test('axe @aat', async ({page}) => {
          await visit(page, {
            id: 'components-actionlist-features--text-wrap-and-truncation',
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
        id: 'components-actionlist-features--text-wrap-and-truncation',
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

  test.describe('With Avatars', () => {
    for (const theme of themes) {
      test.describe(theme, () => {
        test('default @vrt', async ({page}) => {
          await visit(page, {
            id: 'components-actionlist-features--with-avatars',
            globals: {
              colorScheme: theme,
            },
          })

          // Default state
          expect(await page.screenshot()).toMatchSnapshot(`ActionList.With Avatars.${theme}.png`)
        })

        test('axe @aat', async ({page}) => {
          await visit(page, {
            id: 'components-actionlist-features--with-avatars',
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
        id: 'components-actionlist-features--with-avatars',
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

  test.describe('With Icons', () => {
    for (const theme of themes) {
      test.describe(theme, () => {
        test('default @vrt', async ({page}) => {
          await visit(page, {
            id: 'components-actionlist-features--with-icons',
            globals: {
              colorScheme: theme,
            },
          })

          // Default state
          expect(await page.screenshot()).toMatchSnapshot(`ActionList.With Icons.${theme}.png`)
        })

        test('axe @aat', async ({page}) => {
          await visit(page, {
            id: 'components-actionlist-features--with-icons',
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
        id: 'components-actionlist-features--with-icons',
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

  test.describe('All Combinations', () => {
    for (const theme of themes) {
      test.describe(theme, () => {
        test('default @vrt', async ({page}) => {
          await visit(page, {
            id: 'components-actionlist-examples--all-combinations',
            globals: {
              colorScheme: theme,
            },
          })

          // Default state
          expect(await page.screenshot()).toMatchSnapshot(`ActionList.All Combinations.${theme}.png`)
        })

        test('axe @aat', async ({page}) => {
          await visit(page, {
            id: 'components-actionlist-examples--all-combinations',
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
        id: 'components-actionlist-examples--all-combinations',
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

  test.describe('Async List With Spinner', () => {
    for (const theme of themes) {
      test.describe(theme, () => {
        test('default @vrt', async ({page}) => {
          await visit(page, {
            id: 'components-actionlist-examples--async-list-with-spinner',
            globals: {
              colorScheme: theme,
            },
          })

          // Default state
          expect(await page.screenshot()).toMatchSnapshot(`ActionList.Async List With Spinner.${theme}.png`)
        })

        test('axe @aat', async ({page}) => {
          await visit(page, {
            id: 'components-actionlist-examples--async-list-with-spinner',
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
        id: 'components-actionlist-examples--async-list-with-spinner',
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

  test.describe('Link Item', () => {
    for (const theme of themes) {
      test.describe(theme, () => {
        test('default @vrt', async ({page}) => {
          await visit(page, {
            id: 'components-actionlist-examples--list-link-item',
            globals: {
              colorScheme: theme,
            },
          })

          // Default state
          expect(await page.screenshot()).toMatchSnapshot(`ActionList.Link Item.${theme}.png`)
        })

        test('axe @aat', async ({page}) => {
          await visit(page, {
            id: 'components-actionlist-examples--list-link-item',
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
        id: 'components-actionlist-examples--list-link-item',
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

  test.describe('Memex Sortable List', () => {
    for (const theme of themes) {
      test.describe(theme, () => {
        test('default @vrt', async ({page}) => {
          await visit(page, {
            id: 'components-actionlist-examples--memex-sortable',
            globals: {
              colorScheme: theme,
            },
          })

          // Default state
          expect(await page.screenshot()).toMatchSnapshot(`ActionList.Memex Sortable List.${theme}.png`)
        })

        test('axe @aat', async ({page}) => {
          await visit(page, {
            id: 'components-actionlist-examples--memex-sortable',
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
        id: 'components-actionlist-examples--memex-sortable',
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

  test.describe('Mixed Selection', () => {
    for (const theme of themes) {
      test.describe(theme, () => {
        test('default @vrt', async ({page}) => {
          await visit(page, {
            id: 'components-actionlist-examples--mixed-selection',
            globals: {
              colorScheme: theme,
            },
          })

          // Default state
          expect(await page.screenshot()).toMatchSnapshot(`ActionList.Mixed Selection.${theme}.png`)
        })

        test('axe @aat', async ({page}) => {
          await visit(page, {
            id: 'components-actionlist-examples--mixed-selection',
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
        id: 'components-actionlist-examples--mixed-selection',
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
