import React from 'react'

import Loading from 'components/Loading'
import ComparativeTable from './ComparativeTable'
import ComparativeTabs from './ComparativeTabs'

import useMedia from 'hooks/useMedia'

import { IPlan } from 'store/modules/TripInsurance/InsuranceQuotation/types'

import * as s from './styles'

interface IComparativeModal {
  isOpen: boolean
  handleClose: (isOpen: boolean) => void
  travelPlans?: IPlan[]
  isLoading?: boolean
}

const ComparativeModal: React.FC<IComparativeModal> = ({
  isOpen,
  handleClose,
  travelPlans,
  isLoading = false,
  ...rest
}) => {
  const isNotMobile = useMedia('mdUp')

  const loadingContent = () => (
    <Loading
      textAlign="center"
      type="bar"
      legend="Aguarde, estamos buscando suas informações..."
    />
  )

  const content = () =>
    travelPlans ? (
      isNotMobile ? (
        <ComparativeTable travelPlans={travelPlans} />
      ) : (
        <ComparativeTabs travelPlans={travelPlans} />
      )
    ) : null

  return (
    <s.Modal
      modalTitle={isNotMobile ? 'Comparativo de coberturas' : 'Planos Brasil'}
      isOpen={isOpen}
      handleClose={() => handleClose(false)}
      {...rest}
    >
      {isLoading ? loadingContent() : content()}
    </s.Modal>
  )
}

export default ComparativeModal
