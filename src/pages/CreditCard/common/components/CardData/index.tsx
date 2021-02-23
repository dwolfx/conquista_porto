import React, { useState } from 'react'

import Button from 'components/Button/Link'
import Text from 'components/Text'
import Divisor from 'components/Divisor'
import {
  FLAGS,
  ICreditCardCreationPayload,
  ISummaryStep,
} from 'pages/CreditCard/Creation/types'
import DataShower from 'pages/CreditCard/common/components/DataShower'
import EditingCardData from 'pages/CreditCard/common/components/EditingData/EditingCardData'
import useCreditCardDetails from 'hooks/CreditCard/useCreditCardDetails'

import * as S from './styles'

const CardData = ({
  formData,
  setFormData,
}: Omit<ISummaryStep, 'onSubmit' | 'retrySubmit' | 'isLoading'>) => {
  const [isOpen, setIsOpen] = useState(false)
  const { flagName } = useCreditCardDetails(formData.codigoBandeira as FLAGS || null)

  const isCreditCardDataValid = (formData: ICreditCardCreationPayload) =>
    !!formData.codigoBandeira && !!formData.diaVencimento

  return (
    <>
      <EditingCardData
        isOpen={isOpen}
        handleClose={() => setIsOpen(false)}
        formData={formData}
        setFormData={setFormData}
      />
      <S.StyledCard
        headerTitle={
          <Text type="subheading" bold color="gray5">
            DADOS DO CARTÃO
          </Text>
        }
        headerEndItem={
          <Button
            onClick={() => {
              setIsOpen(true)
            }}
            hasNotification={!isCreditCardDataValid(formData)}
          >
            <Text bold type="button" color="blue4">
              Alterar
            </Text>
          </Button>
        }
      >
        <S.Wrapper>
          <DataShower label="Bandeira">{flagName}</DataShower>
          <Divisor />
          <DataShower label="Vencimento da fatura">{formData.diaVencimento}</DataShower>
        </S.Wrapper>
      </S.StyledCard>
    </>
  )
}

export default CardData
