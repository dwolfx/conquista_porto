import React, { useState, useContext, useEffect } from 'react'
import { ThemeContext } from 'styled-components'
import 'styled-components/macro'
import moment from 'moment'

import ButtonLink from 'components/Button/Link'
import ButtonTag from 'components/Button/Tag'
// import DatePickerRangeModal from 'components/Dates/DatePickerRangeModal'
import Dropdown from 'components/Dropdown'
import Icon from 'components/IconExporter'
import Text from 'components/Text'

// import { INTERVAL_SELECT_OPTIONS } from 'pages/Investments/Extract/constants'
// import { ISelectInterval, IInterval } from 'pages/Investments/Extract/types'
import {
  Wrapper,
  DropdownWrapper,
  ButtonContent,
  ButtonsWrapper,
  DropdownLineContent,
} from './styles'

import * as t from '../types'

const INTERVAL_SELECT_OPTIONS = {
  WEEK_INTERVAL_SELECT_OPTION: {
    id: 1,
    name: 'Últimos 7 dias',
    value: 7,
  },
  MONTH_INTERVAL_SELECT_OPTION: {
    id: 2,
    name: 'Últimos 30 dias',
    value: 30,
  },
  SPECIFIC_INTERVAL_SELECT_OPTION: {
    id: 3,
    name: 'Período específico',
    value: null,
  },
}

interface IProps {
  filters: t.IFundExtractFilter
  interval: t.IInterval
  handleClearFilters: () => void
  selectedInterval: t.ISelectInterval
  handleFilters: (newFilters: t.IFundExtractFilter) => void
  handleInterval: (newInterval: t.IInterval) => void
  handleSelectInterval: (newSelectedInterval: t.ISelectInterval) => void
}

const ExtractFilter = ({
  selectedInterval,
  interval,
  handleSelectInterval,
  handleInterval,
  filters,
  handleFilters,
  handleClearFilters,
}: IProps) => {
  const themeContext = useContext(ThemeContext)
  const [period, setPeriod] = useState('')
  const [isDatepickerOpen, setIsDatepickerOpen] = useState(false)

  useEffect(() => {
    if (selectedInterval.id !== 3) setPeriod(selectedInterval.name)
  }, [selectedInterval])

  const renderSelectItems = (closeFunc: Function) => {
    const handleClick = (optionSelected: t.ISelectInterval) => {
      setPeriod(optionSelected.name)
      handleSelectInterval(optionSelected)
      if (optionSelected.id === 3) {
        closeFunc()
        return setIsDatepickerOpen(true)
      }
      handleInterval({
        startDate: moment()
          .subtract(optionSelected.value, 'days')
          .format('YYYY-MM-DD'),
        endDate: moment().format('YYYY-MM-DD'),
      })
      closeFunc()
    }
    const nodes = Object.values(INTERVAL_SELECT_OPTIONS).map(item => (
      <DropdownLineContent key={item.name} onClick={() => handleClick(item)}>
        <Text type="headline" bold color="gray6">
          {item.name}
        </Text>
      </DropdownLineContent>
    ))
    return nodes
  }

  return (
    <Wrapper>
      {/* {isDatepickerOpen && (
        <DatePickerRangeModal
          isOpen={isDatepickerOpen}
          onChangeModalOpen={() => setIsDatepickerOpen(false)}
          onHandleApply={(startDate, endDate) => {
            handleInterval({
              startDate: moment(startDate).format('YYYY-MM-DD'),
              endDate: moment(endDate).format('YYYY-MM-DD'),
            })
            setPeriod(
              `${moment(startDate).format('DD/MM/YYYY')} - ${moment(
                endDate
              ).format('DD/MM/YYYY')}`
            )
          }}
        />
      )} */}
      <DropdownWrapper data-testid="select-period">
        <Dropdown
          nodes={[renderSelectItems]}
          title="Outros Objetivos"
          containerPadding="7px 0"
          openingSide="start"
          zIndex={12}
        >
          <ButtonContent>
            <Text
              type="captionUppercase"
              bold
              color="blue4"
              data-testid="select-value"
            >
              {period}
            </Text>
            <div className="icon">
              <Icon
                name="calendar"
                fill={themeContext.colors.blue4}
                width={21}
              />
            </div>
          </ButtonContent>
        </Dropdown>
      </DropdownWrapper>
      <ButtonsWrapper>
        <ButtonTag
          color={filters.applyFund ? 'primary' : ''}
          onClick={() =>
            handleFilters({
              ...filters,
              applyFund: !filters.applyFund,
            })
          }
        >
          aplicação no fundo
        </ButtonTag>
        <ButtonTag
          color={filters.linkObjective ? 'primary' : ''}
          onClick={() =>
            handleFilters({
              ...filters,
              linkObjective: !filters.linkObjective,
            })
          }
        >
          vínculo ao objetivo
        </ButtonTag>
        <ButtonTag
          color={filters.redeemFund ? 'primary' : ''}
          onClick={() =>
            handleFilters({
              ...filters,
              redeemFund: !filters.redeemFund,
            })
          }
        >
          resgate do fundo
        </ButtonTag>
        <ButtonTag
          color={filters.delinkObjective ? 'primary' : ''}
          onClick={() =>
            handleFilters({
              ...filters,
              delinkObjective: !filters.delinkObjective,
            })
          }
        >
          desvínculo do objetivo
        </ButtonTag>
        <ButtonTag
          color={filters.transferBetweenObjectives ? 'primary' : ''}
          onClick={() =>
            handleFilters({
              ...filters,
              transferBetweenObjectives: !filters.transferBetweenObjectives,
            })
          }
        >
          transferência entre objetivos
        </ButtonTag>
      </ButtonsWrapper>
      <ButtonLink
        color="primary"
        noIcon
        role="button"
        css={`
          margin-left: auto;
        `}
        onClick={handleClearFilters}
      >
        limpar filtros
      </ButtonLink>
    </Wrapper>
  )
}

export default ExtractFilter
