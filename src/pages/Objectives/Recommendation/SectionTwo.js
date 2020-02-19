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
import ModalFundos from './ModalFundos'

import {
  GridRow,
  FullHeightCard,
  InfoContent,
  CardContainer,
  SpacedText,
  PieChartChildrenContainer,
  FundsTable,
  TableHeader,
  ContainerFunds,
  TableRow,
  TableData,
  Square,
  PieChartChildrenContent,
} from './styles'

const SectionTwo = ({ creditProduct, combo, funds }) => {
  const theme = useContext(ThemeContext)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [fundDetails, setFundDetails] = useState({})
  const [pieChartInfoChildren, setPieChartInfoChildren] = useState(null)

  function groupBy(arr, key) {
    return arr.reduce((prev, curr) => {
      const newPrev = {
        ...prev,
        [curr[key]]: [...(prev[curr[key]] || []), curr],
      }
      return newPrev
    }, {})
  }

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
        <Text color="gray6" type="headline">
          {formatMoney(
            funds.reduce((acc, curr) => acc + +curr.initial_value, 0)
          )}
        </Text>
        <Divisor />
        <Text color="gray4" type="captionUppercase">
          total mensal
        </Text>
        <Text type="headline">
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
    ]

    const groupedData = groupBy(funds, 'category_name')
    const sortedData = Object.entries(groupedData).sort(
      (a, b) => b[1].length - a[1].length
    )

    const colorsAccordingToTheQuantityOfFunds = [
      ...colorsPriority.slice(0, sortedData.length),
    ]

    const amountOfFundsCategories = Object.values(groupedData).reduce(
      (acc, curr) => acc + curr.length,
      0
    )

    const generatedData = Object.entries(sortedData)
      .map(([, item], index) => ({
        id: item[0],
        name: item[0],
        value: item[1].length,
        percent: (item[1].length / amountOfFundsCategories) * 100,
        color: colorsAccordingToTheQuantityOfFunds[index],
      }))
      .reverse()

    return generatedData
  }

  function shouldApplyOpacity(fund) {
    if (
      !pieChartInfoChildren ||
      pieChartInfoChildren.id === fund.category_name
    ) {
      return false
    }
    return true
  }

  let { name: productName } = creditProduct || ''
  productName = (productName || '').toLowerCase()

  const fundsModal = fund => {
    setFundDetails(fund)
    setIsModalOpen(!isModalOpen)
  }

  return (
    <GridRow>
      <Modal
        modalTitle="Regras de condições"
        alignItems="flex-start"
        isOpen={isModalOpen}
        handleClose={() => setIsModalOpen(false)}
      >
        <ModalFundos fundDetails={fundDetails} />
      </Modal>
      <Col lg={combo.length > 1 ? '9' : '12'}>
        <FullHeightCard headerIcon="financial" headerTitle="Fundos Sugeridos">
          <ContainerFunds>
            <Col lg="3">
              <div>
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
                        rentabilidade
                      </Text>
                      <Text type="captionUppercase" color="gray4">
                        últ. 12 meses
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
                    <TableHeader></TableHeader>
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
                              item => item.id === fund.category_name
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
                        <Text type="body">{`${fund.profitability['12']}%`}</Text>
                      </TableData>
                      <TableData textAlign="right">
                        <Text type="body">
                          {formatMoney(fund.initial_value)}
                        </Text>
                      </TableData>
                      <TableData textAlign="right">
                        <Text type="body">
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
                          size="large"
                          color="secondary"
                          onClick={() => fundsModal(fund)}
                        ></IconButton>
                      </TableData>
                    </TableRow>
                  ))}
                </tbody>
              </FundsTable>
            </Col>
          </ContainerFunds>
        </FullHeightCard>
      </Col>

      {creditProduct && combo.length > 1 && (
        <Col lg="3">
          <FullHeightCard
            headerIcon={
              (productName.includes('financiamento') && 'money') ||
              (productName.includes('consórcio de casa') && 'homewithwindow') ||
              (productName.includes('consórcio de veículo') && 'car2')
            }
            headerTitle={creditProduct.name.split(' ')[0]}
          >
            <CardContainer>
              {creditProduct.values.map((item, index) => (
                <InfoContent key={index}>
                  <SpacedText type="captionUppercase" color="gray5">
                    {item.name}
                  </SpacedText>
                  <SpacedText
                    type="headline"
                    color={item.checked ? 'green3' : 'gray6'}
                  >
                    {item.value}
                    {item.checked && (
                      <Icon
                        name="check"
                        width="21px"
                        fill={theme.colors.green3}
                      />
                    )}
                  </SpacedText>
                  {item.info && (
                    <Icon
                      name="information"
                      width="21px"
                      fill={theme.colors.gray5}
                    />
                  )}
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
      profitability: PropTypes.shape({
        '12': PropTypes.number,
      }),
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
