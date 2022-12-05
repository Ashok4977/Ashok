import React, {useEffect, useCallback, useMemo} from 'react'

export type TouchOrMouseEvent = MouseEvent | TouchEvent
type TouchOrMouseEventCallback = (event: TouchOrMouseEvent) => boolean | undefined

export type UseOnOutsideClickSettings = {
  containerRef: React.RefObject<HTMLDivElement> | React.RefObject<HTMLUListElement>
  ignoreClickRefs?: React.RefObject<HTMLElement>[]
  onClickOutside: (e: TouchOrMouseEvent) => void
}

// Because events are handled at the document level, we provide a mechanism for early return.
const stopPropagation = true

/**
 * Calls all handlers in reverse order
 * @param event The MouseEvent generated by the click event.
 */
function handleClick(event: MouseEvent) {
  if (!event.defaultPrevented) {
    for (const handler of Object.values(registry).reverse()) {
      // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
      if (handler(event) === stopPropagation || event.defaultPrevented) {
        break
      }
    }
  }
}

const registry: {[id: number]: TouchOrMouseEventCallback} = {}

function register(id: number, handler: TouchOrMouseEventCallback): void {
  registry[id] = handler
}

function deregister(id: number) {
  delete registry[id]
}

// For auto-incrementing unique identifiers for registered handlers.
let handlerId = 0

export const useOnOutsideClick = ({containerRef, ignoreClickRefs, onClickOutside}: UseOnOutsideClickSettings) => {
  const id = useMemo(() => handlerId++, [])

  const handler = useCallback<TouchOrMouseEventCallback>(
    event => {
      // don't call click handler if the mouse event was triggered by an auxiliary button (right click/wheel button/etc)
      if (event instanceof MouseEvent && event.button > 0) {
        return stopPropagation
      }

      // don't call handler if the click happened inside of the container
      if (containerRef.current?.contains(event.target as Node)) {
        return stopPropagation
      }

      // don't call handler if click happened on an ignored ref
      if (ignoreClickRefs && ignoreClickRefs.some(({current}) => current?.contains(event.target as Node))) {
        return stopPropagation
      }

      onClickOutside(event)
    },
    [containerRef, ignoreClickRefs, onClickOutside],
  )

  useEffect(() => {
    if (Object.keys(registry).length === 0) {
      // use capture to ensure we get all events
      document.addEventListener('mousedown', handleClick, {capture: true})
    }
    register(id, handler)

    return () => {
      deregister(id)
      if (Object.keys(registry).length === 0) {
        document.removeEventListener('mousedown', handleClick, {capture: true})
      }
    }
  }, [id, handler])
}
