import React from 'react'
import { Col } from 'styled-bootstrap-grid'
import 'styled-components/macro'

import Text from 'components/Text'
import HorizontalList from 'components/HorizontalList'
import Button from 'components/Button'
import ButtonLink from 'components/Button/Link'
import { formatMoney } from 'helpers'

import creditImg from 'assets/images/pages/Objectives/creditCard.png'
import planeImg from 'assets/images/pages/Objectives/travelSecurity.png'
import targetImg from 'assets/images/pages/Objectives/Manager/target.jpg'

import { useSelector } from 'react-redux'
import moment from 'moment'

import {
  GridContainer,
  Banner,
  ObjectiveDetails,
  ObjectiveHeader,
  Recommendations,
  ColumnWrapper,
  FullHeightCard,
  Wallet,
} from './styles'

export default function Manager(location) {
  const { data: objectiveData } = useSelector(state => state.objective)
  const { pageRecommendation } = location.store || false

  if (!objectiveData) {
    return null
  }

  const { nickname, target_value, target_date } = objectiveData.answer

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
  const horizontalListBtnEdit = <ButtonLink noIcon>EDITAR OBJETIVO</ButtonLink>
  const horizontalListBtnChangeObjective = (
    <ButtonLink noIcon>OUTROS OBJETIVOS</ButtonLink>
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
          ></FullHeightCard>
        </Col>
      </Wallet>

      <ColumnWrapper>
        <Text type="heading3" color="gray6">
          Combine com o seu objetivo
        </Text>
        <Recommendations>
          <Banner bgImage={creditImg}>
            <Text type="heading4" color="white">
              Cartão de Crédito
            </Text>
            <Text type="body" color="white">
              O Cartão de Crédito que resolve e ainda dá vantagens e benefícios
              da Porto Seguro para você, sua casa e seu carro.
            </Text>
            <Button color="secondary">CONHECER</Button>
          </Banner>
          <Banner bgImage={planeImg}>
            <Text type="headline" color="white">
              Seguro Viagem
            </Text>
            <Text type="captionUppercase" color="white">
              COBERTURA PRINCIPAL
            </Text>
            {/* <Button color="secondary">CONHECER</Button> */}
          </Banner>
        </Recommendations>
      </ColumnWrapper>
    </GridContainer>
  )
}
