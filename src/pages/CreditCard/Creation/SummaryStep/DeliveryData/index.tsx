import React, { useState } from 'react'

import Button from 'components/Button/Link'
import Text from 'components/Text'
import Divisor from 'components/Divisor'

import { ICreditCardCreationPayload, ISummaryStep } from '../../types'
import DataShower from '../DataShower'
import EditingDeliveryData from '../EditingData/EditingDeliveryData'

import * as S from './styles'

const DeliveryData = ({
  formData,
  setFormData,
}: Omit<ISummaryStep, 'onSubmit' | 'retrySubmit'>) => {
  const [isOpen, setIsOpen] = useState(false)

  const isDeliveryDataValid = (formData: ICreditCardCreationPayload) => {
    return (
      !!formData.cep &&
      !!formData.logradouro &&
      !!formData.numeroLogradouro &&
      !!formData.bairro &&
      !!formData.cidade &&
      !!formData.uf
    )
  }

  return (
    <>
      <EditingDeliveryData
        isOpen={isOpen}
        handleClose={() => setIsOpen(false)}
        formData={formData}
        setFormData={setFormData}
      />
      <S.StyledCard
        headerTitle={
          <Text type="subheading" bold color="gray5">
            DADOS DE ENTREGA
          </Text>
        }
        headerEndItem={
          <Button
            onClick={() => setIsOpen(true)}
            hasNotification={!isDeliveryDataValid(formData)}
          >
            <Text bold type="button" color="blue4">
              Alterar
            </Text>
          </Button>
        }
      >
        <S.Wrapper>
          <DataShower label="CEP" value={formData.cep} />
          <Divisor />
          <DataShower
            label="Endereço"
            value={`${formData.logradouro}, ${formData.numeroLogradouro}`}
          />
          <Divisor />
          <DataShower label="Complemento" value={formData.complemento} />
          <Divisor />
          <DataShower label="Bairro" value={formData.bairro} />
          <Divisor />
          <DataShower label="Cidade" value={formData.cidade} />
          <Divisor />
          <DataShower label="Estado" value={formData.uf} />
        </S.Wrapper>
      </S.StyledCard>
    </>
  )
}

export default DeliveryData
