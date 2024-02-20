import type {ChangeEventHandler, FocusEventHandler, KeyboardEventHandler} from 'react'
import React, {useCallback, useContext, useEffect, useState} from 'react'
import type {ForwardRefComponent as PolymorphicForwardRefComponent} from '../utils/polymorphic'
import {AutocompleteContext} from './AutocompleteContext'
import TextInput from '../TextInput'
import {useRefObjectAsForwardedRef} from '../hooks/useRefObjectAsForwardedRef'
import type {ComponentProps} from '../utils/types'
import useSafeTimeout from '../hooks/useSafeTimeout'

type InternalAutocompleteInputProps = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  as?: React.ComponentType<React.PropsWithChildren<any>>
}

const AutocompleteInput = React.forwardRef(
  (
    {as: Component = TextInput, onFocus, onBlur, onChange, onKeyDown, onKeyUp, onKeyPress, value, ...props},
    forwardedRef,
  ) => {
    const autocompleteContext = useContext(AutocompleteContext)
    if (autocompleteContext === null) {
      throw new Error('AutocompleteContext returned null values')
    }
    const {
      activeDescendantRef,
      autocompleteSuggestion = '',
      id,
      inputRef,
      inputValue = '',
      isMenuDirectlyActivated,
      setInputValue,
      setShowMenu,
      showMenu,
    } = autocompleteContext
    useRefObjectAsForwardedRef(forwardedRef, inputRef)
    const [highlightRemainingText, setHighlightRemainingText] = useState<boolean>(true)
    const {safeSetTimeout} = useSafeTimeout()

    const handleInputFocus: FocusEventHandler<HTMLInputElement> = useCallback(
      event => {
        onFocus && onFocus(event)
        setShowMenu(true)
      },
      [onFocus, setShowMenu],
    )

    const handleInputBlur: FocusEventHandler<HTMLInputElement> = useCallback(
      event => {
        onBlur && onBlur(event)

        // HACK: wait a tick and check the focused element before hiding the autocomplete menu
        // this prevents the menu from hiding when the user is clicking an option in the Autoselect.Menu,
        // but still hides the menu when the user blurs the input by tabbing out or clicking somewhere else on the page
        safeSetTimeout(() => {
          if (document.activeElement !== inputRef.current) {
            setShowMenu(false)
          }
        }, 0)
      },
      [onBlur, setShowMenu, inputRef, safeSetTimeout],
    )

    const handleInputChange: ChangeEventHandler<HTMLInputElement> = useCallback(
      event => {
        onChange && onChange(event)
        setInputValue(event.currentTarget.value)
        if (!showMenu) {
          setShowMenu(true)
        }
      },
      [onChange, setInputValue, setShowMenu, showMenu],
    )

    const handleInputKeyDown: KeyboardEventHandler<HTMLInputElement> = useCallback(
      event => {
        onKeyDown && onKeyDown(event)

        if (event.key === 'Backspace') {
          setHighlightRemainingText(false)
        }

        if (event.key === 'Escape' && inputRef.current?.value) {
          setInputValue('')
          inputRef.current.value = ''
        }
        // Issue: Change events and useEffects aren't triggered when the input value matches autoCompleteSuggestion after an input.
        // This is because the current inputRef value always matches autoCompleteSuggestion between keystrokes (for highlighting), so no actual change is detected.
        // Fix: Intercept the keydown event and check if the user's input will match the suggestion. If it does, prevent the default behavior and fire the input event manually.
        if (inputValue + event.key === autocompleteSuggestion && inputRef.current?.value === autocompleteSuggestion) {
          event.preventDefault()
          // @ts-ignore - _valueTracker is a private property, responsible for tracking input value changes. React relies on this to track changes.
          const reactValueTracker = inputRef.current._valueTracker
          if (!reactValueTracker) {
            return
          }
          reactValueTracker.setValue()
          inputRef.current.dispatchEvent(new Event('input', {bubbles: true}))
        }
      },
      [onKeyDown, inputRef, inputValue, autocompleteSuggestion, setInputValue],
    )

    const handleInputKeyUp: KeyboardEventHandler<HTMLInputElement> = useCallback(
      event => {
        onKeyUp && onKeyUp(event)

        if (event.key === 'Backspace') {
          setHighlightRemainingText(true)
        }
      },
      [setHighlightRemainingText, onKeyUp],
    )

    const onInputKeyPress: KeyboardEventHandler<HTMLInputElement> = useCallback(
      event => {
        onKeyPress && onKeyPress(event)

        if (showMenu && event.key === 'Enter' && activeDescendantRef.current) {
          event.preventDefault()
          event.nativeEvent.stopImmediatePropagation()

          // Forward Enter key press to active descendant so that item gets activated
          const activeDescendantEvent = new KeyboardEvent(event.type, event.nativeEvent)
          activeDescendantRef.current.dispatchEvent(activeDescendantEvent)
        }
      },
      [activeDescendantRef, showMenu, onKeyPress],
    )

    useEffect(() => {
      if (!inputRef.current) {
        return
      }

      // resets input value to being empty after a selection has been made
      if (!autocompleteSuggestion) {
        inputRef.current.value = inputValue
      }
      if (highlightRemainingText && autocompleteSuggestion && (inputValue || isMenuDirectlyActivated)) {
        inputRef.current.value = autocompleteSuggestion

        if (autocompleteSuggestion.toLowerCase().indexOf(inputValue.toLowerCase()) === 0) {
          inputRef.current.setSelectionRange(inputValue.length, autocompleteSuggestion.length)
        }
      }

      // calling this useEffect when `highlightRemainingText` changes breaks backspace functionality
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [autocompleteSuggestion, inputValue, inputRef, isMenuDirectlyActivated])

    useEffect(() => {
      setInputValue(typeof value !== 'undefined' ? value.toString() : '')
    }, [value, setInputValue])

    return (
      <Component
        onFocus={handleInputFocus}
        onBlur={handleInputBlur}
        onChange={handleInputChange}
        onKeyDown={handleInputKeyDown}
        onKeyPress={onInputKeyPress}
        onKeyUp={handleInputKeyUp}
        ref={inputRef}
        aria-controls={`${id}-listbox`}
        aria-autocomplete="both"
        role="combobox"
        aria-expanded={showMenu}
        aria-haspopup="listbox"
        aria-owns={`${id}-listbox`}
        autoComplete="off"
        id={id}
        {...props}
      />
    )
  },
) as PolymorphicForwardRefComponent<typeof TextInput, InternalAutocompleteInputProps>

AutocompleteInput.displayName = 'AutocompleteInput'

export type AutocompleteInputProps = ComponentProps<typeof AutocompleteInput>
export default AutocompleteInput
