import { renderHook } from '@testing-library/react-hooks'

import useBankOptions from './useBankOptions'

import { TSelected } from 'components/Inputs/Select/types'

describe('CreditCard', () => {
  it('should call hook useBankOptions', () => {
    const state: [
      TSelected,
      React.Dispatch<React.SetStateAction<TSelected>>
    ] = [
      {
        id: 0,
        name: '',
      },
      () => {},
    ]

    const { result } = renderHook(() =>
      useBankOptions({ selectedState: state })
    )
    expect(result).toBeDefined()
  })
})
