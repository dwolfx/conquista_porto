import React, { useState } from 'react'
import { Col, Row } from 'styled-bootstrap-grid'
import 'styled-components/macro'

import Icon from 'components/IconExporter'
import Modal from 'components/Modal/ModalNew'
import Text from 'components/Text'

import useMedia from 'hooks/useMedia'

import { GridRow } from 'pages/Objectives/Recommendation/styles'
import { IFunds, ICreditProduct } from 'store/modules/Objective/types'

import CardInfosText from './CardInfosText'
import CardsView from './CardsView'
import TableView from './TableView'
import TableLabel from './TableView/Label'
import CardCreditProduct from './CardCreditProduct'

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
  const [initialReset, setInitialReset] = useState(true)
  const [fundDetails, setFundDetails] = useState<IFunds | undefined>(undefined)
  const isMobile = useMedia('sm')

  const handleOpenDetails = (fund: IFunds) => {
    setFundDetails(fund)
    setIsModalOpen(true)
    setInitialReset(false)
  }

  const handleCloseDetails = () => {
    setFundDetails(undefined)
    setIsModalOpen(false)
    setInitialReset(true)
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
          <s.PercentualText
            type="headline"
            color="gray6"
            bold
            key={`${key}-${value}%`}
          >
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
        <Col lg={6} md={7} sm={5} xs={12}>
          <PercentualInfos />
        </Col>

        {!isMobile ? (
          <Col lg={6} md={5} sm={7}>
            <TableLabel />
          </Col>
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
      <Modal
        modalTitle={fundDetails && fundDetails.name}
        alignItems="flex-start"
        isOpen={isModalOpen}
        handleClose={() => handleCloseDetails()}
      >
        <s.ModalFundos fundDetails={fundDetails} initialReset={initialReset} />
      </Modal>

      <Col
        lg={creditProduct ? 8 : 12}
        css={`
          margin-bottom: ${isMobile ? '14px' : '0px'};
        `}
      >
        {isMobile ? (
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
