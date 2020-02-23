import React from 'react'
import PropTypes from 'prop-types'
import { Col, Row } from 'styled-bootstrap-grid'
import 'styled-components/macro'

import Accordion from 'components/AccordionNew'
import Button from 'components/Button'
import Divisor from 'components/Divisor'
import Icon from 'components/IconExporter'
import Popover from 'components/Popover'
import Slider from 'components/Slider'
import Text from 'components/Text'

import { formatMoney } from 'helpers'

import {
  AccordionWrapper,
  AccordionContentWrapper,
  FullHeightCard,
} from 'pages/Objectives/Manager/styles'

const objectiveColorGuide = [
  '#E72176',
  '#FFCD00',
  '#46A166',
  '#004E70',
  '#E6F7FF',
  '#2F736B',
  '#FAD2E3',
]

const getColorGuide = index =>
  objectiveColorGuide[index % objectiveColorGuide.length]

const FundAccordionHeader = ({ fund }) => (
  <Row
    css={`
      padding-right: 30px;
    `}
  >
    <Col
      md="4"
      css={`
        display: flex;
        flex-direction: column;
      `}
    >
      <Text type="captionUppercase" color="gray4" bold>
        nome do fundo
      </Text>
      <div
        css={`
          align-items: center;
          display: flex;
        `}
      >
        <Text type="headline" color="gray6" bold>
          {fund.name}
        </Text>
        <Popover
          content="Fundo recomendado"
          css={`
            width: 24px;
            margin-left: 14px;
          `}
        >
          <Icon name="information" width={21} color="blue4" />
        </Popover>
      </div>
    </Col>

    <Col
      md="8"
      css={`
        width: 100%;
      `}
    >
      <Text>{formatMoney(fund.balance)}</Text>
      <div
        css={`
          height: 7px;
          width: 100%;
          border-radius: 7px;
          display: flex;
          background-color: #ccc;
          margin: 14px 0;
        `}
      >
        {fund.goals.map((goal, key) => {
          const percent = (goal.value / fund.balance) * 100
          return (
            <div
              css={`
                width: ${percent}%;
                height: 100%;
                background-color: ${getColorGuide(key)};
                border-top-left-radius: ${key === 0 ? '7px' : 0};
                border-bottom-left-radius: ${key === 0 ? '7px' : 0};
              `}
              key={`fund-${goal.id}`}
            />
          )
        })}
        <Slider
          max={fund.available + fund.invested}
          initialValue={fund.invested}
          onlyObjective={!!fund.goals.length}
          css={`
            border-top-right-radius: 7px;
            border-bottom-right-radius: 7px;
          `}
        />
      </div>
    </Col>
  </Row>
)

export default function Wallet({ fundList }) {
  return (
    <Col xs="12">
      <FullHeightCard
        headerIcon="dollarsign"
        headerTitle="Carteira de fundos"
        headerButtonText="Salvar alterações"
        headerButtonProps={{
          color: 'secondary',
          'data-gtm-type': 'click',
          'data-gtm-clicktype': 'button',
          'data-gtm-subname': 'carteira de fundos',
          'data-gtm-name': 'salvar alteracoes',
          onClick: () => console.log('salvou alterações'),
        }}
        footer={
          <Button
            data-gtm-type="click"
            data-gtm-clicktype="button"
            data-gtm-subname="carteira de fundos"
            data-gtm-name="adicionar fundo"
            outline
            css={`
              width: 100%;
            `}
            onClick={() => {
              window.open(
                'http://otclienthom.portoseguro.brasil/portaldecliente/conquista/investimentos/info-fundos-investimento',
                '_blank'
              )
            }}
          >
            Adicionar fundo
          </Button>
        }
      >
        {fundList.map((fund, index) => (
          <AccordionWrapper key={fund.id}>
            <Accordion
              openByDefault={index === 0}
              titleNode={<FundAccordionHeader fund={fund} />}
            >
              <AccordionContentWrapper margin="0px 0px 10px 0px">
                <Row>
                  <Col md="3" xs="12">
                    <Button
                      data-gtm-type="click"
                      data-gtm-clicktype="button"
                      data-gtm-subname={fund.name}
                      data-gtm-name="Investir"
                      css={`
                        width: 100%;
                      `}
                      onClick={() => {
                        window.open(
                          `http://otclienthom.portoseguro.brasil/portaldecliente/conquista/aplicacao?idFundo=${fund.id}`,
                          '_blank'
                        )
                      }}
                    >
                      Investir
                    </Button>
                  </Col>
                  <Col lg="9" xs="12"></Col>
                </Row>
              </AccordionContentWrapper>
            </Accordion>
            {index !== fundList.length - 1 && <Divisor />}
          </AccordionWrapper>
        ))}
      </FullHeightCard>
    </Col>
  )
}

FundAccordionHeader.propTypes = {
  fund: PropTypes.shape({
    name: PropTypes.string,
    goals: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.string,
      })
    ),
    available: PropTypes.number,
    invested: PropTypes.number,
    balance: PropTypes.number,
  }).isRequired,
}

Wallet.propTypes = {
  fundList: PropTypes.array.isRequired,
}
