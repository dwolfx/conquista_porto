import React, { useState } from 'react'
import { Col } from 'styled-bootstrap-grid'
import 'styled-components/macro'

import Icon from 'components/IconExporter'
import Modal from 'components/Modal/ModalNew'
import Text from 'components/Text'

import useMedia from 'hooks/useMedia'

import { GridRow } from 'pages/Objectives/Recommendation/styles'
import {
  IFund,
  ICombo,
  ICreditProducts,
} from 'pages/Objectives/Recommendation/types'

import ModalFundos from './ModalFundos'
import CardInfosText from './CardInfosText'
import CardsView from './CardsView'
import TableView from './TableView'
import CardCreditProduct from './CardCreditProduct'

import * as s from './styles'

interface IFundCategories {
  [key: string]: number
}

interface IProps {
  combo?: ICombo[]
  creditProduct?: ICreditProducts
  funds: IFund[]
  isUnmetGoal?: boolean
}

const WalletSection = ({
  funds,
  creditProduct,
  combo = [],
  isUnmetGoal = false,
}: IProps) => {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [initialReset, setInitialReset] = useState(true)
  const [fundDetails, setFundDetails] = useState<IFund | undefined>(undefined)
  const isMobile = useMedia('sm')

  const handleOpenDetails = (fund: IFund) => {
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

    funds.forEach((fund: IFund) => {
      if (fund.category_name in fundsCategories) {
        fundsCategories[fund.category_name] += 1
      } else {
        fundsCategories[fund.category_name] = 1
      }
    })

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
            {`${((value * 100) / funds.length).toFixed(1)}% em ${key}`}
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
      <s.InfoRow>
        <CardInfosText
          isUnmetGoal={isUnmetGoal}
          productName={(creditProduct || {}).name}
        />
      </s.InfoRow>

      <PercentualInfos />
    </>
  )

  return (
    <GridRow>
      <Modal
        modalTitle={fundDetails && fundDetails.name}
        alignItems="flex-start"
        isOpen={isModalOpen}
        handleClose={() => handleCloseDetails()}
      >
        <ModalFundos fundDetails={fundDetails} initialReset={initialReset} />
      </Modal>

      <Col
        lg={combo.length > 1 ? 9 : 12}
        md={combo.length > 1 ? 8 : 12}
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
          />
        ) : (
          <TableView
            cardHeader={cardHeader}
            cardInfos={cardInfos}
            funds={funds}
            handleOpenDetails={handleOpenDetails}
          />
        )}
      </Col>

      {creditProduct && combo.length > 1 && (
        <Col lg={3} md={4}>
          <CardCreditProduct creditProduct={creditProduct} />
        </Col>
      )}
    </GridRow>
  )
}

export default WalletSection
