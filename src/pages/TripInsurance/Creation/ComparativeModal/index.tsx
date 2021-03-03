import React from 'react'

import Loading from 'components/Loading'
import ComparativeTable from './ComparativeTable'
import ComparativeTabs from './ComparativeTabs'

import useMedia from 'hooks/useMedia'

import { IPlan } from 'store/modules/TripInsurance/InsuranceQuotation/types'

import * as s from './styles'
import { ITableTitles } from './ComparativeTable/types'

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
  const isNotMobile = useMedia('smUp')

  const loadingContent = () => (
    <Loading
      textAlign="center"
      type="bar"
      legend="Aguarde, estamos buscando suas informações..."
    />
  )

  const columnTitles: ITableTitles[] = []
  const rowData: any[] = []
  if (travelPlans) {
    travelPlans.map(plan =>
      columnTitles.push({
        planId: plan.codigoPlano,
        planName: plan.nomePlano,
      })
    )
    travelPlans.forEach((plan, planIndex) => {
      plan.ViagemCobertura.coberturas.forEach((coverage, coverageIndex) => {
        if (planIndex === 0) {
          // adiciona o valor da coluna 'COBERTURA' e do primeiro plano
          rowData.push([coverage.descricao, coverage.valor])
        } else {
          // adiciona o valor dos demais planos na linha
          rowData[coverageIndex] = [...rowData[coverageIndex], coverage.valor]
        }
      })
    })
  }

  const content = () =>
    travelPlans ? (
      isNotMobile ? (
        <ComparativeTable rowData={rowData} columnTitles={columnTitles} />
      ) : (
        <ComparativeTabs travelPlans={travelPlans} />
      )
    ) : null

  return (
    <s.Modal
      modalTitle={isNotMobile ? 'Comparativo de coberturas' : 'Coberturas'}
      isOpen={isOpen}
      handleClose={() => handleClose(false)}
      {...rest}
    >
      {isLoading ? loadingContent() : content()}
    </s.Modal>
  )
}

export default ComparativeModal
