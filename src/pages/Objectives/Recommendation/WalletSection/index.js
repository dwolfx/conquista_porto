/* eslint-disable react/no-array-index-key */
import PropTypes from 'prop-types'
import React, { useState } from 'react'
import { Col } from 'styled-bootstrap-grid'
import 'styled-components/macro'

import Icon from 'components/IconExporter'
import Modal from 'components/Modal/ModalNew'
import Text from 'components/Text'

import useMedia from 'hooks/useMedia'

import ModalFundos from './ModalFundos'
import { GridRow } from '../styles'
import * as s from './styles'

import CardInfosText from './CardInfosText'
import CardsView from './CardsView'
import TableView from './TableView'
import CardCreditProduct from './CardCreditProduct'

const WalletSection = ({ creditProduct, combo, funds, isUnmetGoal }) => {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [initialReset, setInitialReset] = useState(true)
  const [fundDetails, setFundDetails] = useState({})
  const isMobile = useMedia('sm')

  const handleOpenDetails = fund => {
    setFundDetails(fund)
    setIsModalOpen(true)
    setInitialReset(false)
  }

  const handleCloseDetails = () => {
    setFundDetails({})
    setIsModalOpen(false)
    setInitialReset(true)
  }

  const PercentualInfos = () => {
    let fundsCategories = {}

    funds.forEach(fund => {
      if (fund.category_name in fundsCategories) {
        fundsCategories[fund.category_name] += 1
      } else {
        fundsCategories[fund.category_name] = 1
      }
    })

    fundsCategories = Object.entries(fundsCategories).sort(([keyA], [keyB]) =>
      fundsCategories[keyA] < fundsCategories[keyB] ? 1 : -1
    )

    return (
      <s.PercentualInfosContainer>
        {fundsCategories.map(([key, value]) => (
          <s.PercentualText type="headline" color="gray6" bold>
            {`${((value * 100) / funds.length).toFixed(1)}% em ${key}`}
          </s.PercentualText>
        ))}
      </s.PercentualInfosContainer>
    )
  }

  const cardHeader = () => (
    <s.InfoContainer>
      <Text type="heading4" color="gray6" bold>
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
          productName={creditProduct.name}
        />
      </s.InfoRow>

      <PercentualInfos />
    </>
  )

  return (
    <GridRow>
      <Modal
        modalTitle={fundDetails.name}
        alignItems="flex-start"
        isOpen={isModalOpen}
        handleClose={() => handleCloseDetails()}
        maxWidth="700px"
      >
        <ModalFundos fundDetails={fundDetails} initialReset={initialReset} />
      </Modal>

      <Col
        lg={combo.length > 1 ? '9' : '12'}
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
        <CardCreditProduct creditProduct={creditProduct} />
      )}
    </GridRow>
  )
}

WalletSection.propTypes = {
  combo: PropTypes.array,
  creditProduct: PropTypes.object,
  funds: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string,
      profitability: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
      quotation_apply_days: PropTypes.string,
      financial_apply_days: PropTypes.string,
      quotation_rescue_days: PropTypes.string,
      financial_rescue_days: PropTypes.string,
      initial_value: PropTypes.number,
      monthly_value: PropTypes.number,
      category_name: PropTypes.string,
    })
  ).isRequired,
  isUnmetGoal: PropTypes.bool,
}

WalletSection.defaultProps = {
  combo: [],
  creditProduct: {},
  isUnmetGoal: false,
}

export default WalletSection
