import React, { useState } from 'react'

import Button from 'components/Button/Link'
import Text from 'components/Text'
import Divisor from 'components/Divisor'

import { ECardFlagLabel } from 'pages/CreditCard/Creation/common/labels'
import { ICreditCardCreationPayload, ISummaryStep } from '../../types'
import DataShower from '../DataShower'
import EditingCardData from '../EditingData/EditingCardData'

import * as S from './styles'

const CardData = ({
  formData,
  setFormData,
}: Omit<ISummaryStep, 'onSubmit' | 'retrySubmit'>) => {
  const [isOpen, setIsOpen] = useState(false)

  const isCreditCardDataValid = (formData: ICreditCardCreationPayload) => {
    return !!formData.codigoBandeira && !!formData.diaVencimento
  }

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
          <DataShower
            label="Bandeira"
            value={ECardFlagLabel[+formData.codigoBandeira!]}
          />
          <Divisor />
          <DataShower
            label="Vencimento da fatura"
            value={formData.diaVencimento}
          />
        </S.Wrapper>
      </S.StyledCard>
    </>
  )
}

export default CardData
