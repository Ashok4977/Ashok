import {render as HTMLRender, fireEvent} from '@testing-library/react'
import {axe} from 'jest-axe'
import React, {useCallback, useRef, useState} from 'react'

import {ActionMenu} from '../../ActionMenu'
import {ActionList} from '../../ActionList'
import BaseStyles from '../../BaseStyles'
import Box from '../../Box'
import {Button} from '../../Button'
import {ConfirmationDialog, useConfirm} from './ConfirmationDialog'
import theme from '../../theme'
import {ThemeProvider} from '../../ThemeProvider'
import {SSRProvider} from '../../utils/ssr'
import {behavesAsComponent, checkExports} from '../../utils/testing'

const Basic = ({confirmButtonType}: Pick<React.ComponentProps<typeof ConfirmationDialog>, 'confirmButtonType'>) => {
  const [isOpen, setIsOpen] = useState(false)
  const buttonRef = useRef<HTMLButtonElement>(null)
  const onDialogClose = useCallback(() => setIsOpen(false), [])
  return (
    <ThemeProvider theme={theme}>
      <SSRProvider>
        <BaseStyles>
          <Button ref={buttonRef} onClick={() => setIsOpen(!isOpen)}>
            Show dialog
          </Button>
          {isOpen && (
            <ConfirmationDialog
              title="Confirm"
              onClose={onDialogClose}
              cancelButtonContent="Secondary"
              confirmButtonContent="Primary"
              confirmButtonType={confirmButtonType}
            >
              Lorem ipsum dolor sit Pippin good dog.
            </ConfirmationDialog>
          )}
        </BaseStyles>
      </SSRProvider>
    </ThemeProvider>
  )
}

const ShorthandHookFromActionMenu = () => {
  const confirm = useConfirm()
  const [text, setText] = useState('Show menu')
  const onButtonClick = useCallback(async () => {
    if (
      await confirm({
        title: 'Confirm',
        content: 'Confirm',
        cancelButtonContent: 'Secondary',
        confirmButtonContent: 'Primary',
      })
    ) {
      setText('Confirmed')
    }
  }, [confirm])
  return (
    <ThemeProvider theme={theme}>
      <SSRProvider>
        <BaseStyles>
          <Box display="flex" flexDirection="column" alignItems="flex-start">
            <ActionMenu>
              <ActionMenu.Button>{text}</ActionMenu.Button>
              <ActionMenu.Overlay width="medium">
                <ActionList>
                  <ActionList.Item onSelect={onButtonClick}>Show dialog</ActionList.Item>
                </ActionList>
              </ActionMenu.Overlay>
            </ActionMenu>
          </Box>
        </BaseStyles>
      </SSRProvider>
    </ThemeProvider>
  )
}

describe('ConfirmationDialog', () => {
  behavesAsComponent({
    Component: ConfirmationDialog,
    toRender: () => <Basic />,
    options: {skipAs: true, skipSx: true},
  })

  checkExports('drafts/Dialog2/ConfirmationDialog', {
    default: undefined,
    useConfirm,
    ConfirmationDialog,
  })

  it('should have no axe violations', async () => {
    const spy = jest.spyOn(console, 'warn').mockImplementation()
    const {container} = HTMLRender(<Basic />)
    spy.mockRestore()
    const results = await axe(container)
    expect(results).toHaveNoViolations()
  })

  it('focuses the primary action when opened and the confirmButtonType is not set', async () => {
    const {getByText, getByRole} = HTMLRender(<Basic />)
    fireEvent.click(getByText('Show dialog'))
    expect(getByRole('button', {name: 'Primary'})).toHaveFocus()
    expect(getByRole('button', {name: 'Secondary'})).not.toHaveFocus()
  })

  it('focuses the primary action when opened and the confirmButtonType is not danger', async () => {
    const {getByText, getByRole} = HTMLRender(<Basic confirmButtonType="primary" />)
    fireEvent.click(getByText('Show dialog'))
    expect(getByRole('button', {name: 'Primary'})).toHaveFocus()
    expect(getByRole('button', {name: 'Secondary'})).not.toHaveFocus()
  })

  it('focuses the secondary action when opened and the confirmButtonType is danger', async () => {
    const {getByText, getByRole} = HTMLRender(<Basic confirmButtonType="danger" />)
    fireEvent.click(getByText('Show dialog'))
    expect(getByRole('button', {name: 'Primary'})).not.toHaveFocus()
    expect(getByRole('button', {name: 'Secondary'})).toHaveFocus()
  })

  it('supports nested `focusTrap`s', async () => {
    const {getByText, getByRole} = HTMLRender(<ShorthandHookFromActionMenu />)

    fireEvent.click(getByText('Show menu'))
    fireEvent.click(getByText('Show dialog'))

    expect(getByRole('button', {name: 'Primary'})).toHaveFocus()
    expect(getByRole('button', {name: 'Secondary'})).not.toHaveFocus()
  })
})
