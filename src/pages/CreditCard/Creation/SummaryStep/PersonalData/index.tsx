import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import moment from 'moment'

import Button from 'components/Button/Link'
import Text from 'components/Text'
import Divisor from 'components/Divisor'
import DocumentInfo from 'pages/CreditCard/Creation/SummaryStep/DataShower/DocumentInfo'

import { formatCpf, formatPhoneNumber } from 'helpers'

import {
  ISummaryStep,
  IState,
  ICreditCardCreationPayload,
} from 'pages/CreditCard/Creation/types'
import {
  ESexLabel,
  ECivilStateLabel,
  OcuppationLabel,
} from 'pages/CreditCard/Creation/common/labels'

import DataShower from '../DataShower'
import EditingPersonalData from '../EditingData/EditingPersonalData'
import * as S from './styles'
import { ICreditCardClientData } from 'store/modules/CreditCard/types'

const PersonalData = ({
  formData,
  setFormData,
}: Omit<ISummaryStep, 'onSubmit' | 'retrySubmit'>) => {
  const [isOpen, setIsOpen] = useState(false)

  const { creditCardClient } = useSelector((state: IState) => ({
    creditCardClient: state.creditCard.clientData,
  }))

  // DADOS MOCKADOS -- TIRAR ASSIM QUE A INTEGRAÇÃO ESTIVER FEITA
  // const creditCardClient: ICreditCardClientData = {
  //   cpfCnpj: '12345678901',
  //   dataNascimento: '1987-11-25T00:00:00-03:00',
  //   dddNumeroTelefone: 11,
  //   emailCliente: 'email@email.com',
  //   message: {
  //     mensagem: '',
  //     tipoCritica: '',
  //   },
  //   nomeCliente: 'José da Silva Sauro',
  //   numeroTelefone: 962365254,
  // }

  const isPersonalDataValid = (
    personalData: ICreditCardClientData | null,
    formData: ICreditCardCreationPayload
  ) => {
    return (
      personalData &&
      !!personalData?.emailCliente &&
      !!personalData?.cpfCnpj &&
      !!personalData?.dataNascimento &&
      !!personalData?.dddNumeroTelefone &&
      !!personalData?.numeroTelefone &&
      !!formData?.tipoDocumento &&
      !!formData?.numeroDocumentoIdentificacao &&
      !!formData?.dataEmissaoDocumento &&
      !!formData?.orgaoExpedidor &&
      !!formData?.cidade &&
      !!formData?.codigoEstadoCivil &&
      !!formData?.sexo &&
      !!formData?.codigoProfissao &&
      !!formData?.nomeMae
    )
  }

  return (
    <>
      <EditingPersonalData
        isOpen={isOpen}
        handleClose={() => setIsOpen(false)}
        formData={formData}
        setFormData={setFormData}
      />
      <S.StyledCard
        headerTitle={
          <Text type="subheading" bold color="gray5">
            DADOS PESSOAIS
          </Text>
        }
        headerEndItem={
          <Button
            onClick={() => setIsOpen(true)}
            hasNotification={!isPersonalDataValid(creditCardClient, formData)}
          >
            <Text bold type="button" color="blue4">
              Alterar
            </Text>
          </Button>
        }
      >
        <S.Wrapper>
          <DataShower label="E-mail" value={creditCardClient?.emailCliente} />
          <Divisor />
          <DataShower
            label="CPF"
            value={formatCpf(creditCardClient ? creditCardClient.cpfCnpj : '')}
          />
          <Divisor />
          <DataShower
            label="Data de nascimento"
            value={
              creditCardClient?.dataNascimento &&
              moment(creditCardClient?.dataNascimento).isValid()
                ? moment(creditCardClient?.dataNascimento).format('DD/MM/YYYY')
                : ''
            }
          />
          <Divisor />
          <DataShower
            label="Celular"
            value={formatPhoneNumber(
              creditCardClient?.dddNumeroTelefone,
              creditCardClient?.numeroTelefone
            )}
          />
          <Divisor />
          <DataShower label="Estado onde reside" value={formData.cidade} />
          <Divisor />
          <DocumentInfo formData={formData} />
          <Divisor />
          <DataShower
            label="Estado Civil"
            value={ECivilStateLabel[+formData.codigoEstadoCivil!]}
          />
          <Divisor />
          <DataShower
            label="Sexo"
            value={ESexLabel[formData.sexo! as 'M' | 'F']}
          />
          <Divisor />
          <DataShower
            label="Ocupação"
            value={OcuppationLabel(formData.codigoProfissao!)}
          />
          <Divisor />
          <DataShower label="Nome da mãe" value={formData.nomeMae} />
        </S.Wrapper>
      </S.StyledCard>
    </>
  )
}

export default PersonalData
