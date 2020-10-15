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

import { months } from '../constants'
import { IFilter, IInterval, ISelectInterval } from '../types'

import { 
  Wrapper,
  DropdownWrapper,
  DropdownLineContent,
  ButtonContent,
  ButtonsWrapper
} from './styles'


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
  interval,
  selectedInterval,
  handleInterval,
  handleSelectInterval,
  handleClearFilters
}: IProps) => {
  const themeContext = useContext(ThemeContext)
  const [isDatepickerOpen, setIsDatepickerOpen] = useState(false)
  const [period, setPeriod] = useState('')

  useEffect(() => {
    if (selectedInterval.id !== 3)
    setPeriod(selectedInterval.name)
  }, [selectedInterval])

  const renderSelectItems = (closeFunc: Function) => {
    const handleClick = (item: ISelectInterval) => {
      handleSelectInterval(item)
      if (item.id === 3) {
        closeFunc()
        return setIsDatepickerOpen(true)
      }
      handleInterval({
        startDate: moment().subtract(item.value, 'days').format('YYYY-MM-DD'),
        endDate: moment().format('YYYY-MM-DD')
      })
      closeFunc()
    }
    const nodes = months.map(item => (
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
    {isDatepickerOpen && <DatePickerRangeModal
      isOpen={isDatepickerOpen}
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
          color={filters.entry ? 'primary' : ''}
          onClick={() => handleFilters({
            ...filters,
            entry: !filters.entry
          })}
        >
          entrada
        </ButtonTag>
        <ButtonTag
          color={filters.withdraw ? 'primary' : ''}
          onClick={() => handleFilters({
            ...filters,
            withdraw: !filters.withdraw
          })}
        >
          retirada
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