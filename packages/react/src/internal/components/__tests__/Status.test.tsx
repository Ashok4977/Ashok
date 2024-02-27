import {render, screen} from '@testing-library/react'
import React from 'react'
import {LiveRegionElement} from '@primer/live-region-element'
import {Status} from '../Status'

function getLiveRegion(): LiveRegionElement {
  const liveRegion = document.querySelector('live-region')
  if (liveRegion) {
    return liveRegion as LiveRegionElement
  }
  throw new Error('No live-region found')
}

describe('Status', () => {
  afterEach(() => {
    // Reset the live-region after each test so that we do not have overlapping
    // messages from previous tests
    const liveRegion = getLiveRegion()
    document.body.removeChild(liveRegion)
  })

  it('should have a default politeness of `polite`', () => {
    render(<Status>test</Status>)

    const liveRegion = getLiveRegion()
    expect(liveRegion.getMessage('polite')).toBe('test')
  })

  it('should pass additional props to the container element', () => {
    const {container} = render(<Status data-testid="container">test</Status>)

    expect(container.firstChild).toHaveAttribute('data-testid', 'container')
  })

  it('should support styling via the `sx` prop', () => {
    render(
      <Status data-testid="container" sx={{color: 'blue'}}>
        test
      </Status>,
    )
    expect(screen.getByTestId('container')).toHaveStyle('color: blue')
  })

  it('should support customizing the container element with `as`', () => {
    render(
      <Status as="span" data-testid="container">
        test
      </Status>,
    )
    expect(screen.getByTestId('container').tagName).toBe('SPAN')
  })
})
