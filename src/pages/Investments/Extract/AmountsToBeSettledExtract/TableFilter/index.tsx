import React, { useState, useContext, useEffect } from 'react'
import { ThemeContext } from 'styled-components'
import 'styled-components/macro'
import moment from 'moment'

import ButtonLink from 'components/Button/Link'
import ButtonTag from 'components/Button/Tag'
import Dropdown from 'components/Dropdown'
import DatePickerRangeModal from 'components/Dates/DatePickerRangeModal'
import Icon from 'components/IconExporter'
import Text from 'components/Text'

import { INTERVAL_SELECT_OPTIONS } from '../../constants'
import { IFilter, IInterval, ISelectInterval } from '../types'

import * as s from './styles'

interface IProps {
  handleFilters: (nextFilters: IFilter) => void
  handleInterval: (nextInterval: IInterval) => void
  handleClearFilters: () => void
  interval: IInterval
  selectedInterval: ISelectInterval
  handleSelectInterval: (newSelectedInterval: ISelectInterval) => void
  filters: IFilter
}
const TableFilter = ({
  filters,
  handleFilters,
  selectedInterval,
  handleInterval,
  handleSelectInterval,
  handleClearFilters,
}: IProps) => {
  const themeContext = useContext(ThemeContext)
  const [isDatepickerOpen, setIsDatepickerOpen] = useState(false)
  const [period, setPeriod] = useState('')

  useEffect(() => {
    if (selectedInterval.id !== 3) setPeriod(selectedInterval.name)
  }, [selectedInterval])

  const renderSelectItems = (closeFunc: Function) => {
    const handleClick = (item: ISelectInterval) => {
      handleSelectInterval(item)
      if (item.id === 3) {
        closeFunc()
        return setIsDatepickerOpen(true)
      }
      handleInterval({
        startDate: moment()
          .subtract(item.value, 'days')
          .format('YYYY-MM-DD'),
        endDate: moment().format('YYYY-MM-DD'),
      })
      closeFunc()
    }
    const nodes = Object.values(INTERVAL_SELECT_OPTIONS).map(item => (
      <s.DropdownLineContent key={item.name} onClick={() => handleClick(item)}>
        <Text type="headline" bold color="gray6">
          {item.name}
        </Text>
      </s.DropdownLineContent>
    ))
    return nodes
  }

  return (
    <s.Wrapper>
      {isDatepickerOpen && (
        <DatePickerRangeModal
          isOpen={isDatepickerOpen}
          // blockFutureDays
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
      )}
      <s.DropdownWrapper data-testid="select-period">
        <Dropdown
          nodes={[renderSelectItems]}
          title="Outros Objetivos"
          containerPadding="7px 0"
          openingSide="start"
          zIndex={12}
        >
          <s.ButtonContent>
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
          </s.ButtonContent>
        </Dropdown>
      </s.DropdownWrapper>
      <s.ButtonsWrapper>
        <ButtonTag
          color={filters.redeem ? 'primary' : ''}
          onClick={() =>
            handleFilters({
              ...filters,
              redeem: !filters.redeem,
            })
          }
        >
          resgate
        </ButtonTag>
        <ButtonTag
          color={filters.application ? 'primary' : ''}
          onClick={() =>
            handleFilters({
              ...filters,
              application: !filters.application,
            })
          }
        >
          aplicação
        </ButtonTag>
      </s.ButtonsWrapper>
      <ButtonLink
        color="primary"
        noIcon
        role="button"
        css={`
          margin-left: auto;
        `}
        onClick={() => {
          handleClearFilters()
        }}
      >
        limpar filtros
      </ButtonLink>
    </s.Wrapper>
  )
}

export default TableFilter
