import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import moment from 'moment'

import Button from 'components/Button/Link'
import Text from 'components/Text'
import Divisor from 'components/Divisor'

import DataShower from '../DataShower'
import EditingPersonalData from '../EditingData/EditingPersonalData'

import { formatCpf } from 'helpers'

import { ISummaryStep, IState } from 'pages/CreditCard/Creation/types'
import * as S from './styles'

const PersonalData = ({
  formData,
  setFormData,
}: Omit<ISummaryStep, 'onSubmit'>) => {
  const [isOpen, setIsOpen] = useState(false)

  const { creditCardClient } = useSelector((state: IState) => ({
    creditCardClient: state.creditCard.clientData,
  }))

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
          <Button onClick={() => setIsOpen(true)}>
            <Text bold type="button" color="blue4">
              Alterar
            </Text>
          </Button>
        }
      >
        <S.Wrapper>
          {creditCardClient && (
            <>
              <DataShower
                label="E-mail"
                value={creditCardClient.emailCliente}
              />
              <Divisor />
              <DataShower
                label="CPF"
                value={formatCpf(creditCardClient.cpfCnpj)}
              />
              <Divisor />
              <DataShower
                label="Data de nascimento"
                value={moment(creditCardClient.dataNascimento).format(
                  'DD/MM/YYYY'
                )}
              />
              <Divisor />
              <DataShower
                label="Celular"
                value={
                  String(creditCardClient.numeroTelefone).length === 9
                    ? `${creditCardClient.dddNumeroTelefone}${creditCardClient.numeroTelefone}`.replace(
                        /(\d{2})(\d{1})(\d{4})(\d{4})/,
                        '($1) $2 $3-$4'
                      )
                    : `${creditCardClient.dddNumeroTelefone}${creditCardClient.numeroTelefone}`.replace(
                        /(\d{2})(\d{4})(\d{4})/,
                        '($1) $2-$3'
                      )
                }
              />
            </>
          )}
          {/* <Divisor />
       <DocumentInfo document={formData.document}/> */}
          <Divisor />
          <DataShower label="Cidade" value={formData.cidade} />
          <Divisor />
          <DataShower label="Estado Civil" value={formData.codigoEstadoCivil} />
          <Divisor />
          <DataShower label="Sexo" value={formData.sexo} />
          <Divisor />
          <DataShower label="Ocupação" value={formData.codigoProfissao} />
          <Divisor />
          <DataShower label="Nome da mãe" value={formData.nomeMae} />
        </S.Wrapper>
      </S.StyledCard>
    </>
  )
}

export default PersonalData
