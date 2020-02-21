import React from 'react'
import { useSelector } from 'react-redux'
import PropTypes from 'prop-types'
import { useHistory } from 'react-router-dom'
import { Col, Row } from 'styled-bootstrap-grid'
import moment from 'moment'
import 'styled-components/macro'

import targetImg from 'assets/images/pages/Objectives/Manager/target.jpg'

import Accordion from 'components/AccordionNew'
import Button from 'components/Button'
import ButtonLink from 'components/Button/Link'
import Divisor from 'components/Divisor'
import HorizontalList from 'components/HorizontalList'
import Slider from 'components/Slider'
import Text from 'components/Text'

import { formatMoney } from 'helpers'

import GoalChart from 'pages/Objectives/Manager/GoalChart'

import managerData from 'mocks/objective.json'

import CardCombine from 'pages/Objectives/Manager/CardCombine'

import {
  GridContainer,
  Banner,
  ObjectiveDetails,
  ObjectiveHeader,
  ColumnWrapper,
  FullHeightCard,
  Wallet,
  AccordionWrapper,
  AccordionContentWrapper,
  CardContent,
} from './styles'

const objectiveColorGuide = [
  '#E72176',
  '#FFCD00',
  '#46A166',
  '#004E70',
  '#E6F7FF',
  '#2F736B',
  '#FAD2E3',
]

export default function Manager({ location }) {
  const history = useHistory()
  let { data: objectiveData } = useSelector(state => state.objectiveManagement)

  const { pageRecommendation } = location.state || false

  if (!objectiveData) {
    objectiveData = { ...managerData }
    // history.push('/objetivos')
  }

  const { nickname, target_value, target_date } = objectiveData

  function handleRedirectToProduct(product) {
    history.push(product.productPath)
  }

  const getColorGuide = index =>
    objectiveColorGuide[index % objectiveColorGuide.length]

  const horizontalListTitle = (
    <Text type="heading3" color="gray6">
      #{nickname}
    </Text>
  )
  const horizontalListGoalMoney = (
    <ColumnWrapper>
      <Text color="gray5">META (R$)</Text>
      <Text color="black">{formatMoney(target_value)}</Text>
    </ColumnWrapper>
  )
  const horizontalListGoalDate = (
    <ColumnWrapper>
      <Text color="gray5">META (DATA)</Text>
      <Text color="black">{moment(target_date).format('MMM YYYY')}</Text>
    </ColumnWrapper>
  )
  const horizontalListBtnEdit = (
    <ButtonLink
      data-gtm-type="click"
      data-gtm-clicktype="link"
      data-gtm-name="editar objetivo"
      noIcon
    >
      EDITAR OBJETIVO
    </ButtonLink>
  )
  const horizontalListBtnChangeObjective = (
    <ButtonLink
      data-gtm-type="click"
      data-gtm-clicktype="link"
      data-gtm-name="outros objetivos"
      noIcon
    >
      OUTROS OBJETIVOS
    </ButtonLink>
  )

  return (
    <GridContainer>
      {pageRecommendation && (
        <Banner bgImage={targetImg} hasCloseButton size="lg">
          <Text type="heading3" color="white">
            Objetivo criado com sucesso!
          </Text>
          <Text color="white">
            Aqui, você acompanha o progresso e contrata produtos que ajudam no
            seu objetivo.
          </Text>
        </Banner>
      )}
      <ColumnWrapper>
        <ObjectiveHeader>
          <HorizontalList
            startItems={[
              horizontalListTitle,
              horizontalListGoalMoney,
              horizontalListGoalDate,
              horizontalListBtnEdit,
            ]}
            endItems={[horizontalListBtnChangeObjective]}
            noPadding
            marginBetweenElements="28px"
          />
        </ObjectiveHeader>
        <ObjectiveDetails>
          <CardContent>
            <GoalChart data={objectiveData} />
          </CardContent>
        </ObjectiveDetails>
        {/* <ObjectiveCard></ObjectiveCard> */}
      </ColumnWrapper>

      <Wallet>
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
            {objectiveData.fund_list.map((fund, index) => (
              <AccordionWrapper key={fund.id}>
                <Accordion
                  openByDefault={index === 0}
                  labelNode="nome do fundo"
                  titleNode={fund.name}
                >
                  <AccordionContentWrapper margin="0px 0px 10px 0px">
                    <Row>
                      <Col lg="3" xs="12">
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
                      <Col lg="9" xs="12">
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
                                  border-top-left-radius: ${key === 0
                                    ? '7px'
                                    : 0};
                                  border-bottom-left-radius: ${key === 0
                                    ? '7px'
                                    : 0};
                                `}
                              ></div>
                            )
                          })}
                          <Slider
                            max={fund.available + fund.invested}
                            initialValue={fund.invested}
                            css={`
                              border-top-right-radius: 7px;
                              border-bottom-right-radius: 7px;
                            `}
                          />
                        </div>
                      </Col>
                    </Row>
                  </AccordionContentWrapper>
                </Accordion>
                {index !== objectiveData.fund_list.length - 1 && <Divisor />}
              </AccordionWrapper>
            ))}
          </FullHeightCard>
        </Col>
      </Wallet>

      {Object.entries(objectiveData.additional).find(
        ([, value]) => value === true
      ) && (
        <ColumnWrapper>
          <Text type="heading3" color="gray6">
            Combine com o seu objetivo
          </Text>
          <CardCombine
            css={`
              padding-top: 21px;
            `}
            additional={objectiveData.additional}
            onClick={handleRedirectToProduct}
          />
        </ColumnWrapper>
      )}
    </GridContainer>
  )
}

Manager.propTypes = {
  location: PropTypes.shape({
    state: PropTypes.shape({
      pageRecommendation: PropTypes.bool,
    }),
  }).isRequired,
}
