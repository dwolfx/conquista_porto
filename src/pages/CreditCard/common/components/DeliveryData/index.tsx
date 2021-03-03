import React, { useState } from 'react'

import Button from 'components/Button/Link'
import Text from 'components/Text'
import Divisor from 'components/Divisor'

import { ISummaryStep } from 'pages/CreditCard/Creation/types'
import DataShower from '../DataShower'
import EditingDeliveryData from '../EditingData/EditingDeliveryData'

import * as S from './styles'

const DeliveryData = ({
  formData,
  setFormData,
}: Omit<ISummaryStep, 'onSubmit' | 'retrySubmit' | 'isLoading'>) => {
  const [isOpen, setIsOpen] = useState(false)

  const isDeliveryDataValid = () =>
    !!formData.cep &&
    !!formData.logradouro &&
    !!formData.numeroLogradouro &&
    !!formData.bairro &&
    !!formData.cidade &&
    !!formData.uf

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
            hasNotification={!isDeliveryDataValid()}
          >
            <Text bold type="button" color="blue4">
              Alterar
            </Text>
          </Button>
        }
      >
        <S.Wrapper>
          <DataShower label="CEP">
            {formData?.cep?.replace(/(\d{5})(\d{3})/g, '$1-$2')}
          </DataShower>
          <Divisor />
          <DataShower label="Endereço">{`${formData.logradouro}, ${formData.numeroLogradouro}`}</DataShower>
          <Divisor />
          <DataShower label="Complemento">{formData.complemento}</DataShower>
          <Divisor />
          <DataShower label="Bairro">{formData.bairro}</DataShower>
          <Divisor />
          <DataShower label="Cidade">{formData.cidade}</DataShower>
          <Divisor />
          <DataShower label="Estado">{formData.uf}</DataShower>
        </S.Wrapper>
      </S.StyledCard>
    </>
  )
}

export default DeliveryData
