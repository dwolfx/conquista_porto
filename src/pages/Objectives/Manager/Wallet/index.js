import React, { useContext } from 'react'
import PropTypes from 'prop-types'
import { Col, Row } from 'styled-bootstrap-grid'
import { ThemeContext } from 'styled-components'
import 'styled-components/macro'

import Accordion from 'components/AccordionNew'
import Button from 'components/Button'
import ButtonLink from 'components/Button/Link'
import Divisor from 'components/Divisor'
import Icon from 'components/IconExporter'
import Popover from 'components/Popover'
import Text from 'components/Text'

import { formatMoney } from 'helpers'

import { objectivesColorGuide } from 'styles/theme'

import {
  AccordionContentWrapper,
  FullHeightCard,
} from 'pages/Objectives/Manager/styles'
import {
  Slider,
  ObjectiveInfoBox,
  ObjectiveInfoColor,
  ObjectivesInfoContainer,
  ObjectivesBar,
} from './styles'

const getColorGuide = index =>
  objectivesColorGuide[index % objectivesColorGuide.length]

const FundAccordionHeader = ({ fund }) => (
  <Row
    css={`
      padding-right: 28px;
    `}
  >
    <Col
      md="3"
      css={`
        display: flex;
        flex-direction: column;
        padding-right: 28px;
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
        {fund.recommended && (
          <Popover
            content="Fundo recomendado"
            css={`
              width: 24px;
              margin-left: 14px;
            `}
          >
            <Icon name="information" width={21} color="blue4" />
          </Popover>
        )}
      </div>
    </Col>

    <Col md="9" alignSelf="center">
      <Row>
        <Col
          md="3"
          css={`
            padding-left: 3.5rem;
          `}
        >
          <Text type="captionUppercase" color="gray4">
            Saldo do Fundo
          </Text>
          <Text type="headline" color="gray6">
            {formatMoney(fund.balance)}
          </Text>
        </Col>
        <Col
          md="9"
          css={`
            align-items: center;
            display: flex;
          `}
        >
          <ObjectivesBar>
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
              onlyObjective={!fund.goals.length}
            />
          </ObjectivesBar>
        </Col>
      </Row>
    </Col>
  </Row>
)

export default function Wallet({ fundList, goalName }) {
  const theme = useContext(ThemeContext)
  return (
    <Col
      css={`
        padding: 0;
      `}
    >
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
        <div
          css={`
            padding-top: 21px;
          `}
        >
          {fundList.map((fund, index) => (
            <React.Fragment key={fund.id}>
              <Accordion
                openByDefault={index === 0}
                titleNode={<FundAccordionHeader fund={fund} />}
                triggerCloseOnArrow
                bodyPadding="42px 42px 0 0"
              >
                <AccordionContentWrapper margin="0 0 7px 0">
                  <Row>
                    <Col
                      md="3"
                      css={`
                        display: flex;
                        flex-direction: column;
                        justify-content: space-between;
                        border-right: 1px solid ${theme.colors.gray2};
                      `}
                    >
                      <Row>
                        <Col md="6">
                          <Text type="captionUppercase" color="gray4">
                            Inv. Inicial
                          </Text>
                          <Text type="headline" color="gray6">
                            {formatMoney(fund.initial_deposit)}
                          </Text>
                        </Col>
                        <Col md="6">
                          <Text type="captionUppercase" color="gray4">
                            Inv. Mensal
                          </Text>
                          <Text type="headline" color="gray6">
                            {formatMoney(fund.monthly_deposit)}
                          </Text>
                        </Col>
                      </Row>
                      <Row>
                        <Col md="12">
                          <Button
                            data-gtm-type="click"
                            data-gtm-clicktype="button"
                            data-gtm-subname={fund.name}
                            data-gtm-name="Investir"
                            css={`
                              margin-top: 63px;
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
                      </Row>
                    </Col>
                    <Col md="9">
                      <Row>
                        <Col md="9" offset="3">
                          <ObjectivesInfoContainer>
                            <ObjectiveInfoBox>
                              <Text>
                                <ObjectiveInfoColor
                                  css={`
                                    background-color: ${theme.colors.blue4};
                                  `}
                                />
                                #{goalName}
                              </Text>
                              <Text>{formatMoney(fund.invested)}</Text>
                            </ObjectiveInfoBox>
                            <ObjectiveInfoBox>
                              <Text>
                                <ObjectiveInfoColor
                                  css={`
                                    background-color: ${theme.colors.gray3};
                                  `}
                                />
                                Sem objetivo
                              </Text>
                              <Text>{formatMoney(fund.available)}</Text>
                            </ObjectiveInfoBox>
                            {fund.goals.map((goal, key) => (
                              <ObjectiveInfoBox
                                key={`goal-${goal.id}`}
                                css={`
                                  justify-content: space-between;
                                `}
                              >
                                <div>
                                  <Text>
                                    <ObjectiveInfoColor
                                      css={`
                                        background-color: ${getColorGuide(key)};
                                      `}
                                    />
                                    #{goal.name}
                                  </Text>
                                  <Text>{formatMoney(goal.value)}</Text>
                                </div>
                                <ButtonLink
                                  css={`
                                    margin-top: 14px;
                                  `}
                                >
                                  Gerenciar
                                </ButtonLink>
                              </ObjectiveInfoBox>
                            ))}
                          </ObjectivesInfoContainer>
                        </Col>
                      </Row>
                    </Col>
                  </Row>
                </AccordionContentWrapper>
              </Accordion>
              {index !== fundList.length - 1 && <Divisor />}
            </React.Fragment>
          ))}
        </div>
      </FullHeightCard>
    </Col>
  )
}

FundAccordionHeader.propTypes = {
  fund: PropTypes.shape({
    name: PropTypes.string,
    recommended: PropTypes.bool,
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
  goalName: PropTypes.string.isRequired,
}
