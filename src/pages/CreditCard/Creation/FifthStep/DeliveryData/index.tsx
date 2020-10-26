import React, { useState } from 'react'

import Button from 'components/Button/Link'
import Text from 'components/Text'
import Divisor from 'components/Divisor'

import DataShower from '../DataShower'
import EditingDeliveryData from '../EditingData/EditingDeliveryData'

import * as S from './styles'

const DeliveryData = () => {
  const cardData = {
    cep: 'Mastercard',
    address: '131.507.476-19',
    complement: 'Apto. 412B',
    neighborhood: 'Consolação',
    city: 'São Paulo',
    state: 'SP',
  }

  const [isOpen, setIsOpen] = useState(false)

  return (
    <>
      <EditingDeliveryData
        isOpen={isOpen}
        handleClose={() => setIsOpen(false)}
        formData={{ cardData }}
        setFormData={() => {}}
      />
      <S.StyledCard
        headerTitle={
          <Text type="subheading" bold color="gray5">
            DADOS DE ENTREGA
          </Text>
        }
        headerEndItem={
          <Button onClick={() => setIsOpen(true)}>
            <Text bold type="button" color="blue4">
              Alterar
            </Text>
          </Button>
        }
      >
        <S.Wrapper>
          <DataShower label="CEP" value={cardData.cep} />
          <Divisor />
          <DataShower label="Endereço" value={cardData.address} />
          <Divisor />
          <DataShower label="Complemento" value={cardData.complement} />
          <Divisor />
          <DataShower label="Bairro" value={cardData.neighborhood} />
          <Divisor />
          <DataShower label="Cidade" value={cardData.city} />
          <Divisor />
          <DataShower label="Estado" value={cardData.state} />
        </S.Wrapper>
      </S.StyledCard>
    </>
  )
}

export default DeliveryData
