import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { uuid } from 'uuidv4'
import moment from 'moment'

import VerticalList from 'components/VerticalList'

import { formatCpf, handleGiwRedirect } from 'helpers'
import { useToast } from 'hooks/toast'
import { GetCreditCardClientDataRequest } from 'store/modules/CreditCard/action'

import { IStepComponent, ICreditCardCreationPayload } from '../types'
import { GridContainer, WhiteContent } from '../styles'
import * as s from './styles'
import * as t from './types'

const FirstStep = ({
  onNextStep,
  ...rest
}: Pick<IStepComponent, 'onNextStep'>) => {
  const dispatch = useDispatch()
  const { addToast } = useToast()
  const [customerData, setCustomerData] = useState<t.TCustomerData | undefined>(
    undefined
  )

  useEffect(() => {
    dispatch(GetCreditCardClientDataRequest({ addToast }))
  }, [dispatch])

  const { creditCardClient } = useSelector((state: t.IState) => ({
    creditCardClient: state.creditCard.clientData,
  }))

  useEffect(() => {
    if (creditCardClient) {
      setCustomerData({
        email: creditCardClient.emailCliente,
        numeroDocumentoIdentificacao: formatCpf(creditCardClient.cpfCnpj),
        dataNascimento: moment(creditCardClient.dataNascimento).format(
          'DD/MM/YYYY'
        ),
        numeroTelefone: `${creditCardClient.dddNumeroTelefone}${creditCardClient.numeroTelefone}`.replace(
          /(\d{2})(\d{1})(\d{4})(\d{4})/,
          '($1) $2 $3-$4'
        ),
      })
    }
  }, [creditCardClient])

  return (
    <WhiteContent>
      <GridContainer>
        <s.GridRow {...rest}>
          <s.GridCol lg={4} md={6} sm={7} xs={12}>
            <s.InfoContainer>
              <s.Title>Confirme as informações abaixo</s.Title>

              {customerData
                ? Object.entries(customerData).map(([key, value], index) => (
                    <React.Fragment key={uuid()}>
                      <VerticalList
                        elements={[
                          <s.Label>
                            {t.EInputsLabel[key as t.TEnumKeys]}
                          </s.Label>,
                          <s.Value>{value}</s.Value>,
                        ]}
                      />
                      {index === 3 ? null : <s.Divisor />}
                    </React.Fragment>
                  ))
                : null}

              <s.Button
                outline
                data-gtm-type="click"
                data-gtm-clicktype="button"
                data-gtm-subname={'primeira etapa - cartão de crédito'}
                data-gtm-name="alterar no perfil"
                onClick={() => {
                  handleGiwRedirect('portaldecliente/conquista/perfil?r=true')
                }}
              >
                ALTERAR NO PERFIL
              </s.Button>
              <s.Button
                data-gtm-type="click"
                data-gtm-clicktype="button"
                data-gtm-subname={'primeira etapa - cartão de crédito'}
                data-gtm-name="confirmar"
                onClick={() => {
                  let stepAnswers: ICreditCardCreationPayload = {}

                  if (creditCardClient) {
                    stepAnswers = {
                      ...customerData,
                      tipoDocumento: 'CPF',
                      numeroDocumentoIdentificacao: +creditCardClient.cpfCnpj,
                      dddTelefone: +creditCardClient.dddNumeroTelefone,
                      numeroTelefone: +creditCardClient.numeroTelefone,
                    }
                  }
                  onNextStep(stepAnswers)
                }}
              >
                CONFIRMAR
              </s.Button>
              <s.Divisor />
              <s.FooterText>
                Não se preocupe, a solicitação só será enviada após informarmos
                o cartão disponível para você.
              </s.FooterText>
            </s.InfoContainer>
          </s.GridCol>
        </s.GridRow>
      </GridContainer>
    </WhiteContent>
  )
}

export default FirstStep
