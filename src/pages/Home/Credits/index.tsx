import React, { useState, useEffect } from 'react'
import { uuid } from 'uuidv4'

import EmptyStateContent from './EmptyStateContent'
import { useCardItems } from './useCardItems'

import { GridColFlexCardCarrousel } from './styles'
import CreditCardContent from './CreditCardContent'
import CreditCardError from './CreditCardError'
import FinantialProgressContent from './FinantialProgressContent'
import LoadingStateContent from './LoadingStateContent'
import { useSelector } from 'react-redux'

const Credits: React.FC = ({ children }) => {
  const [isLoading, setIsLoading] = useState(true)
  const creditItems = useCardItems()
  const {
    isConsortiumBuildingLoading,
    isConsortiumVehicleLoading,
    isVehiclesFinancingLoading,
    isCreditCardLoading,
  } = useSelector((state: any) => ({
    isCreditCardLoading: state.creditCard.isLoading,
    isVehiclesFinancingLoading: state.vehicleFinancing.isLoading,
    isConsortiumVehicleLoading: state.consortiumVehicle.isLoading,
    isConsortiumBuildingLoading: state.consortiumBuilding.isLoading,
  }))

  useEffect(() => {
    if (
      !isConsortiumBuildingLoading &&
      !isConsortiumVehicleLoading &&
      !isVehiclesFinancingLoading &&
      !isCreditCardLoading
    ) {
      setIsLoading(false)
    } else {
      setIsLoading(true)
    }
  }, [
    isConsortiumBuildingLoading,
    isConsortiumVehicleLoading,
    isVehiclesFinancingLoading,
    isCreditCardLoading,
  ])

  const content = () => {
    return creditItems.map(cardItem => {
      if (cardItem.type === 'info') {
        return (
          <CreditCardContent
            key={uuid()}
            title={cardItem.title}
            path={cardItem.path}
            subtitle={cardItem.subtitle}
            flag={cardItem.flag}
            valor={cardItem.valor}
          />
        )
      }

      if (cardItem.type === 'progress') {
        return (
          <FinantialProgressContent
            key={uuid()}
            path={cardItem.path}
            title={cardItem.title}
            paidInstallments={cardItem.paidInstallments}
            totalInstallments={cardItem.totalInstallments}
          />
        )
      }

      if (cardItem.type === 'error') {
        return (
          <CreditCardError
            key={uuid()}
            title={cardItem.title}
            msgError="falha ao carregar"
            buttonText="tentar novamente"
          />
        )
      }

      return (
        <EmptyStateContent
          key={uuid()}
          path={cardItem.path}
          title={cardItem.title}
          subtitle={cardItem.subtitle || ''}
          buttonText="conhecer"
        />
      )
    })
  }

  const wrapper = () => {
    if (isLoading) {
      return (
        <GridColFlexCardCarrousel
          headerIcon="financial"
          headerTitle="Crédito"
          headerEndItem={children}
          arrayContent={[<LoadingStateContent />]}
        />
      )
    }
    return (
      <GridColFlexCardCarrousel
        headerIcon="financial"
        headerTitle="Crédito"
        headerEndItem={children}
        arrayContent={content()}
      />
    )
  }

  return wrapper()
}
export default Credits
