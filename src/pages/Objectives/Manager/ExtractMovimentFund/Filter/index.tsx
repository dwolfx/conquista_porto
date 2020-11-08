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

import { INTERVAL_SELECT_OPTIONS, ALLOCATION_TYPES } from '../constants'
import {
  Wrapper,
  DropdownWrapper,
  ButtonContent,
  ButtonsWrapper,
  DropdownLineContent,
} from './styles'

import * as t from '../types'

interface IProps {
  filters: t.IAllocationType[]
  interval: t.IInterval
  handleClearFilters: () => void
  selectedInterval: t.ISelectInterval
  handleFilters: (newFilters: t.IAllocationType[]) => void
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

  const filterSelect = (allocationType: t.IAllocationType) => {
    if (filters.some(filter => filter === allocationType)) {
      handleFilters(filters.filter(filter => filter !== allocationType))
    } else {
      handleFilters([...filters, allocationType])
    }
  }

  const renderSelectItems = (closeFunc: Function) => {
    const handleClick = (optionSelected: t.ISelectInterval) => {
      setPeriod(optionSelected.name)
      handleSelectInterval(optionSelected)
      if (optionSelected.id === 3) {
        closeFunc()
        return setIsDatepickerOpen(true)
      }
      handleInterval({
        initialDate: moment()
          .subtract(optionSelected.value, 'days')
          .format('DD/MM/YYYY'),
        finalDate: moment().format('DD/MM/YYYY'),
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
      {isDatepickerOpen && (
        <DatePickerRangeModal
          isOpen={isDatepickerOpen}
          onChangeModalOpen={() => setIsDatepickerOpen(false)}
          onHandleApply={(initialDate, finalDate) => {
            handleInterval({
              initialDate: moment(initialDate).format('DD/MM/YYYY'),
              finalDate: moment(finalDate).format('DD/MM/YYYY'),
            })
            setPeriod(
              `${moment(initialDate).format('DD/MM/YYYY')} - ${moment(
                finalDate
              ).format('DD/MM/YYYY')}`
            )
          }}
        />
      )}
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
          color={
            filters.some(item => item === ALLOCATION_TYPES.INVEST)
              ? 'primary'
              : ''
          }
          onClick={() => {
            filterSelect(ALLOCATION_TYPES.INVEST)
          }}
        >
          aplicação no fundo
        </ButtonTag>
        <ButtonTag
          color={
            filters.some(item => item === ALLOCATION_TYPES.GOAL_LINK)
              ? 'primary'
              : ''
          }
          onClick={() => {
            filterSelect(ALLOCATION_TYPES.GOAL_LINK)
          }}
        >
          vínculo ao objetivo
        </ButtonTag>
        <ButtonTag
          color={
            filters.some(item => item === ALLOCATION_TYPES.REDEEM)
              ? 'primary'
              : ''
          }
          onClick={() => {
            filterSelect(ALLOCATION_TYPES.REDEEM)
          }}
        >
          resgate do fundo
        </ButtonTag>
        <ButtonTag
          color={
            filters.some(item => item === ALLOCATION_TYPES.GOAL_UNLINK)
              ? 'primary'
              : ''
          }
          onClick={() => {
            filterSelect(ALLOCATION_TYPES.GOAL_UNLINK)
          }}
        >
          desvínculo do objetivo
        </ButtonTag>
        <ButtonTag
          color={
            filters.some(item => item === ALLOCATION_TYPES.GOAL_TRANSFER)
              ? 'primary'
              : ''
          }
          onClick={() => {
            filterSelect(ALLOCATION_TYPES.GOAL_TRANSFER)
          }}
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
