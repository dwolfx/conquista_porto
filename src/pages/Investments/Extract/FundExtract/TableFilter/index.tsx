import React, { useState, useContext, useEffect } from 'react'
import { ThemeContext } from 'styled-components'
import 'styled-components/macro'
import moment from 'moment'

import ButtonLink from 'components/Button/Link'
import ButtonTag from 'components/Button/Tag'
import DatePickerRangeModal from 'components/Dates/DatePickerRangeModal'
import Dropdown from 'components/Dropdown'
import Icon from 'components/IconExporter'
import Text from 'components/Text'

import { INTERVAL_SELECT_OPTIONS } from 'pages/Investments/Extract/constants'
import { ISelectInterval, IInterval } from 'pages/Investments/Extract/types'

import {
  Wrapper,
  DropdownWrapper,
  ButtonContent,
  ButtonsWrapper,
  DropdownLineContent
} from './styles'

import { IFundExtractFilter } from '../types'

interface IProps {
  filters: IFundExtractFilter
  handleClearFilters: () => void
  selectedInterval: ISelectInterval
  handleFilters: (newFilters: IFundExtractFilter) => void
  handleInterval: (newInterval: IInterval) => void
  handleSelectInterval: (newSelectedInterval: ISelectInterval) => void
}
const TableFilter = ({
  selectedInterval,
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
    if (selectedInterval.id !== 3)
    setPeriod(selectedInterval.name)
  }, [selectedInterval])

  const renderSelectItems = (closeFunc: Function) => {
    const handleClick = (optionSelected: ISelectInterval) => {
      setPeriod(optionSelected.name)
      handleSelectInterval(optionSelected)
      if (optionSelected.id === 3) {
        closeFunc()
        return setIsDatepickerOpen(true)
      }
      handleInterval({
        startDate: moment().subtract(optionSelected.value, 'days').format('YYYY-MM-DD'),
        endDate: moment().format('YYYY-MM-DD')
      })
      closeFunc()
    }
    const nodes = Object.values(INTERVAL_SELECT_OPTIONS).map(option => (
      <DropdownLineContent key={option.name} onClick={() => handleClick(option)}>
        <Text type="headline" bold color="gray6">
          {option.name}
        </Text>
      </DropdownLineContent>
    ))
    return nodes
  }

  return (
    <Wrapper>
      {isDatepickerOpen && <DatePickerRangeModal
        isOpen={isDatepickerOpen}
        blockFutureDays
        onChangeModalOpen={() => setIsDatepickerOpen(false)}
        onHandleApply={(startDate, endDate) => {
          handleInterval({
            startDate: moment(startDate).format('YYYY-MM-DD'),
            endDate: moment(endDate).format('YYYY-MM-DD')
          })
          setPeriod(`${moment(startDate).format('DD/MM/YYYY')} - ${moment(endDate).format('DD/MM/YYYY')}`)
        }}
      />}
      <DropdownWrapper
        data-testid="select-period"
      >
        <Dropdown
          nodes={[renderSelectItems]}
          title="Outros Objetivos"
          containerPadding="7px 0"
          openingSide="left"
        >
          <ButtonContent>
            <Text type="captionUppercase" bold color="blue4" data-testid="select-value">
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
          color={filters.apply ? 'primary' : ''}
          onClick={() => handleFilters({
            ...filters,
            apply: !filters.apply
          })}
        >
          aplicação
        </ButtonTag>
        <ButtonTag
          color={filters.redeem ? 'primary' : ''}
          onClick={() => handleFilters({
            ...filters,
            redeem: !filters.redeem
          })}
        >
          resgate
        </ButtonTag>
        <ButtonTag
          color={filters.quotaEater ? 'primary' : ''}
          onClick={() => handleFilters({
            ...filters,
            quotaEater: !filters.quotaEater
          })}
        >
          come-cotas
        </ButtonTag>
        <ButtonTag
          color={filters.others ? 'primary' : ''}
          onClick={() => handleFilters({
            ...filters,
            others: !filters.others
          })}
        >
          outros
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

export default TableFilter