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
import InfoText from 'components/InfoText'
import FundAccordionHeader from './AccordionHeader'

import ObjectivesSlider from './ObjectivesSlider'
import { getColorGuide, isFundsNotTheSame } from './utils'
import {
  ObjectiveInfoBox,
  ObjectiveInfoColor,
  ObjectivesInfoContainer,
  CurrentFundBalance,
  InfoMobileRow,
  FooterContainer,
  BlockButton,
} from './styles'

export default function Wallet({
  fundList,
  goalName,
  idGoal,
  isLoading,
  isModalDeleteOpen,
}) {
  const theme = useContext(ThemeContext)
  const { isLoadingSave } = useSelector(state => state.objectiveManagement)

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
        return {
          value: formatMoneyWithoutCurrencyFlag(invested),
          id,
        }
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
      })
    )
  }

  const renderFundsList = () => {
    if (isLoading || fundList.length !== fundListCopy.length) {
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
                                  `portaldecliente/conquista/aplicacao?idFundo=${fund.id}&idObjetivo=${idGoal}&r=true`
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
                              `portaldecliente/conquista/aplicacao?idFundo=${fund.id}&r=true`
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
                          value={formatMoney(
                            fund.available +
                              fund.invested -
                              fundListCopy.filter(
                                item => item.id === fund.id
                              )[0].invested
                          )}
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
                          ${isMobile &&
                            `
                            padding-right: 21px;
                          `}
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

                        <ObjectivesSlider
                          fund={fund}
                          maxFundsDistribuition={maxFundsDistribuition}
                          fundListCopy={fundListCopy}
                          setFundListCopy={setFundListCopy}
                        />
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

  const HeaderEndItem = !isMobile ? (
    <Button
      color="secondary"
      data-gtm-type="click"
      data-gtm-clicktype="button"
      data-gtm-subname="carteira de fundos"
      data-gtm-name="salvar alteracoes"
      onClick={() => saveEditionsFunds()}
      loading={isLoadingSave}
      loadingColor="white"
      disabled={!hasUnsavedChanges || isLoadingSave}
      css={`
        padding: 0 21px;
      `}
    >
      Salvar alterações
    </Button>
  ) : null

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
          headerEndItem={HeaderEndItem}
          footer={
            !isLoading && fundList ? (
              <FooterContainer>
                <BlockButton
                  loading={Boolean(isLoading)}
                  color="primary"
                  loadingColor="white"
                  data-gtm-type="click"
                  data-gtm-clicktype="button"
                  data-gtm-subname="carteira de fundos"
                  data-gtm-name="adicionar fundo"
                  outline
                  css={`
                    margin-top: 14px;
                  `}
                  onClick={() => {
                    history.push({
                      pathname: '/investimentos/lista-fundos',
                      state: {
                        idGoal,
                      },
                    })
                  }}
                >
                  Adicionar fundo
                </BlockButton>
                {isMobile && (
                  <BlockButton
                    color="secondary"
                    data-gtm-type="click"
                    data-gtm-clicktype="button"
                    data-gtm-subname="carteira de fundos"
                    data-gtm-name="salvar alteracoes"
                    onClick={() => saveEditionsFunds()}
                    loading={isLoadingSave}
                    loadingColor="white"
                    disabled={!hasUnsavedChanges || isLoadingSave}
                  >
                    Salvar alterações
                  </BlockButton>
                )}
              </FooterContainer>
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
      id: PropTypes.number,
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
