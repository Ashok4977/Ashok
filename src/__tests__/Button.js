import React from 'react'
import Button from '../Button'
import ButtonDanger from '../ButtonDanger'
import ButtonLink from '../ButtonLink'
import renderer from 'react-test-renderer'

const render = component => {
  const node = renderer.create(component).toJSON()
  for (const [key, val] of Object.entries(node.props)) {
    if (val === undefined) {
      delete node.props[key]
    }
  }
  return node
}

function noop() {}

describe('Button', () => {
  it('renders a <button>', () => {
    expect(render(<Button />))
      .toEqual(render(<button className='btn' type='button' />))
  })

  it('renders children', () => {
    expect(render(<Button>foo <b>bar</b></Button>))
      .toEqual(render(<button className='btn' type='button'>foo <b>bar</b></button>))
  })

  it('respects the "block" prop', () => {
    expect(render(<Button block />).props.className)
      .toEqual('btn btn-block')
  })

  it('respects the "disabled" prop', () => {
    expect(render(<Button disabled />).props.disabled)
      .toEqual(true)
  })

  it('respects the "linkStyle" prop', () => {
    expect(render(<Button linkStyle />).props.className)
      .toEqual('btn-link')
  })

  it('respects the "scheme" prop', () => {
    expect(render(<Button scheme='danger' />).props.className)
      .toEqual('btn btn-danger')
    expect(render(<Button scheme='primary' />).props.className)
      .toEqual('btn btn-primary')
    // non-truthy values should not result in any new classes
    expect(render(<Button scheme={null} />).props.className)
      .toEqual('btn')
    expect(render(<Button scheme={false} />).props.className)
      .toEqual('btn')
  })

  it('respects the "size" prop', () => {
    expect(render(<Button size='small' />).props.className)
      .toEqual('btn btn-sm')
    expect(render(<Button size='large' />).props.className)
      .toEqual('btn btn-large')
  })

  it('preserves "onClick" prop', () => {
    expect(render(<Button onClick={noop} />).props.onClick)
      .toEqual(noop)
  })

  it('ignores onClick if disabled', () => {
    expect(render(<Button disabled onClick={noop} />).props.onClick)
      .toEqual(undefined)
  })

  describe('Button.withProps()', () => {
    it('creates a class that always sets the provided props', () => {
      const XButton = Button.withProps({scheme: 'x'})
      expect(render(<XButton />))
        .toEqual(render(<button className='btn btn-x' type='button' />))
    })
  })
})

describe('ButtonDanger', () => {
  it('renders a <button>', () => {
    expect(render(<ButtonDanger />))
      .toEqual(render(<button className='btn btn-danger' type='button' />))
  })

  it('renders children', () => {
    expect(render(<ButtonDanger>foo <b>bar</b></ButtonDanger>))
      .toEqual(render(<button className='btn btn-danger' type='button'>foo <b>bar</b></button>))
  })
})

describe('ButtonLink', () => {
  it('renders a <button> by default', () => {
    expect(render(<ButtonLink />))
      .toEqual(render(<button className='btn-link' type='button' />))
  })
})
