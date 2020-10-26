import React, { useState } from 'react'

import Button from 'components/Button/Link'
import Text from 'components/Text'
import Divisor from 'components/Divisor'

import DataShower from '../DataShower'
import EditingCardData from '../EditingData/EditingCardData'

import * as S from './styles'

const CardData = () => {
  const cardData = {
    flag: {
      id: 1,
      name: 'Mastercard',
    },
    dueDate: {
      id: 17,
      name: '17',
    },
  }

  const [isOpen, setIsOpen] = useState(false)

  return (
    <>
      <EditingCardData
        isOpen={isOpen}
        handleClose={() => setIsOpen(false)}
        formData={{ cardData }}
        setFormData={() => {}}
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
          >
            <Text bold type="button" color="blue4">
              Alterar
            </Text>
          </Button>
        }
      >
        <S.Wrapper>
          <DataShower label="Bandeira" value={cardData.flag.name} />
          <Divisor />
          <DataShower
            label="Vencimento da fatura"
            value={cardData.dueDate.name}
          />
        </S.Wrapper>
      </S.StyledCard>
    </>
  )
}

export default CardData
