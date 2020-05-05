/* eslint-disable react/no-array-index-key */
import PropTypes from 'prop-types'
import React, { useContext, useState } from 'react'
import { Col } from 'styled-bootstrap-grid'
import { ThemeContext } from 'styled-components'
import 'styled-components/macro'

import Icon from 'components/IconExporter'
import Modal from 'components/Modal/ModalNew'
import Text from 'components/Text'

import useMedia from 'hooks/useMedia'

import ModalFundos from './ModalFundos'
import {
  GridRow,
  FullHeightCard,
  CardContainer,
  SpacedText,
  SpacedValue,
} from '../styles'
import * as s from './styles'

import CardsView from './CardsView'
import TableView from './TableView'

const WalletSection = ({ creditProduct, combo, funds }) => {
  const theme = useContext(ThemeContext)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [initialReset, setInitialReset] = useState(true)
  const [fundDetails, setFundDetails] = useState({})
  const isMobile = useMedia('sm')

  let { name: productName } = creditProduct || ''
  productName = (productName || '').toLowerCase()

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
    console.log(fundsCategories)

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

  const sectionInfos = () => (
    <>
      <s.InfoRow>
        <Text
          type="headline"
          color="gray6"
          css={`
            margin-right: 7px;
          `}
        >
          Os investimentos inicial e mensal serão distribuídos nestes fundos.
        </Text>
        <Icon name="information" color="gray4" width={20} />
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
            sectionInfos={sectionInfos}
            funds={funds}
            handleOpenDetails={handleOpenDetails}
          />
        ) : (
          <TableView
            funds={funds}
            handleOpenDetails={handleOpenDetails}
            sectionInfos={sectionInfos}
          />
        )}
      </Col>

      {creditProduct && combo.length > 1 && (
        <Col
          lg="3"
          css={`
            margin-bottom: ${isMobile ? '14px' : '0px'};
          `}
        >
          <FullHeightCard
            headerIcon={
              (productName.includes('financiamento de veículo') && 'car2') ||
              (productName.includes('financiamento') && 'money') ||
              (productName.includes('consórcio de imóvel') && 'homewithwindow')
            }
            headerTitle={creditProduct.name.split(' ')[0]}
          >
            <CardContainer>
              {creditProduct.values.map((item, index) => (
                <s.InfoContent key={index}>
                  <SpacedText type="captionUppercase" color="gray5">
                    {item.name}
                  </SpacedText>
                  <SpacedValue>
                    <SpacedText
                      truncate
                      type="headline"
                      color={item.checked ? 'green3' : 'gray6'}
                    >
                      {item.value}
                    </SpacedText>
                    {item.checked && (
                      <Icon
                        name="check"
                        width="21px"
                        fill={theme.colors.green3}
                      />
                    )}
                    {item.info && (
                      <Icon
                        name="information"
                        width="21px"
                        fill={theme.colors.gray5}
                      />
                    )}
                  </SpacedValue>
                </s.InfoContent>
              ))}
            </CardContainer>
          </FullHeightCard>
        </Col>
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
}

WalletSection.defaultProps = {
  combo: [],
  creditProduct: {},
}

export default WalletSection
