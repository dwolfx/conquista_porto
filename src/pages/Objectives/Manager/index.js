import React from 'react'
import { useSelector } from 'react-redux'
import PropTypes from 'prop-types'
import { useHistory } from 'react-router-dom'
import 'styled-components/macro'

import targetImg from 'assets/images/pages/Objectives/Manager/target.jpg'

import ButtonLink from 'components/Button/Link'
import HorizontalList from 'components/HorizontalList'
import Text from 'components/Text'

import { formatMoney } from 'helpers'

import CardCombine from 'pages/Objectives/Manager/CardCombine'
import GoalChart from 'pages/Objectives/Manager/GoalChart'
import Wallet from 'pages/Objectives/Manager/Wallet'

import {
  GridContainer,
  Banner,
  ObjectiveDetails,
  ObjectiveHeader,
  ColumnWrapper,
  WalletContainer,
  CardContent,
} from './styles'

export default function Manager({ location }) {
  const history = useHistory()
  const { data: objectiveData } = useSelector(
    state => state.objectiveManagement
  )

  const { pageRecommendation } = location.state || false

  if (!objectiveData) {
    history.push('/objetivos')
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
      <Text color="black">{target_date}</Text>
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
      </ColumnWrapper>

      <WalletContainer>
        <Wallet fundList={objectiveData.fund_list} goalName={nickname} />
      </WalletContainer>

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
