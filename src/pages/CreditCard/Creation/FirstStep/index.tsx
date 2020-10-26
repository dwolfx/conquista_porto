import React, { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { uuid } from 'uuidv4'
import moment from 'moment'

import VerticalList from 'components/VerticalList'

import { formatCpf, handleGiwRedirect } from 'helpers'

import useFetchCustomerProfile from 'hooks/CustomerProfile/useFetchCustomerProfile'

import * as s from './styles'
import * as t from './types'
import { GridContainer, WhiteContent } from '../styles'

const FirstStep: React.FC<t.IFirstStep> = ({ onNextStep, ...rest }) => {
  const [customerData, setCustomerData] = useState<t.ICustomerData[] | null>(
    null
  )

  useFetchCustomerProfile()

  const { customerProfile } = useSelector<any, any>(state => ({
    customerProfile: state.customerProfile,
  }))

  useEffect(() => {
    if (customerProfile.data) {
      setCustomerData([
        {
          label: 'E-MAIL',
          value: customerProfile.data.customerEmail,
        },
        {
          label: 'CPF',
          value: formatCpf(customerProfile.data.cpfCnpj),
        },
        {
          label: 'DATA DE NASCIMENTO',
          value: moment(customerProfile.data.customerBirthdate).format(
            'DD/MM/YYYY'
          ),
        },
        {
          label: 'CELULAR',
          value: `${customerProfile.data.customerAreaCode}${customerProfile.data.customerPhoneNumber}`.replace(
            /(\d{2})(\d{1})(\d{4})(\d{4})/,
            '($1) $2 $3-$4'
          ),
        },
      ])
    }
  }, [customerProfile.data])

  return (
    <WhiteContent>
      <GridContainer>
        <s.GridRow {...rest}>
          <s.GridCol lg={4} md={6} sm={7} xs={12}>
            <s.InfoContainer>
              <s.Title>Confirme as informações abaixo</s.Title>

              {customerData
                ? customerData.map((item, index) => (
                    <React.Fragment key={uuid()}>
                      <VerticalList
                        elements={[
                          <s.Label>{item.label}</s.Label>,
                          <s.Value>{item.value}</s.Value>,
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
                onClick={onNextStep}
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
