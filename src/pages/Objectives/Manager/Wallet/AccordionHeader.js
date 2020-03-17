import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { Col, Row } from 'styled-bootstrap-grid'
import 'styled-components/macro'

import Icon from 'components/IconExporter'
import Popover from 'components/Popover'
import Text from 'components/Text'

import { formatMoney } from 'helpers'

import useMedia from 'hooks/useMedia'
import InfoText from 'components/InfoText'
import { getColorGuide } from './utils'
import { Slider, ObjectivesBar, OtherObjectivesBar } from './styles'

export default function FundAccordionHeader({
  fund,
  fundListCopy,
  setFundListCopy,
}) {
  const [fundAvailable, setFundAvailable] = useState(0)

  const isMobile = useMedia('sm')
  useEffect(() => {
    setFundAvailable(
      fund.available +
        fund.invested -
        fundListCopy.filter(item => item.id === fund.id)[0].invested
    )
  }, [fund.available, fund.id, fund.invested, fundListCopy])

  const handleValueFund = (id, value) => {
    if (setFundListCopy) {
      setFundListCopy(
        fundListCopy.map(item => {
          if (item.id === id) {
            return {
              ...item,
              invested: value,
            }
          }
          return item
        })
      )
    }
  }

  return (
    <Row
      css={`
        padding-right: 28px;
      `}
    >
      <Col
        md="3"
        sm="12"
        css={`
          display: flex;
          flex-direction: column;
          padding-right: ${isMobile ? '0' : '28'}px;
        `}
      >
        <Text type="captionUppercase" color="gray4" bold>
          nome do fundo
        </Text>
        <div
          css={`
            align-items: center;
            display: flex;
          `}
        >
          <Text type="headline" color="gray6" bold>
            {fund.name}
          </Text>
          {fund.recommended && !isMobile && (
            <Popover
              content="Fundo recomendado"
              css={`
                width: 24px;
                margin-left: 14px;
              `}
            >
              <Icon name="information" width={21} color="blue4" />
            </Popover>
          )}
        </div>
      </Col>

      {isMobile ? (
        <>
          <Col
            sm="12"
            css={`
              margin: 7px 0;
            `}
          >
            <Text type="subheading" color="blue4">
              FUNDO RECOMENDADO
            </Text>
          </Col>
        </>
      ) : (
        <Col md="9" alignSelf="center">
          <Row>
            <Col
              md="2"
              css={`
                padding-left: 14px;
              `}
            >
              <InfoText
                label="Saldo do Fundo"
                value={formatMoney(fund.balance)}
              />
            </Col>
            <Col
              md="2"
              css={`
                padding-left: 7px;
              `}
            >
              <InfoText
                label="Não distribuído"
                value={formatMoney(fundAvailable)}
              />
            </Col>
            <Col
              md="8"
              css={`
                align-items: center;
                display: flex;
                flex-direction: column;
              `}
            >
              <Text
                type="captionUppercase"
                color="gray4"
                css={`
                  align-self: flex-start;
                `}
              >
                Distribuição nos seus objetivos
              </Text>
              <ObjectivesBar>
                {fund.goals.map((goal, key) => {
                  const percent = (goal.value / fund.balance) * 100

                  return (
                    <OtherObjectivesBar
                      hasLeftRadius={key === 0}
                      hasRightRadius={
                        (key === fund.goals.length - 1 || percent === 100) &&
                        fund.available === 0
                      }
                      percent={percent}
                      backgroundColor={getColorGuide(key)}
                      key={`fund-${goal.id}`}
                    />
                  )
                })}
                <Slider
                  max={fund.available + fund.invested}
                  initialValue={fund.invested}
                  onlyObjective={
                    fund.goals.length === 0 || fund.balance === fund.invested
                  }
                  onChange={value => {
                    handleValueFund(
                      fund.id,
                      Math.min(value, fund.available + fund.invested)
                    )
                  }}
                  showTooltip={fund.available !== 0 || fund.invested !== 0}
                  showThumb={fund.available !== 0 || fund.invested !== 0}
                />
              </ObjectivesBar>
            </Col>
          </Row>
        </Col>
      )}
    </Row>
  )
}

FundAccordionHeader.propTypes = {
  fund: PropTypes.shape({
    name: PropTypes.string,
    id: PropTypes.number.isRequired,
    recommended: PropTypes.bool,
    goals: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.number,
      })
    ),
    available: PropTypes.number,
    invested: PropTypes.number,
    balance: PropTypes.number,
  }).isRequired,
  fundListCopy: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number,
    })
  ).isRequired,
  setFundListCopy: PropTypes.func,
}

FundAccordionHeader.defaultProps = {
  setFundListCopy: null,
}
