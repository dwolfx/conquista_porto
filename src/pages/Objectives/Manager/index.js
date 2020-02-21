import React from 'react'
import PropTypes from 'prop-types'
import { useHistory } from 'react-router-dom'
import { Col } from 'styled-bootstrap-grid'
import 'styled-components/macro'

import CardCombine from 'pages/Objectives/Manager/CardCombine'
import Text from 'components/Text'
import HorizontalList from 'components/HorizontalList'
import Button from 'components/Button'
import ButtonLink from 'components/Button/Link'
import { formatMoney } from 'helpers'

import targetImg from 'assets/images/pages/Objectives/Manager/target.jpg'

import { useSelector } from 'react-redux'
import moment from 'moment'

import Accordion from 'components/NewAccordion'
import Divisor from 'components/Divisor'

import managerData from 'mocks/objective.json'
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
} from './styles'

export default function Manager({ location }) {
  const history = useHistory()
  const { data: objectiveData } = useSelector(
    state => state.objectiveManagement
  )

  const { pageRecommendation } = location.state || false

  if (!objectiveData) {
    return null
  }

  const { nickname, target_value, target_date } = objectiveData

  function handleRedirectToProduct(product) {
    history.push(product.productPath)
  }

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
        <ObjectiveDetails></ObjectiveDetails>
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
                outline
                css={`
                  width: 100%;
                `}
              >
                Adicionar fundo
              </Button>
            }
          >
            {managerData.fund_list.map((fund, index) => (
              <AccordionWrapper key={fund.id}>
                <Accordion
                  openByDefault={index === 0}
                  labelNode="nome do fundo"
                  titleNode={fund.name}
                >
                  <AccordionContentWrapper margin="0px 0px 10px 0px">
                    <Text>CONTENT CONTENT CONTENT CONTENT CONTENT CONTENT</Text>
                  </AccordionContentWrapper>
                </Accordion>
                {index !== managerData.fund_list.length - 1 && <Divisor />}
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
