import React from 'react'

import { Currency } from 'helpers/money'

import * as s from './styles'

interface IPlanCardProps {
  creditValue: number
  monthlyValue: number
  numberInstallment: number
  groupCode: string
  quota: number
  reserveFund: number
  administrativeFee: number
  lifeInsurance: number
}

const PlanCard = ({
  creditValue,
  monthlyValue,
  numberInstallment,
  groupCode,
  quota,
  reserveFund,
  administrativeFee,
  lifeInsurance,
}: IPlanCardProps) => {
  return (
    <s.CardComponent>
      <s.Container>
        <s.Row>
          <s.InfoWrapper>
            <s.Text
              type="subheading"
              textTransform="uppercase"
              color="gray5"
              bold
            >
              CRÉDITO TOTAL
            </s.Text>
            <s.Text type="heading3">{Currency.parse(creditValue, true)}</s.Text>
            <s.Tag>
              <s.Text type="button" bold>
                GRUPO EM ANDAMENTO
              </s.Text>
            </s.Tag>
          </s.InfoWrapper>
        </s.Row>
        <s.Row>
          <s.Col lg={6}>
            <s.VerticalList
              elements={[
                <s.Text type="captionUppercase" bold color="gray5">
                  PARCELA MENSAL
                </s.Text>,
                <s.Text type="headline" bold>
                  {Currency.parse(monthlyValue, true)}
                </s.Text>,
              ]}
            />
          </s.Col>
          <s.Col lg={6}>
            <s.VerticalList
              elements={[
                <s.Text type="captionUppercase" bold color="gray5">
                  Nº DE PARCELAS
                </s.Text>,
                <s.Text type="headline" bold>
                  {numberInstallment}
                </s.Text>,
              ]}
            />
          </s.Col>
        </s.Row>
        <s.Row>
          <s.Col lg={6}>
            <s.VerticalList
              elements={[
                <s.Text type="captionUppercase" bold color="gray5">
                  GRUPO
                </s.Text>,
                <s.Text type="headline" bold>
                  {groupCode}
                </s.Text>,
              ]}
            />
          </s.Col>
          <s.Col lg={6}>
            <s.VerticalList
              elements={[
                <s.Text type="captionUppercase" bold color="gray5">
                  COTA
                </s.Text>,
                <s.Text type="headline" bold>
                  {quota}
                </s.Text>,
              ]}
            />
          </s.Col>
        </s.Row>
        <s.Row>
          <s.Button color="secondary">CONTRATAR</s.Button>
        </s.Row>
        <s.Divider />
        <s.Row>
          <s.SummaryWrapper>
            <s.Text
              type="subheading"
              textTransform="uppercase"
              color="gray5"
              bold
            >
              RESUMO DAS TAXAS
            </s.Text>
          </s.SummaryWrapper>
        </s.Row>
        <s.Row>
          <s.HorizontalList
            startItems={[
              <s.Text type="captionUppercase" color="gray5">
                FUNDO DE RESERVA
              </s.Text>,
            ]}
            endItems={[
              <s.Text type="body" color="gray6" bold>
                {reserveFund}%
              </s.Text>,
            ]}
          />
        </s.Row>
        <s.Row>
          <s.HorizontalList
            startItems={[
              <s.Text type="captionUppercase" color="gray5">
                TAXA ADMINISTRATIVA
              </s.Text>,
            ]}
            endItems={[
              <s.Text type="body" color="gray6" bold>
                {administrativeFee}%
              </s.Text>,
            ]}
          />
        </s.Row>
        {/* <s.Row>
          <s.HorizontalList
            startItems={[
              <s.Text type="captionUppercase" color="gray5">
                TAXA ADMINISTRATIVA ANTECIPADA
              </s.Text>,
            ]}
            endItems={[
              <s.Text type="body" color="gray6" bold>
                2%
              </s.Text>,
            ]}
          />
        </s.Row> ### API AINDA NÃO RETORNA O VALOR, ENTÃO NÃO DEVE SER MOSTRADO EM TELA*/}
        <s.Row>
          <s.HorizontalList
            startItems={[
              <s.Text type="captionUppercase" color="gray5">
                SEGURO DE VIDA
              </s.Text>,
            ]}
            endItems={[
              <s.Text type="body" color="gray6" bold>
                {lifeInsurance}%
              </s.Text>,
            ]}
          />
        </s.Row>
      </s.Container>
    </s.CardComponent>
  )
}

export default PlanCard
