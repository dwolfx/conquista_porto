import React, { useContext, useEffect, useState } from 'react'
import { useHistory, Prompt } from 'react-router-dom'
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
import Modal from 'components/Modal/ModalNew'
import Text from 'components/Text'
import Notification from 'components/NotificationManager'

import { formatMoney } from 'helpers'
import { PostSaveFundsRequest } from 'store/modules/ObjectiveManagement/action'

import {
  AccordionContentWrapper,
  ButtonContainerModal,
  FullHeightCard,
  LoadingStateContainer,
} from 'pages/Objectives/Manager/styles'

import FundAccordionHeader from './AccordionHeader'
import { getColorGuide, isFundsNotTheSame } from './utils'
import {
  ObjectiveInfoBox,
  ObjectiveInfoColor,
  ObjectivesInfoContainer,
} from './styles'

export default function Wallet({ fundList, goalName, idGoal, isLoading }) {
  const theme = useContext(ThemeContext)
  const { isLoadingSave } = useSelector(state => state.objectiveManagement)

  const [fundListCopy, setFundListCopy] = useState(null)
  const [notificationOpen, setNotificationOpen] = useState(false)
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false)
  const [confirmedUnsavedChanges, setConfirmedUnsavedChanges] = useState(false)
  const [isModalUnsavedOpen, setIsModalUnsavedOpen] = useState(false)
  const [newLocation, setNewLocation] = useState('')

  const { error } = useSelector(state => state.objectiveManagement || '')

  const history = useHistory()
  const dispatch = useDispatch()

  useEffect(() => {
    setFundListCopy(fundList)
  }, [fundList])

  useEffect(() => {
    if (fundList.length && (fundListCopy || []).length) {
      setHasUnsavedChanges(isFundsNotTheSame(fundList, fundListCopy))
    }
  }, [fundListCopy, fundList])

  useEffect(() => {
    if (confirmedUnsavedChanges && newLocation) {
      history.push(newLocation)
    }
  }, [confirmedUnsavedChanges, history, newLocation])

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
        onSuccess: () => {
          setHasUnsavedChanges(false)
        },
      })
    )
    if (!isLoadingSave) setNotificationOpen(!notificationOpen)
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
                fundListCopy={fundListCopy}
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
                              fund.available +
                                fund.invested -
                                fundListCopy[index].invested
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
    <>
      <Col
        css={`
          padding: 0;
        `}
      >
        <Notification
          iconName={error ? 'closerounded' : 'check'}
          iconColor={error ? 'magenta2' : 'blue4'}
          message={
            error
              ? 'Erro ao salvar, tente novamente.'
              : 'As alterações foram salvas com sucesso.'
          }
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
            loading: isLoadingSave,
            loadingColor: 'white',
            disabled: !hasUnsavedChanges,
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
      <Modal
        isOpen={isModalUnsavedOpen}
        handleClose={() => {
          setIsModalUnsavedOpen(false)
        }}
        modalTitle="Alterações não salvas"
      >
        <Text type="headline" color="gray6">
          As alterações não salvas serão perdidas.
        </Text>
        <Text type="headline" color="gray6">
          Tem certeza que deseja continuar?
        </Text>
        <ButtonContainerModal>
          <Button
            outline
            onClick={() => {
              setIsModalUnsavedOpen(false)
            }}
          >
            Cancelar
          </Button>
          <Button
            onClick={() => {
              setConfirmedUnsavedChanges(true)
            }}
          >
            Confirmar
          </Button>
        </ButtonContainerModal>
      </Modal>
      <Prompt
        when={hasUnsavedChanges}
        message={nextLocation => {
          setNewLocation(nextLocation.pathname)
          setIsModalUnsavedOpen(true)

          if (confirmedUnsavedChanges) {
            return true
          }

          return false
        }}
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
}

Wallet.defaultProps = {
  fundList: [],
  goalName: '',
  isLoading: false,
}
