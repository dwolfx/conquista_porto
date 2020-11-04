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

import { INTERVAL_SELECT_OPTIONS } from '../constants'
// import { ISelectInterval, IInterval } from 'pages/Investments/Extract/types'
import {
  Wrapper,
  DropdownWrapper,
  ButtonContent,
  ButtonsWrapper,
  DropdownLineContent,
} from './styles'

import * as t from '../types'

interface IProps {
  filters: string[]
  // t.IFundExtractFilter
  interval: t.IInterval
  handleClearFilters: () => void
  selectedInterval: t.ISelectInterval
  handleFilters: (newFilters: string[]) => void
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
        initialDate: moment()
          .subtract(optionSelected.value, 'days')
          .format('YYYY-MM-DD'),
        finalDate: moment().format('YYYY-MM-DD'),
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
            debugger
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
          color={filters.includes('Aplicação no fundo') ? 'primary' : ''}
          onClick={() => {
            if (filters.includes('Aplicação no fundo')) {
              handleFilters(
                filters.filter(item => item !== 'Aplicação no fundo')
              )
            } else {
              handleFilters([...filters, 'Aplicação no fundo'])
            }
          }}
        >
          aplicação no fundo
        </ButtonTag>
        <ButtonTag
          color={filters.includes('Vinculo ao Objetivo') ? 'primary' : ''}
          onClick={() => {
            if (filters.includes('Vinculo ao Objetivo')) {
              handleFilters(
                filters.filter(item => item !== 'Vinculo ao Objetivo')
              )
            } else {
              handleFilters([...filters, 'Vinculo ao Objetivo'])
            }
          }}
        >
          vínculo ao objetivo
        </ButtonTag>
        <ButtonTag
          color={filters.includes('Resgate do fundo') ? 'primary' : ''}
          onClick={() => {
            if (filters.includes('Resgate do fundo')) {
              handleFilters(filters.filter(item => item !== 'Resgate do fundo'))
            } else {
              handleFilters([...filters, 'Resgate do fundo'])
            }
          }}
        >
          resgate do fundo
        </ButtonTag>
        <ButtonTag
          color={filters.includes('Desvinculo do objetivo') ? 'primary' : ''}
          onClick={() => {
            if (filters.includes('Desvinculo do objetivo')) {
              handleFilters(
                filters.filter(item => item !== 'Desvinculo do objetivo')
              )
            } else {
              handleFilters([...filters, 'Desvinculo do objetivo'])
            }
          }}
        >
          desvínculo do objetivo
        </ButtonTag>
        <ButtonTag
          color={
            filters.includes('Transferência entre objetivos') ? 'primary' : ''
          }
          onClick={() => {
            if (filters.includes('Transferência entre objetivos')) {
              handleFilters(
                filters.filter(item => item !== 'Transferência entre objetivos')
              )
            } else {
              handleFilters([...filters, 'Transferência entre objetivos'])
            }
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
