/* eslint-disable react/no-array-index-key */
import PropTypes from 'prop-types'
import React, { useContext, useState } from 'react'
import { Col } from 'styled-bootstrap-grid'
import 'styled-components/macro'
import { ThemeContext } from 'styled-components'
import Text from 'components/Text'
import IconButton from 'components/Button/Icon'
import Icon from 'components/IconExporter'
import PieChart from 'components/PieChart'
import Divisor from 'components/Divisor'
import Modal from 'components/Modal/ModalNew'
import { formatMoney } from 'helpers'
import useMedia from 'hooks/useMedia'
import ModalFundos from './ModalFundos'

import {
  GridRow,
  FullHeightCard,
  InfoContent,
  CardContainer,
  SpacedText,
  SpacedValue,
  PieChartChildrenContainer,
  FundsTable,
  TableHeader,
  ContainerFunds,
  TableRow,
  TableData,
  ResponsiveTableContainer,
  TableCard,
  TableDivisor,
  Square,
  PieChartChildrenContent,
  Wrapper,
  ResponsiveTableButton,
  SectionTwoGraphContainer,
} from './styles'

const SectionTwo = ({ creditProduct, combo, funds }) => {
  const theme = useContext(ThemeContext)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [initialReset, setInitialReset] = useState(true)
  const [fundDetails, setFundDetails] = useState({})
  const [pieChartInfoChildren, setPieChartInfoChildren] = useState(null)
  const isMobile = useMedia('sm')

  function settingPieChartInfoChildren(payload) {
    setPieChartInfoChildren(payload)
  }

  const renderPieChartChildrenNode = () => {
    if (pieChartInfoChildren) {
      return (
        <PieChartChildrenContainer>
          <Text type="headline">
            {pieChartInfoChildren.percent.toFixed(2)}%
          </Text>
          <Text color="gray4" type="captionUppercase">
            {pieChartInfoChildren.name}
          </Text>
        </PieChartChildrenContainer>
      )
    }
    return (
      <PieChartChildrenContent>
        <Text color="gray4" type="captionUppercase">
          total inicial
        </Text>
        <Text truncate color="gray6" type="headline">
          {formatMoney(
            funds.reduce((acc, curr) => acc + +curr.initial_value, 0)
          )}
        </Text>
        <Divisor />
        <Text color="gray4" type="captionUppercase">
          total mensal
        </Text>
        <Text truncate type="headline">
          {formatMoney(
            funds.reduce((acc, curr) => acc + +curr.monthly_value, 0)
          )}
        </Text>
      </PieChartChildrenContent>
    )
  }

  const graphValuesGenerator = () => {
    const colorsPriority = [
      theme.colors.magenta2,
      theme.colors.blue4,
      theme.colors.yellow2,
      theme.colors.green3,
      theme.colors.darkBlue2,
      theme.colors.gray6,
    ]

    const sortedFundByInitialValue = funds
      .map(fund => fund)
      .sort((a, b) => b.initial_value - a.initial_value)

    const totalFundsAmount = sortedFundByInitialValue
      .map(fund => fund.initial_value)
      .reduce((accumulator, currentValue) => accumulator + currentValue, 0)

    const colorsAccordingToTheQuantityOfFunds = [
      ...colorsPriority.slice(0, sortedFundByInitialValue.length),
    ]

    const generatedData = Object.entries(sortedFundByInitialValue)
      .map((fund, index) => ({
        id: fund[1].name,
        name: fund[1].name,
        value: fund[1].initial_value,
        percent: (fund[1].initial_value / totalFundsAmount) * 100,
        color: colorsAccordingToTheQuantityOfFunds[index],
      }))
      .reverse()
    return generatedData
  }

  function shouldApplyOpacity(fund) {
    if (!pieChartInfoChildren || pieChartInfoChildren.id === fund.name) {
      return false
    }
    return true
  }

  let { name: productName } = creditProduct || ''
  productName = (productName || '').toLowerCase()

  const handleOpenModal = fund => {
    setFundDetails(fund)
    setIsModalOpen(!isModalOpen)
    setInitialReset(false)
  }

  const handleCloseModal = () => {
    setFundDetails({})
    setIsModalOpen(false)
    setInitialReset(true)
  }

  return (
    <GridRow>
      <Modal
        modalTitle={fundDetails.name}
        alignItems="flex-start"
        isOpen={isModalOpen}
        handleClose={() => handleCloseModal()}
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
        <FullHeightCard headerIcon="financial" headerTitle="Fundos Sugeridos">
          {isMobile ? (
            <>
              <Col lg="3">
                <SectionTwoGraphContainer>
                  <PieChart
                    width="218px"
                    height="300px"
                    data={graphValuesGenerator()}
                    onMouseEnter={settingPieChartInfoChildren}
                    onSliceClick={settingPieChartInfoChildren}
                    onMouseLeave={settingPieChartInfoChildren}
                  >
                    <PieChartChildrenContainer>
                      {renderPieChartChildrenNode()}
                    </PieChartChildrenContainer>
                  </PieChart>
                </SectionTwoGraphContainer>
              </Col>

              <ResponsiveTableContainer>
                {funds.map(fund => (
                  <React.Fragment key={fund.fund_id}>
                    <Wrapper>
                      <Square
                        color={
                          graphValuesGenerator().find(
                            item => item.id === fund.name
                          ).color
                        }
                      />
                      <Text
                        type="body"
                        width="270px"
                        css={`
                          margin-left: 7px;
                          margin-bottom: 7px;
                        `}
                      >
                        {fund.name}
                      </Text>
                    </Wrapper>

                    <TableCard>
                      <Text type="captionUppercase" color="gray4">
                        RENTABILIDADE (ÚLT. 12 MESES)
                      </Text>
                      <Text type="headline" color="gray6">
                        {fund.profitability &&
                        fund.profitability[0] &&
                        fund.profitability[0].value &&
                        fund.profitability[0].value[3]
                          ? `${fund.profitability[0].value[3]}%`
                          : '-'}
                      </Text>
                    </TableCard>
                    <TableCard>
                      <Text type="captionUppercase" color="gray4">
                        INVESTIMENTO INICIAL
                      </Text>
                      <Text type="headline" color="gray6">
                        {formatMoney(fund.initial_value)}
                      </Text>
                    </TableCard>
                    <TableCard>
                      <Text type="captionUppercase" color="gray4">
                        INVESTIMENTO MENSAL
                      </Text>
                      <Text type="headline" color="gray6">
                        {formatMoney(fund.monthly_value)}
                      </Text>
                    </TableCard>
                    <ResponsiveTableButton
                      outline
                      onClick={() => handleOpenModal(fund)}
                    >
                      VER MAIS
                    </ResponsiveTableButton>
                    <TableDivisor />
                  </React.Fragment>
                ))}
              </ResponsiveTableContainer>
            </>
          ) : (
            <ContainerFunds>
              <Col lg="3">
                <div>
                  <PieChart
                    marginLegend={0}
                    width="218px"
                    height="300px"
                    data={graphValuesGenerator()}
                    onMouseEnter={settingPieChartInfoChildren}
                    onSliceClick={settingPieChartInfoChildren}
                    onMouseLeave={settingPieChartInfoChildren}
                  >
                    <PieChartChildrenContainer>
                      {renderPieChartChildrenNode()}
                    </PieChartChildrenContainer>
                  </PieChart>
                </div>
              </Col>
              <Col lg="9">
                <FundsTable
                  css={`
                    margin-left: 14px;
                  `}
                >
                  <thead>
                    <TableRow>
                      <TableHeader textAlign="left">
                        <Text type="captionUppercase" color="gray5">
                          fundo de investimento
                        </Text>
                      </TableHeader>
                      <TableHeader>
                        <Text type="captionUppercase" color="gray5">
                          RENT. 12M
                        </Text>
                      </TableHeader>
                      <TableHeader textAlign="right">
                        <Text type="captionUppercase" color="gray5">
                          inv. inicial
                        </Text>
                      </TableHeader>
                      <TableHeader textAlign="right">
                        <Text type="captionUppercase" color="gray5">
                          inv. mensal
                        </Text>
                      </TableHeader>
                    </TableRow>
                  </thead>

                  <tbody>
                    {funds.map(fund => (
                      <TableRow
                        key={fund.name}
                        shouldOppacity={shouldApplyOpacity(fund)}
                      >
                        <TableData
                          width="268px"
                          css={`
                            display: flex;
                            align-items: center;
                          `}
                        >
                          <Square
                            color={
                              graphValuesGenerator().find(
                                item => item.id === fund.name
                              ).color
                            }
                          />
                          <Text
                            type="body"
                            truncate
                            width="270px"
                            css={`
                              margin-left: 7px;
                            `}
                          >
                            {fund.name}
                          </Text>
                        </TableData>
                        <TableData textAlign="center">
                          <Text type="body">
                            {fund.profitability &&
                            fund.profitability[0] &&
                            fund.profitability[0].value &&
                            fund.profitability[0].value[3]
                              ? `${fund.profitability[0].value[3]}%`
                              : '-'}
                          </Text>
                        </TableData>
                        <TableData textAlign="right">
                          <Text type="body" truncate>
                            {formatMoney(fund.initial_value)}
                          </Text>
                        </TableData>
                        <TableData textAlign="right">
                          <Text type="body" truncate>
                            {formatMoney(fund.monthly_value)}
                          </Text>
                        </TableData>
                        <TableData textAlign="-webkit-center" width="100px">
                          <IconButton
                            data-gtm-subname={`fundo ${fund.name}`}
                            data-gtm-name="icone arrowright"
                            data-gtm-type="click"
                            data-gtm-clicktype="button"
                            icon="arrowright"
                            size="small"
                            color="primary"
                            onClick={() => handleOpenModal(fund)}
                          ></IconButton>
                        </TableData>
                      </TableRow>
                    ))}
                  </tbody>
                </FundsTable>
              </Col>
            </ContainerFunds>
          )}
        </FullHeightCard>
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
                <InfoContent key={index}>
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
                </InfoContent>
              ))}
            </CardContainer>
          </FullHeightCard>
        </Col>
      )}
    </GridRow>
  )
}

SectionTwo.propTypes = {
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

SectionTwo.defaultProps = {
  combo: [],
  creditProduct: {},
}

export default SectionTwo
