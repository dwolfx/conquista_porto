import React, { useContext, useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom'
import PropTypes from 'prop-types'
import { useDispatch } from 'react-redux'
import { Col, Row } from 'styled-bootstrap-grid'
import { ThemeContext } from 'styled-components'
import 'styled-components/macro'

import Accordion from 'components/AccordionNew'
import Button from 'components/Button'
import ButtonLink from 'components/Button/Link'
import Divisor from 'components/Divisor'
import Icon from 'components/IconExporter'
import Loading from 'components/Loading'
import Popover from 'components/Popover'
import Text from 'components/Text'
import Notification from 'components/Notification'

import { formatMoney } from 'helpers'
import { PostSaveFundsRequest } from 'store/modules/ObjectiveManagement/action'

import { objectivesColorGuide } from 'styles/theme'

import {
  AccordionContentWrapper,
  FullHeightCard,
  LoadingStateContainer,
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

const FundAccordionHeader = ({
  fund,
  initialValue,
  fundList,
  setFundListCopy,
}) => {
  const handleValueFund = (id, value) => {
    if (setFundListCopy) {
      setFundListCopy(
        fundList.map(item => {
          if (item.id === id) {
            return {
              ...item,
              invested: value,
            }
          }
          return item
        })
      )
    }
  }

  return (
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
              padding-left: 7px;
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
                initialValue={initialValue}
                onlyObjective={!fund.goals.length}
                onChange={value => {
                  handleValueFund(fund.id, value)
                }}
                showTooltip={fund.available !== 0}
              />
            </ObjectivesBar>
          </Col>
        </Row>
      </Col>
    </Row>
  )
}

export default function Wallet({ fundList, goalName, idGoal, isLoading }) {
  const [fundListCopy, setFundListCopy] = useState(null)
  const [notificationOpen, setNotificationOpen] = useState(false)
  const theme = useContext(ThemeContext)

  const history = useHistory()
  const dispatch = useDispatch()

  useEffect(() => {
    setFundListCopy(fundList)
  }, [fundList])

  const saveEditionsFunds = () => {
    function formatRequestPayload() {
      return fundListCopy.map(item => {
        const { id, invested } = item
        return { value: invested, id }
      })
    }
    dispatch(
      PostSaveFundsRequest({
        idGoal,
        data: {
          fund_list: formatRequestPayload(),
        },
      })
    )
    setNotificationOpen(!notificationOpen)
  }

  const renderFundsList = () => {
    if (isLoading) {
      return (
        <LoadingStateContainer>
          <Loading
            type="bar"
            legend="Buscando suas informações..."
            placement="top"
          />
        </LoadingStateContainer>
      )
    }

    return fundList && fundListCopy ? (
      fundList.map((fund, index) => (
        <React.Fragment key={fund.id}>
          <Accordion
            openByDefault={index === 0}
            titleNode={
              <FundAccordionHeader
                fund={fund}
                initialValue={fundListCopy[index].invested}
                fundList={fundList}
                setFundListCopy={setFundListCopy}
              />
            }
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
                          <Text>
                            {formatMoney(fundListCopy[index].invested)}
                          </Text>
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
                          <Text>
                            {formatMoney(
                              fund.available - fundListCopy[index].invested
                            )}
                          </Text>
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
                              data-gtm-type="click"
                              data-gtm-clicktype="link"
                              data-gtm-subname={goal.name}
                              data-gtm-name="gerenciar"
                              onClick={() => {
                                history.push(`/objetivos/gerenciar/${goal.id}`)
                              }}
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
          {index !== fundListCopy.length - 1 && <Divisor />}
        </React.Fragment>
      ))
    ) : (
      <div>
        <Text>Nenhum fundo disponível</Text>
      </div>
    )
  }

  return (
    <Col
      css={`
        padding: 0;
      `}
    >
      <Notification
        iconName="check"
        iconColor="blue4"
        message="As alterações foram salvas com sucesso."
        isOpen={notificationOpen}
        handleClose={() => setNotificationOpen(false)}
      />
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
          onClick: () => saveEditionsFunds(),
        }}
        footer={
          !isLoading && fundList ? (
            <Button
              loading={isLoading}
              loadingColor="white"
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
          ) : null
        }
      >
        <div
          css={`
            padding-top: 21px;
          `}
        >
          {renderFundsList()}
        </div>
      </FullHeightCard>
    </Col>
  )
}

FundAccordionHeader.propTypes = {
  fund: PropTypes.shape({
    name: PropTypes.string,
    id: PropTypes.number.isRequired,
    recommended: PropTypes.bool,
    goals: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.number,
      })
    ),
    available: PropTypes.number,
    invested: PropTypes.number,
    balance: PropTypes.number,
  }).isRequired,
  fundList: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
    })
  ).isRequired,
  setFundListCopy: PropTypes.func,
  initialValue: PropTypes.number.isRequired,
}

FundAccordionHeader.defaultProps = {
  setFundListCopy: null,
}

Wallet.propTypes = {
  fundList: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string,
      recommended: PropTypes.bool,
      goals: PropTypes.arrayOf(
        PropTypes.shape({
          id: PropTypes.number,
        })
      ),
      available: PropTypes.number,
      invested: PropTypes.number,
      balance: PropTypes.number,
    })
  ),
  goalName: PropTypes.string,
  idGoal: PropTypes.node.isRequired,
  isLoading: PropTypes.bool,
}

Wallet.defaultProps = {
  fundList: [],
  goalName: '',
  isLoading: false,
}
