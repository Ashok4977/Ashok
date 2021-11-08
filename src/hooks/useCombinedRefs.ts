import {ForwardedRef, useRef} from 'react'
import {useIsomorphicEffect} from '../utils/useIsomorphicEffect'

/**
 * Creates a ref by combining multiple constituent refs. The ref returned by this hook
 * should be passed as the ref for the element that needs to be shared. This is
 * particularly useful when you are using `React.forwardRef` in your component but you
 * also want to be able to access the local element. This is a small anti-pattern,
 * though, as it breaks encapsulation.
 * @param refs
 */
export function useCombinedRefs<T>(...refs: (ForwardedRef<T> | null | undefined)[]) {
  const combinedRef = useRef<T | null>(null)

  useIsomorphicEffect(() => {
    function setRefs(current: T | null = null) {
      for (const ref of refs) {
        if (!ref) {
          return
        }
        if (typeof ref === 'function') {
          ref(current)
        } else {
          ref.current = current
        }
      }
    }

    setRefs(combinedRef.current)

    return () => {
      // ensure the refs get updated on unmount
      setRefs(combinedRef.current)
    }
  }, [...refs, combinedRef.current])

  return combinedRef
}
