import React from 'react'
import PropTypes from 'prop-types'

import Slider from 'components/Slider'

import { getColorGuide, handleValueFund } from './utils'

import { ObjectivesBar, OtherObjectivesBar } from './styles'

export default function ObjectivesSlider({
  fund,
  maxFundsDistribuition,
  fundListCopy,
  setFundListCopy,
}) {
  return (
    <ObjectivesBar>
      {fund.goals.map((goal, key) => {
        const percent = (goal.value / maxFundsDistribuition) * 100

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
        max={Math.max(fund.available + fund.invested, fund.invested)}
        initialValue={fund.invested}
        onlyObjective={
          fund.goals.length === 0 || fund.balance === fund.invested
        }
        onChange={value => {
          handleValueFund(
            fund.id,
            Math.min(value, Math.abs(fund.available) + fund.invested),
            fundListCopy,
            setFundListCopy
          )
        }}
        showTooltip={false}
        showThumb={fund.available !== 0 || fund.invested !== 0}
      />
    </ObjectivesBar>
  )
}

ObjectivesSlider.propTypes = {
  fund: PropTypes.shape({
    id: PropTypes.number,
    available: PropTypes.number,
    invested: PropTypes.number,
    balance: PropTypes.number,
    goals: PropTypes.arrayOf(
      PropTypes.shape({
        value: PropTypes.number,
      })
    ),
  }).isRequired,
  maxFundsDistribuition: PropTypes.number.isRequired,
  fundListCopy: PropTypes.shape({
    id: PropTypes.number,
    available: PropTypes.number,
    invested: PropTypes.number,
    balance: PropTypes.number,
    goals: PropTypes.arrayOf(
      PropTypes.shape({
        value: PropTypes.number,
      })
    ),
  }).isRequired,
  setFundListCopy: PropTypes.func.isRequired,
}
