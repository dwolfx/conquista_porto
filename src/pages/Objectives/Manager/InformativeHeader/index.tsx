import React from 'react'

import { Col, Row } from 'styled-bootstrap-grid'
import AccordionNew from 'components/AccordionNew'
import VerticalList from 'components/VerticalList'
import ButtonLink from 'components/Button/Link'

import { formatMoney } from 'helpers'
import useMedia from 'hooks/useMedia'
import { IObjectManagement } from 'store/modules/ObjectiveManagement/types'

import * as s from './styles'

interface IInformativeHeader {
  objective: IObjectManagement
  openEdit?: () => void
}

const InformativeHeader = ({
  objective,
  openEdit,
  ...rest
}: IInformativeHeader) => {
  const isVerticalTablet = useMedia('md')
  const isMobile = useMedia('sm')

  const titleAndLink = [
    <s.ObjectiveName data-testid="header-title">
      {objective.nickname}
    </s.ObjectiveName>,
    openEdit && (
      <ButtonLink
        data-gtm-type="click"
        data-gtm-clicktype="link"
        data-gtm-name="Editar objetivo"
        noIcon={false}
        noIconPadding
        onClick={openEdit}
      >
        Editar objetivo
      </ButtonLink>
    ),
  ]

  const targetDate = [
    <s.InfoTitle>Data Alvo</s.InfoTitle>,
    <s.InfoValueText data-testid="target-date-value">
      {objective.target_date}
    </s.InfoValueText>,
  ]

  const financialGoal = [
    <s.InfoTitle>Meta Financeira</s.InfoTitle>,
    <s.InfoValueText data-testid="financial-goal-value">
      {formatMoney(objective.target_value)}
    </s.InfoValueText>,
  ]

  const initialInvestment = [
    <s.InfoTitle>Investimento Inicial</s.InfoTitle>,
    <s.InfoValueText data-testid="initial-investment-value">
      {formatMoney(objective.target_value)}
    </s.InfoValueText>,
  ]

  const monthlyInvestment = [
    <s.InfoTitle>Investimento Mensal</s.InfoTitle>,
    <s.InfoValueText data-testid="monthly-investment-value">
      {formatMoney(objective.target_value)}
    </s.InfoValueText>,
  ]

  const informativeHeaderRender = () => (
    <Row {...rest}>
      <Col xl={12} lg={12}>
        <s.Container>
          <VerticalList elements={titleAndLink} />
          <s.InfoContainer>
            <VerticalList elements={targetDate} />
            <VerticalList elements={financialGoal} />
            <VerticalList elements={initialInvestment} />
            <VerticalList elements={monthlyInvestment} />
          </s.InfoContainer>
        </s.Container>
      </Col>
    </Row>
  )

  const informativeHeaderVerticalTabletRender = () => (
    <Row {...rest}>
      <Col sm={12}>
        <s.Container>
          <AccordionNew
            titleNode={<VerticalList elements={titleAndLink} />}
            openByDefault={false}
            triggerCloseOnArrow
            bodyPadding="0"
          >
            <s.Divisor />
            <s.InfoContainer>
              <VerticalList elements={targetDate} />
              <VerticalList elements={financialGoal} />
              <VerticalList elements={initialInvestment} />
              <VerticalList elements={monthlyInvestment} />
            </s.InfoContainer>
          </AccordionNew>
        </s.Container>
      </Col>
    </Row>
  )

  const informativeHeaderMobileRender = () => (
    <Row {...rest}>
      <Col sm={12}>
        <s.Container>
          <AccordionNew
            titleNode={<VerticalList elements={titleAndLink} />}
            openByDefault={false}
            triggerCloseOnArrow
            bodyPadding="0"
          >
            <s.Divisor />
            <s.HorizontalList
              size="medium"
              startItems={[<s.InfoTitle>Data Alvo</s.InfoTitle>]}
              endItems={[
                <s.InfoValueText data-testid="target-date-value-mobile">
                  {objective.target_date}
                </s.InfoValueText>,
              ]}
            />
            <s.HorizontalList
              size="medium"
              startItems={[<s.InfoTitle>Meta Financeira</s.InfoTitle>]}
              endItems={[
                <s.InfoValueText data-testid="financial-goal-value-mobile">
                  {formatMoney(objective.target_value)}
                </s.InfoValueText>,
              ]}
            />
            <s.HorizontalList
              size="medium"
              startItems={[<s.InfoTitle>Investimento Inicial</s.InfoTitle>]}
              endItems={[
                <s.InfoValueText data-testid="initial-investment-value-mobile">
                  {formatMoney(objective.target_value)}
                </s.InfoValueText>,
              ]}
            />
            <s.HorizontalList
              size="medium"
              startItems={[<s.InfoTitle>Investimento Mensal</s.InfoTitle>]}
              endItems={[
                <s.InfoValueText data-testid="monthly-investment-value-mobile">
                  {formatMoney(objective.target_value)}
                </s.InfoValueText>,
              ]}
            />
          </AccordionNew>
        </s.Container>
      </Col>
    </Row>
  )

  return (
    (isMobile && informativeHeaderMobileRender()) ||
    (isVerticalTablet && informativeHeaderVerticalTabletRender()) ||
    informativeHeaderRender()
  )
}

export default InformativeHeader
