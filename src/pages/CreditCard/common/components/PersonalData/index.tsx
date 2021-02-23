import React, { useCallback, useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import moment from 'moment'

import Button from 'components/Button/Link'
import Divisor from 'components/Divisor'
import Text from 'components/Text'
import { ICreditCardClientData } from 'store/modules/CreditCard/types'
import DocumentInfo from 'pages/CreditCard/common/components/DataShower/DocumentInfo'
import { formatCpf, formatPhoneNumber } from 'helpers'
import {
  ISummaryStep,
  ICreditCardCreationPayload,
  ICreditCardProposalResponse,
} from 'pages/CreditCard/Creation/types'
import {
  ESexLabel,
  ECivilStateLabel,
} from 'pages/CreditCard/Creation/common/labels'

import DataShower from '../DataShower'
import EditingPersonalData from '../EditingData/EditingPersonalData'

import * as S from './styles'

const PersonalData = ({
  formData,
  setFormData,
}: Omit<ISummaryStep, 'onSubmit' | 'retrySubmit' | 'isLoading'>) => {
  const [isOpen, setIsOpen] = useState(false)
  const [occupationName, setOccupationName] = useState<string | null>(null)

  const { creditCardClient, creditCardOccupation } = useSelector(
    (state: any) => ({
      creditCardClient: state.creditCard.clientData,
      creditCardOccupation: state.creditCardOccupation.data,
    })
  )

  const extractOccupationLabel = useCallback(() => {
    const idOccupation = formData.codigoProfissao ?? null
    if (!idOccupation) return null

    const selectedOccupation = creditCardOccupation.profissoesVO.find(
      (ocupation: any) => idOccupation === ocupation.codProfissaoProduto
    )
    setOccupationName(selectedOccupation ? selectedOccupation.nome : null)
  }, [formData, creditCardOccupation])

  useEffect(() => {
    extractOccupationLabel()
  }, [extractOccupationLabel])

  const isPersonalDataValid = (
    personalData: ICreditCardClientData | null,
    formData: ICreditCardCreationPayload | ICreditCardProposalResponse
  ) =>
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
          <DataShower label="E-mail" truncate>
            {creditCardClient?.emailCliente}
          </DataShower>
          <Divisor />
          <DataShower label="CPF">
            {formatCpf(creditCardClient ? creditCardClient.cpfCnpj : '')}
          </DataShower>
          <Divisor />
          <DataShower label="Data de nascimento">
            {creditCardClient?.dataNascimento &&
            moment(creditCardClient?.dataNascimento).isValid()
              ? moment(creditCardClient?.dataNascimento).format('DD/MM/YYYY')
              : ''}
          </DataShower>
          <Divisor />
          <DataShower label="Celular">
            {formatPhoneNumber(
              `${creditCardClient?.dddNumeroTelefone}${creditCardClient?.numeroTelefone}`
            )}
          </DataShower>
          <Divisor />
          <DataShower label="Estado onde reside">{formData.uf}</DataShower>
          <Divisor />
          <DocumentInfo formData={formData} />
          <Divisor />
          <DataShower label="Estado Civil">
            {ECivilStateLabel[+formData.codigoEstadoCivil!]}
          </DataShower>
          <Divisor />
          <DataShower label="Sexo">{ESexLabel[formData.sexo! as 'M' | 'F']}</DataShower>
          <Divisor />
          <DataShower label="Ocupação">{occupationName}</DataShower>
          <Divisor />
          <DataShower label="Nome da mãe">{formData.nomeMae}</DataShower>
        </S.Wrapper>
      </S.StyledCard>
    </>
  )
}

export default PersonalData
