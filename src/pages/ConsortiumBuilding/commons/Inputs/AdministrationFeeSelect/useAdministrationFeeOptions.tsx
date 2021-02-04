import React from 'react'

import { TOptions } from 'components/Inputs/Select/types'

import * as t from '../types'
import * as u from '../utils'

const useAdministrationFeeOptions = ({ selectedState }: t.ISelectHook) => {
  const [options, setOptions] = React.useState<TOptions[]>([])

  React.useEffect(() => {
    if (u.administrationFeeData?.length) {
      setOptions(
        u.administrationFeeData
          .map((administrationFee, index) =>
            u.formatOption(
              index + 1,
              `${administrationFee.name}`,
              selectedState[1]
            )
          )
          .sort((a, b) => (a.text < b.text ? -1 : 1))
      )
    }
  }, [selectedState])

  return { options }
}

export default useAdministrationFeeOptions
