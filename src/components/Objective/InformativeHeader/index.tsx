import React from 'react'

import { Col, Row } from 'styled-bootstrap-grid'
import AccordionNew from 'components/AccordionNew'
import VerticalList from 'components/VerticalList'
import ButtonLink from 'components/Button/Link'

import { formatMoney } from 'helpers'
import useMedia from 'hooks/useMedia'

import * as s from './styles'

interface IInformativeHeader {
  nickname: string
  targetDate: string
  targetValue: number
  initialInvestment: number
  monthlyInvestment: number
  openEdit?: () => void
}

const InformativeHeader = ({
  nickname,
  targetDate,
  targetValue,
  initialInvestment,
  monthlyInvestment,
  openEdit,
  ...rest
}: IInformativeHeader) => {
  const isVerticalTablet = useMedia('md')
  const isMobile = useMedia('sm')

  const titleAndLink = [
    <s.ObjectiveName data-testid="header-title">{nickname}</s.ObjectiveName>,
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

  const targetDateCmp = [
    <s.InfoTitle>Data Alvo</s.InfoTitle>,
    <s.InfoValueText data-testid="target-date-value">
      {targetDate}
    </s.InfoValueText>,
  ]

  const targetValueCmp = [
    <s.InfoTitle>Meta Financeira</s.InfoTitle>,
    <s.InfoValueText data-testid="financial-goal-value">
      {formatMoney(targetValue)}
    </s.InfoValueText>,
  ]

  const initialInvestmentCmp = [
    <s.InfoTitle>Investimento Inicial</s.InfoTitle>,
    <s.InfoValueText data-testid="initial-investment-value">
      {formatMoney(initialInvestment)}
    </s.InfoValueText>,
  ]

  const monthlyInvestmentCmp = [
    <s.InfoTitle>Investimento Mensal</s.InfoTitle>,
    <s.InfoValueText data-testid="monthly-investment-value">
      {formatMoney(monthlyInvestment)}
    </s.InfoValueText>,
  ]

  const informativeHeaderRender = () => (
    <>
      <VerticalList elements={titleAndLink} />
      <s.InfoContainer>
        <VerticalList elements={targetDateCmp} />
        <VerticalList elements={targetValueCmp} />
        <VerticalList elements={initialInvestmentCmp} />
        <VerticalList elements={monthlyInvestmentCmp} />
      </s.InfoContainer>
    </>
  )

  const informativeHeaderVerticalTabletRender = () => (
    <AccordionNew
      titleNode={<VerticalList elements={titleAndLink} />}
      openByDefault={false}
      triggerCloseOnArrow
      bodyPadding="0"
    >
      <s.Divisor />
      <s.InfoContainer>
        <VerticalList elements={targetDateCmp} />
        <VerticalList elements={targetValueCmp} />
        <VerticalList elements={initialInvestmentCmp} />
        <VerticalList elements={monthlyInvestmentCmp} />
      </s.InfoContainer>
    </AccordionNew>
  )

  const informativeHeaderMobileRender = () => (
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
            {targetDate}
          </s.InfoValueText>,
        ]}
      />
      <s.HorizontalList
        size="medium"
        startItems={[<s.InfoTitle>Meta Financeira</s.InfoTitle>]}
        endItems={[
          <s.InfoValueText data-testid="financial-goal-value-mobile">
            {formatMoney(targetValue)}
          </s.InfoValueText>,
        ]}
      />
      <s.HorizontalList
        size="medium"
        startItems={[<s.InfoTitle>Investimento Inicial</s.InfoTitle>]}
        endItems={[
          <s.InfoValueText data-testid="initial-investment-value-mobile">
            {formatMoney(initialInvestment)}
          </s.InfoValueText>,
        ]}
      />
      <s.HorizontalList
        size="medium"
        startItems={[<s.InfoTitle>Investimento Mensal</s.InfoTitle>]}
        endItems={[
          <s.InfoValueText data-testid="monthly-investment-value-mobile">
            {formatMoney(monthlyInvestment)}
          </s.InfoValueText>,
        ]}
      />
    </AccordionNew>
  )

  return (
    <Row {...rest}>
      <Col xl={12} lg={12} sm={12}>
        <s.Container>
          {(isMobile && informativeHeaderMobileRender()) ||
            (isVerticalTablet && informativeHeaderVerticalTabletRender()) ||
            informativeHeaderRender()}
        </s.Container>
      </Col>
    </Row>
  )
}

export default InformativeHeader
