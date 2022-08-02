import React from 'react'
import {useAnchoredPosition} from '../../hooks/useAnchoredPosition'
import {render} from '@testing-library/react'

const Component = ({callback}: {callback: (hookReturnValue: ReturnType<typeof useAnchoredPosition>) => void}) => {
  const floatingElementRef = React.useRef<HTMLDivElement>(null)
  const anchorElementRef = React.useRef<HTMLDivElement>(null)
  callback(useAnchoredPosition({floatingElementRef, anchorElementRef}))
  return (
    <div style={{position: 'absolute'}}>
      <div
        style={{position: 'absolute', top: '20px', left: '20px', height: '50px', width: '50px'}}
        ref={floatingElementRef}
      />
      <div ref={anchorElementRef} />
    </div>
  )
}

it('should should return a position', () => {
  const cb = jest.fn()
  render(<Component callback={cb} />)
  expect(cb).toHaveBeenCalledTimes(2)
  expect(cb.mock.calls[1][0]['position']).toMatchInlineSnapshot(`
    Object {
      "anchorAlign": "start",
      "anchorSide": "outside-bottom",
      "left": 0,
      "top": 4,
    }
  `)
})
