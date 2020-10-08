import React, { useState, useContext } from 'react'
import { ThemeContext } from 'styled-components'
import 'styled-components/macro'
import moment from 'moment'

import ButtonLink from 'components/Button/Link'
import ButtonTag from 'components/Button/Tag'
import Dropdown from 'components/Dropdown'
import DatePickerRangeModal from 'components/Dates/DatePickerRangeModal'
import Icon from 'components/IconExporter'
import Text from 'components/Text'

import { initialFilters } from '../index'
import { IFilter, IInterval } from '../types'

import { 
  Wrapper,
  DropdownWrapper,
  DropdownLineContent,
  ButtonContent,
  ButtonsWrapper
} from './styles'

export const months = [
  {
    name: 'Últimos 7 dias',
    value: 7,
  },
  {
    name: 'Últimos 30 dias',
    value: 30,
  },
  {
    name: 'Período específico',
    value: null,
  },
]

interface IProps {
  handleFilters: (nextFilters: IFilter) => void
  handleInterval: (nextInterval: IInterval) => void
  interval: IInterval
  filters: IFilter
}
const TableFilter = ({ filters, handleFilters, interval, handleInterval }: IProps) => {
  const themeContext = useContext(ThemeContext)
  const [period, setPeriod] = useState(months[0].name);
  const [isDatepickerOpen, setIsDatepickerOpen] = useState(false)

  const renderSelectItems = (closeFunc: Function) => {
    const handleClick = (item: any) => {
      setPeriod(item.name)
      if (!item.value) {
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

  const clearFilters = () => {
    handleFilters({ ...initialFilters })
    setPeriod(months[0].name)
    handleInterval({
      startDate: moment().subtract(7, 'days').format('YYYY-MM-DD'),
      endDate: moment().format('YYYY-MM-DD')
    })
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
        onClick={clearFilters}
      >
        limpar filtros
      </ButtonLink>
    </Wrapper>
  )
}

export default TableFilter