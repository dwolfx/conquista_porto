import React, { useContext, useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom'
import PropTypes from 'prop-types'
import { useDispatch, useSelector } from 'react-redux'
import { Col, Row } from 'styled-bootstrap-grid'
import { ThemeContext } from 'styled-components'
import 'styled-components/macro'

import Accordion from 'components/AccordionNew'
import Button from 'components/Button'
import ButtonLink from 'components/Button/Link'
import Divisor from 'components/Divisor'
import Loading from 'components/Loading'
import Text from 'components/Text'
import UnsavedChangesPrompt from 'components/Modal/Prompt'

import {
  formatMoney,
  handleGiwRedirect,
  formatMoneyWithoutCurrencyFlag,
} from 'helpers'
import { PostSaveFundsRequest } from 'store/modules/ObjectiveManagement/action'

import {
  AccordionContentWrapper,
  FullHeightCard,
  LoadingStateContainer,
} from 'pages/Objectives/Manager/styles'

import useMedia from 'hooks/useMedia'
import Slider from 'components/Slider'
import InfoText from 'components/InfoText'
import FundAccordionHeader from './AccordionHeader'
import { getColorGuide, isFundsNotTheSame } from './utils'
import {
  ObjectiveInfoBox,
  ObjectiveInfoColor,
  ObjectivesInfoContainer,
  ObjectivesBar,
  OtherObjectivesBar,
  CurrentFundBalance,
  InfoMobileRow,
} from './styles'

export default function Wallet({
  fundList,
  goalName,
  idGoal,
  isLoading,
  isModalDeleteOpen,
}) {
  const theme = useContext(ThemeContext)
  const { isLoadingSave, data: objectiveData } = useSelector(
    state => state.objectiveManagement
  )

  const [fundListCopy, setFundListCopy] = useState([])
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false)

  const history = useHistory()
  const dispatch = useDispatch()

  const isMobile = useMedia('sm')

  useEffect(() => {
    setFundListCopy(fundList)
  }, [fundList])

  useEffect(() => {
    if (fundList.length && fundListCopy.length) {
      setHasUnsavedChanges(isFundsNotTheSame(fundList, fundListCopy))
    }
  }, [fundListCopy, fundList])

  const saveEditionsFunds = () => {
    function formatRequestPayload() {
      return fundListCopy.map(item => {
        const { id, invested } = item
        return { value: formatMoneyWithoutCurrencyFlag(invested * 100), id }
      })
    }

    dispatch(
      PostSaveFundsRequest({
        idGoal,
        data: {
          fund_list: formatRequestPayload(),
        },
        onSuccess: () => {
          setHasUnsavedChanges(false)
        },
        newObjectiveValues: {
          ...objectiveData,
          fund_list: fundListCopy,
        },
      })
    )
  }

  const handleValueFund = (id, value) => {
    if (setFundListCopy) {
      setFundListCopy(
        fundListCopy.map(item => {
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

    return fundList.length && fundListCopy.length ? (
      fundList.map((fund, index) => {
        const sumGoalsValue = fund.goals.reduce(
          (acc, cur) => acc + cur.value,
          fund.invested
        )
        const maxFundsDistribuition = Math.max(fund.balance, sumGoalsValue)

        return (
          <React.Fragment key={fund.id}>
            <Accordion
              openByDefault={index === 0}
              titleNode={
                <FundAccordionHeader
                  fund={fund}
                  fundListCopy={fundListCopy}
                  setFundListCopy={setFundListCopy}
                />
              }
              triggerCloseOnArrow
              bodyPadding={isMobile ? '0' : '42px 42px 0 0'}
            >
              <AccordionContentWrapper margin="0 0 7px 0">
                {!isMobile ? (
                  <>
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
                            <InfoText
                              label="Inv. Inicial"
                              value={formatMoney(fund.initial_deposit)}
                            />
                          </Col>
                          <Col md="6">
                            <InfoText
                              label="Inv. Mensal"
                              value={formatMoney(fund.monthly_deposit)}
                            />
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
                                handleGiwRedirect(
                                  `portaldecliente/conquista/aplicacao?idFundo=${fund.id}`
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
                          <Col md="8" offset="4">
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
                              {fund.goals.map((goal, key) =>
                                goal.value !== 0 ? (
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
                                            background-color: ${getColorGuide(
                                              key
                                            )};
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
                                        history.push(
                                          `/objetivos/gerenciar/${goal.id}`
                                        )
                                      }}
                                    >
                                      Gerenciar
                                    </ButtonLink>
                                  </ObjectiveInfoBox>
                                ) : null
                              )}
                            </ObjectivesInfoContainer>
                          </Col>
                        </Row>
                      </Col>
                    </Row>
                  </>
                ) : (
                  <>
                    <InfoMobileRow>
                      <Col md="6" xs="5">
                        <InfoText
                          label="Inv. Inicial"
                          value={formatMoney(fund.initial_deposit)}
                        />
                      </Col>
                      <Col md="6" xs="5">
                        <InfoText
                          label="Inv. Mensal"
                          value={formatMoney(fund.monthly_deposit)}
                        />
                      </Col>
                    </InfoMobileRow>

                    <Row>
                      <Col md="12" xs="12">
                        <Button
                          data-gtm-type="click"
                          data-gtm-clicktype="button"
                          data-gtm-subname={fund.name}
                          data-gtm-name="Investir"
                          css={`
                            width: 100%;
                          `}
                          onClick={() => {
                            handleGiwRedirect(
                              `portaldecliente/conquista/aplicacao?idFundo=${fund.id}`
                            )
                          }}
                        >
                          Investir
                        </Button>
                      </Col>
                    </Row>

                    <InfoMobileRow>
                      <Col md="2" xs="6">
                        <InfoText
                          label="Saldo do Fundo"
                          value={formatMoney(fund.balance)}
                        />
                      </Col>
                      <Col md="2" xs="5">
                        <InfoText
                          label="Não distribuído"
                          value={formatMoney(fund.available)}
                        />
                      </Col>
                    </InfoMobileRow>

                    <Row>
                      <Col
                        md="8"
                        css={`
                          align-items: center;
                          display: flex;
                          flex-direction: column;
                          padding-left: 21px;
                        `}
                      >
                        <Text
                          type="captionUppercase"
                          color="gray4"
                          css={`
                            align-self: flex-start;
                          `}
                        >
                          Distribuição nos seus objetivos
                        </Text>
                        <ObjectivesBar>
                          {fund.goals.map((goal, key) => {
                            const percent =
                              (goal.value / maxFundsDistribuition) * 100

                            return (
                              <OtherObjectivesBar
                                hasLeftRadius={key === 0}
                                hasRightRadius={
                                  (key === fund.goals.length - 1 ||
                                    percent === 100) &&
                                  fund.available === 0
                                }
                                percent={percent}
                                backgroundColor={getColorGuide(key)}
                                key={`fund-${goal.id}`}
                              />
                            )
                          })}
                          <Slider
                            max={Math.max(
                              fund.available + fund.invested,
                              fund.invested
                            )}
                            initialValue={fund.invested}
                            onlyObjective={
                              fund.goals.length === 0 ||
                              fund.balance === fund.invested
                            }
                            onChange={value => {
                              handleValueFund(
                                fund.id,
                                Math.min(
                                  value,
                                  Math.abs(fund.available) + fund.invested
                                )
                              )
                            }}
                            showTooltip={false}
                            showThumb={
                              fund.available !== 0 || fund.invested !== 0
                            }
                          />
                        </ObjectivesBar>
                      </Col>
                      <CurrentFundBalance md="2" xs="12">
                        <Text type="captionUppercase" color="gray5">
                          Saldo neste fundo
                        </Text>
                        <Text type="headline" color="gray6">
                          {formatMoney(fundListCopy[index].invested)}
                        </Text>
                      </CurrentFundBalance>
                    </Row>

                    <Row>
                      <Col md="9" xs="12">
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
                                  history.push(
                                    `/objetivos/gerenciar/${goal.id}`
                                  )
                                }}
                              >
                                Gerenciar
                              </ButtonLink>
                            </ObjectiveInfoBox>
                          ))}
                        </ObjectivesInfoContainer>
                      </Col>
                    </Row>
                  </>
                )}
              </AccordionContentWrapper>
            </Accordion>
            {index !== fundListCopy.length - 1 && <Divisor />}
          </React.Fragment>
        )
      })
    ) : (
      <div>
        <Text>Nenhum fundo disponível</Text>
      </div>
    )
  }

  return (
    <>
      <Col
        css={`
          padding: 0;
        `}
      >
        <FullHeightCard
          headerIcon="dollarsign"
          headerTitle="Carteira de fundos"
          headerButtonText="Salvar alterações"
          showHeaderButton={!isMobile}
          headerButtonProps={{
            color: 'secondary',
            'data-gtm-type': 'click',
            'data-gtm-clicktype': 'button',
            'data-gtm-subname': 'carteira de fundos',
            'data-gtm-name': 'salvar alteracoes',
            onClick: () => saveEditionsFunds(),
            loading: isLoadingSave,
            loadingColor: 'white',
            disabled: !hasUnsavedChanges || isLoadingSave,
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
                  handleGiwRedirect(
                    'portaldecliente/conquista/investimentos/info-fundos-investimento'
                  )
                }}
              >
                Adicionar fundo
              </Button>
            ) : null
          }
        >
          <div css={!isMobile ? 'padding-top: 21px;' : 'padding-top: 0;'}>
            {renderFundsList()}
          </div>
        </FullHeightCard>
      </Col>

      <UnsavedChangesPrompt
        hasUnsavedChanges={hasUnsavedChanges && !isModalDeleteOpen}
      />
    </>
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
  ),
  setFundListCopy: PropTypes.func,
}

FundAccordionHeader.defaultProps = {
  fundListCopy: [],
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
  isModalDeleteOpen: PropTypes.bool,
}

Wallet.defaultProps = {
  fundList: [],
  goalName: '',
  isLoading: false,
  isModalDeleteOpen: false,
}
