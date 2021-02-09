import { Steps } from 'pages/TripInsurance/Creation/types'
import React from 'react'
import reducer from './reducer'
import { Types } from './types'

interface IInitState { stack: React.ReactElement[]; form: {} }

const defaultState: IInitState = {
  stack: [],
  form: {},
}

const element = React.createElement(Steps.choosePlan) as React.ReactElement

describe('Flux Management Reducer', () => {
  it('should return INITIAL_STATE', () => {
    expect(reducer(undefined, {})).toEqual({
      stack: [],
      form: {},
    })
  })

  it('should handle FLUX_MANAGEMENT_ADD_TO_STACK', () => {
    expect(
      reducer(
        {
          form: {},
          stack: [element],
        },
        {
          type: Types.FLUX_MANAGEMENT_ADD_TO_STACK,
        }
      )
    ).toEqual({
      form: {},
      stack: [element, undefined],
    })
  })

  it('should handle FLUX_MANAGEMENT_POP_FROM_STACK', () => {
    expect(
      reducer(defaultState,
        {
          type: Types.FLUX_MANAGEMENT_POP_FROM_STACK,
        }
      )
    ).toEqual(defaultState)
  })

  it('should handle FLUX_MANAGEMENT_UPDATE_FORM', () => {
    const form = {
      name: 'Carlos Alexandre',
      document: '00000000191'
    }
    expect(
      reducer(
        {
          ...defaultState,
          form
        },
        {
          type: Types.FLUX_MANAGEMENT_UPDATE_FORM,
        }
      )
    ).toEqual({
      ...defaultState,
      form
    })
  })

  it('should handle FLUX_MANAGEMENT_RESET_FORM', () => {
    expect(
      reducer(
        {
          ...defaultState,
          form: {},
        },
        {
          type: Types.FLUX_MANAGEMENT_RESET_FORM,
        }
      )
    ).toEqual({
      ...defaultState,
      form: {},
    })
  })

  it('should handle FLUX_MANAGEMENT_RESET_FLUX', () => {
    expect(
      reducer(defaultState,
        {
          type: Types.FLUX_MANAGEMENT_RESET_FLUX,
        }
      )
    ).toEqual(defaultState)
  })

  it('should handle DEFAULT', () => {
    expect(
      reducer(
        {
          ...defaultState,
        },
        {
          type: null,
        }
      )
    ).toEqual(defaultState)
  })
})
