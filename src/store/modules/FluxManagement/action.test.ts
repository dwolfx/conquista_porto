import React from 'react'
import { Steps } from 'pages/ConsortiumBuilding/Creation/types'
import {
  AddElementFluxManagementStack,
  PopElementFluxManagementStack,
  ResetFluxManagement,
  ResetFormFluxManagement,
  UpdateFormFluxManagementStack,
} from './actions'
import { Types } from './types'

describe('Flux Management Actions', () => {
  const jsxElement = React.createElement(Steps.chooseState) as React.ReactElement

  test('if AddElementFluxManagementStack returns the correct object', () => {
    expect(AddElementFluxManagementStack(jsxElement)).toEqual({
      type: Types.FLUX_MANAGEMENT_ADD_TO_STACK,
      element: jsxElement
    })
  })

  test('if PopElementFluxManagementStack returns the correct object', () => {
    expect(PopElementFluxManagementStack()).toEqual({
      type: Types.FLUX_MANAGEMENT_POP_FROM_STACK,
    })
  })

  test('if UpdateFormFluxManagementStack returns the correct object', () => {
    expect(UpdateFormFluxManagementStack(jsxElement)).toEqual({
      type: Types.FLUX_MANAGEMENT_UPDATE_FORM,
      updatedKeys: jsxElement
    })
  })

  test('if ResetFormFluxManagement returns the correct object', () => {
    expect(ResetFormFluxManagement()).toEqual({
      type: Types.FLUX_MANAGEMENT_RESET_FLUX,
    })
  })

  test('if ResetFluxManagement returns the correct object', () => {
    expect(ResetFluxManagement()).toEqual({
      type: Types.FLUX_MANAGEMENT_RESET_FORM,
    })
  })
})
