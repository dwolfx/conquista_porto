import React, { useState } from 'react'
import { Col, Row } from 'styled-bootstrap-grid'
import { uuid } from 'uuidv4'
import 'styled-components/macro'

import Icon from 'components/IconExporter'
import Text from 'components/Text'

import useMedia from 'hooks/useMedia'

import { GridRow } from 'pages/Objectives/Recommendation/styles'
import { IFunds, ICreditProduct } from 'store/modules/Objective/types'

import CardInfosText from './CardInfosText'
import CardsView from './CardsView'
import TableView from './TableView'
import TableLabel from './TableView/Label'
import CardCreditProduct from './CardCreditProduct'
import DetailModal from 'pages/Objectives/Recommendation/WalletSection/DetailModal'
import Detail from 'pages/Objectives/Recommendation/WalletSection/Detail'

import * as s from './styles'

interface IFundCategories {
  [key: string]: number
}

interface IProps {
  creditProduct?: ICreditProduct
  funds: IFunds[]
  isUnmetGoal?: boolean
}

const WalletSection = ({
  funds,
  creditProduct,
  isUnmetGoal = false,
}: IProps) => {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [fundDetails, setFundDetails] = useState<IFunds | undefined>(undefined)
  const isVerticalTablet = useMedia('sm')
  const isMobile = useMedia('xs')

  const handleOpenDetails = (fund: IFunds) => {
    setFundDetails(fund)
    setIsModalOpen(true)
  }

  const handleCloseDetails = () => {
    setFundDetails(undefined)
    setIsModalOpen(false)
  }

  const PercentualInfos = () => {
    const fundsCategories: IFundCategories = {}

    funds.forEach((fund: IFunds) => {
      if (fund.arena_category in fundsCategories) {
        fundsCategories[fund.arena_category] +=
          fund.initial_value + fund.monthly_value
      } else {
        fundsCategories[fund.arena_category] =
          fund.initial_value + fund.monthly_value
      }
    })

    const fundsTotalValues = Object.entries(fundsCategories).reduce(
      (acc, [, value]) => acc + value,
      0
    )

    const fundsCategoriesSort = Object.entries(
      fundsCategories
    ).sort(([keyA], [keyB]) =>
      fundsCategories[keyA] < fundsCategories[keyB] ? 1 : -1
    )

    return (
      <s.PercentualInfosContainer>
        {fundsCategoriesSort.map(([key, value]) => (
          <s.PercentualText type="headline" color="gray6" bold key={uuid()}>
            {`${((value * 100) / fundsTotalValues).toFixed(1)}% em ${key}`}
          </s.PercentualText>
        ))}
      </s.PercentualInfosContainer>
    )
  }

  const cardHeader = () => (
    <s.InfoContainer>
      <Text type="headline" color="gray6" bold>
        Composição da Carteira
      </Text>
      <s.Popover
        content="Carteira é o nome que se dá ao conjunto de produtos de investimento que uma pessoa tem."
        placement="top"
      >
        <Icon name="information" color="gray4" width={21} />
      </s.Popover>
    </s.InfoContainer>
  )

  const cardInfos = () => (
    <>
      <Row>
        <Col lg={12}>
          <s.InfoRow>
            <CardInfosText
              isUnmetGoal={isUnmetGoal}
              productName={(creditProduct || {}).name}
            />
          </s.InfoRow>
        </Col>
      </Row>

      <s.LabelRow alignItems="center">
        <s.PercetualInfosWrapper>
          <PercentualInfos />
        </s.PercetualInfosWrapper>

        {!isVerticalTablet ? (
          <s.LabelInfosWrapper>
            <TableLabel />
          </s.LabelInfosWrapper>
        ) : null}
      </s.LabelRow>
    </>
  )

  const totalInitialInvestment = funds.reduce(
    (acc, cur) => acc + cur.initial_value,
    0
  )
  const totalMontlyInvestment = funds.reduce(
    (acc, cur) => acc + cur.monthly_value,
    0
  )

  return (
    <GridRow>
      {fundDetails ? (
        isMobile ? (
          <DetailModal
            fundDetails={fundDetails}
            isOpen={isModalOpen}
            handleClose={() => handleCloseDetails()}
          />
        ) : (
          <Detail
            fundDetails={fundDetails}
            isOpen={isModalOpen}
            handleClose={() => handleCloseDetails()}
          />
        )
      ) : null}

      <Col
        lg={creditProduct ? 8 : 12}
        css={`
          margin-bottom: ${isVerticalTablet ? '14px' : '0px'};
        `}
      >
        {isVerticalTablet ? (
          <CardsView
            cardHeader={cardHeader}
            cardInfos={cardInfos}
            funds={funds}
            handleOpenDetails={handleOpenDetails}
            totalInitialInvestment={totalInitialInvestment}
            totalMontlyInvestment={totalMontlyInvestment}
          />
        ) : (
          <TableView
            cardHeader={cardHeader}
            cardInfos={cardInfos}
            funds={funds}
            handleOpenDetails={handleOpenDetails}
            totalInitialInvestment={totalInitialInvestment}
            totalMontlyInvestment={totalMontlyInvestment}
          />
        )}
      </Col>

      {creditProduct && (
        <>
          <Col lg={1}>
            <Row
              alignItems="center"
              justifyContent="center"
              css={`
                height: 100%;
              `}
            >
              <s.IconContainer>
                <Icon name="add" color="gray4" width={49} />
              </s.IconContainer>
            </Row>
          </Col>
          <Col lg={3}>
            <CardCreditProduct creditProduct={creditProduct} />
          </Col>
        </>
      )}
    </GridRow>
  )
}

export default WalletSection
