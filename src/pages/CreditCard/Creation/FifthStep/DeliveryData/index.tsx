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
        formData={{
          bairro: 'Aldeia da Areia',
          cep: '01412111',
          cidade: 'São Paulo',
          codigoBandeira: '2',
          codigoCanal: '14',
          codigoEstadoCivil: '1',
          codigoProfissao: '3',
          complemento: 'Ap 171',
          dataEmissaoDocumento: '12/02;2010',
          dataNascimento: '10/06/1984',
          dddTelefone: '11',
          diaVencimento: '17',
          email: 'uchiha@konoha.com.jp',
          idSimulacao: '16',
          logradouro: 'Avenida Brasil',
          nacionalidade: 'Brasileira',
          nome: 'Sasuke',
          nomeMae: 'Senhora Uchiha',
          numeroDocumentoIdentificacao: '92637929',
          numeroLogradouro: '20',
          numeroTelefone: '40028922',
          orgaoExpedidor: 'SP',
          sexo: 'M',
          tipoDocumento: 'RG',
          uf: 'SP',
          valorRenda: '10000',
        }}
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
