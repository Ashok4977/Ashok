import React from 'react'
import {Dialog} from '../Dialog/Dialog'

export function shouldAcceptCallWithNoProps() {
  return <Dialog onClose={() => null} />
}

export function shouldNotAcceptSystemProps() {
  // @ts-expect-error system props should not be accepted
  return <Dialog onClose={() => null} backgroundColor="tomato" />
}
