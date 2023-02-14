import {warning} from '../warning'

test('emits a message to console.warn() when the condition is `false`', () => {
  const spy = jest.spyOn(console, 'warn').mockImplementationOnce(() => {})

  warning(false, 'test')

  expect(spy).toHaveBeenCalled()
  expect(spy).toHaveBeenCalledWith('Warning: test')
  spy.mockRestore()
})

test('does not emit a message to console.warn() when the condition is `true`', () => {
  const spy = jest.spyOn(console, 'warn').mockImplementationOnce(() => {})

  warning(true, 'test')

  expect(spy).not.toHaveBeenCalled()
  spy.mockRestore()
})

test('formats arguments into warning string', () => {
  const spy = jest.spyOn(console, 'warn').mockImplementationOnce(() => {})

  warning(false, 'test %s', 1)

  expect(spy).toHaveBeenCalled()
  expect(spy).toHaveBeenCalledWith('Warning: test 1')
  spy.mockRestore()
})
