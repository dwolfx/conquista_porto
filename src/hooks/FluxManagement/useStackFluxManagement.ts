import { StepComponent } from './types'
import React from 'react'
import { useSelector, useDispatch } from 'react-redux'

import { AddElementFluxManagementStack, PopElementFluxManagementStack} from 'store/modules/FluxManagement/actions'

export interface IUseStackFluxManagement<T> {
  stack: React.ReactElement<T>[]
  getLast(): React.ReactElement<T>
  getLength(): number
  add(element: React.ReactElement<T>): void
  pop(): void
}

export default function useStackFluxManagement<T> () {
  const stack: React.ReactElement<T>[] = useSelector((state: any) => state.fluxManagement.stack)

  const dispatch = useDispatch()

  const getLength = React.useCallback(() => {
    return stack.length
  }, [stack.length])

  const getLast = React.useCallback(() => {
    return stack[getLength() - 1]
  }, [stack, getLength])

  const add = React.useCallback((element: React.ReactElement<T>) => {
    dispatch(AddElementFluxManagementStack<T>(element))
  }, [dispatch])

  const instantiate = React.useCallback((element: StepComponent) => {
    const algumaCoisa = React.createElement(element) as React.ReactElement
    add(algumaCoisa)
  }, [add])

  const pop = React.useCallback(() => {
    dispatch(PopElementFluxManagementStack())
  }, [dispatch])

  return { stack, instantiate, getLast, getLength, add, pop }
}
