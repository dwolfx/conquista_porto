import React, { useState, useEffect, useContext } from 'react'
import { ThemeContext } from 'styled-components'
import 'styled-components/macro'
import moment from 'moment'

import LogoConquistaBeta from 'assets/images/logoConquistaBeta.png'
import DatePickerRange from 'components/Dates/DatePickerRange'
import Drawer from 'components/Drawer'
import Divisor from 'components/Divisor'
import Text from 'components/Text'
import ButtonTag from 'components/Button/Tag'
import ButtonLink from 'components/Button/Link'
import { INTERVAL_DATE_TYPE } from 'components/Dates/types'

import { INTERVAL_SELECT_OPTIONS } from '../constants'
import { IInterval, ISelectInterval } from '../types'

import {
  ButtonSubmit,
  CloseButton,
  ContentWrapper,
  DatePickerContainer,
  FilterButtonsWrapper,
  FilterContentWrapper,
  FilterDrawerHeader,
  FooterButtonsWrapper,
  HeaderColTitle,
  PrevButton,
  PeriodButtonsWrapper,
  FooterWrapper,
} from './styles'

interface IProps {
  isOpen: boolean
  onHandleClose: () => void
  filters: string[]
  handleFilters: (newFilters: string[]) => void
  interval: IInterval
  handleInterval: (newInterval: IInterval) => void
  selectedInterval: ISelectInterval
  handleSelectInterval: (newSelectInterval: ISelectInterval) => void
  handleClearFilters: () => void
}
const TableFilterDrawer = ({
  isOpen,
  onHandleClose,
  filters,
  handleFilters,
  interval,
  handleInterval,
  selectedInterval,
  handleClearFilters,
  handleSelectInterval,
}: IProps) => {
  const themeContext = useContext(ThemeContext)
  // Datepicker states
  const [isDatePickerOpen, setIsDatePickerOpen] = useState(false)
  const [initialDate, setInitialDate] = useState<moment.Moment | null>(null)
  const [finalDate, setFinalDate] = useState<moment.Moment | null>(null)
  const [focusedInput, setFocusedInput] = useState(null)

  const [newFilters, setNewFilters] = useState<string[]>([])
  const [newInterval, setNewInterval] = useState<IInterval>({
    initialDate: '',
    finalDate: '',
  })

  useEffect(() => {
    if (selectedInterval.id === 3) {
      setInitialDate(moment(interval.initialDate))
      setFinalDate(moment(interval.finalDate))
    } else {
      setInitialDate(null)
      setFinalDate(null)
    }
  }, [selectedInterval, interval])

  useEffect(() => {
    setNewFilters([...filters])
  }, [filters])

  useEffect(() => {
    setNewInterval({ ...interval })
  }, [interval])

  const clearFilters = () => {
    handleClearFilters()
    changeInterval(INTERVAL_SELECT_OPTIONS.WEEK_INTERVAL_SELECT_OPTION)
  }

  const onHandleRangeFocused = (focus: any) => {
    setFocusedInput(focus)
  }

  const changeInterval = (interval: ISelectInterval) => {
    setIsDatePickerOpen(false)
    setFinalDate(null)
    setInitialDate(null)
    handleSelectInterval(interval)
    setNewInterval({
      initialDate: moment()
        .subtract(interval.value, 'days')
        .format('YYYY-MM-DD'),
      finalDate: moment().format('YYYY-MM-DD'),
    })
  }

  const applyFilters = () => {
    handleFilters([...newFilters])
    handleInterval({ ...newInterval })
    onHandleClose()
  }

  const DrawerHeader = (handleCloseFilters: () => void) => {
    return (
      <FilterDrawerHeader>
        <PrevButton
          data-gtm-subname="drawer filtros"
          data-gtm-name="botao fechar drawer filtros"
          data-gtm-type="click"
          data-gtm-clicktype="button"
          role="button"
          name="arrowleft"
          color="gray4"
          width={28}
          height={28}
          onClick={() => handleCloseFilters()}
        />
        <HeaderColTitle>
          <img src={LogoConquistaBeta} alt="Logo Conquista Beta" />
        </HeaderColTitle>
        <CloseButton
          data-gtm-subname="drawer close"
          data-gtm-name="botao fechar drawer filtros"
          data-gtm-type="click"
          data-gtm-clicktype="button"
          role="button"
          name="close"
          color="gray4"
          width={28}
          height={28}
          onClick={() => handleCloseFilters()}
        />
      </FilterDrawerHeader>
    )
  }

  const DrawerFooter = () => {
    return (
      <FooterWrapper>
        <FooterButtonsWrapper>
          <ButtonSubmit outline onClick={onHandleClose}>
            CANCELAR
          </ButtonSubmit>
          <ButtonSubmit color="secondary" onClick={applyFilters}>
            APLICAR
          </ButtonSubmit>
        </FooterButtonsWrapper>
        <ButtonLink
          noIcon
          role="button"
          css={`
            margin: 0 auto ${themeContext.spacing(3)}px;
          `}
          onClick={clearFilters}
        >
          LIMPAR
        </ButtonLink>
      </FooterWrapper>
    )
  }

  return (
    <Drawer
      isOpen={isOpen}
      header={DrawerHeader(onHandleClose)}
      footer={DrawerFooter()}
      footerHeight="auto"
      handleClose={onHandleClose}
      data-testid="extract-filter-drawer"
    >
      <ContentWrapper>
        <Text type="subheading" color="gray6" bold>
          PERÍODO
        </Text>
        <PeriodButtonsWrapper>
          <ButtonTag
            color={selectedInterval.id === 1 ? 'primary' : ''}
            onClick={() =>
              changeInterval(
                INTERVAL_SELECT_OPTIONS.WEEK_INTERVAL_SELECT_OPTION
              )
            }
            css={`
              margin: 0 ${themeContext.spacing(1)}px
                ${themeContext.spacing(1)}px 0;
            `}
          >
            últimos 7 dias
          </ButtonTag>
          <ButtonTag
            color={selectedInterval.id === 2 ? 'primary' : ''}
            onClick={() =>
              changeInterval(
                INTERVAL_SELECT_OPTIONS.MONTH_INTERVAL_SELECT_OPTION
              )
            }
          >
            últimos 30 dias
          </ButtonTag>
          <ButtonTag
            color={
              isDatePickerOpen || selectedInterval.id === 3 ? 'primary' : ''
            }
            onClick={() => {
              handleSelectInterval(
                INTERVAL_SELECT_OPTIONS.SPECIFIC_INTERVAL_SELECT_OPTION
              )
              setIsDatePickerOpen(!isDatePickerOpen)
            }}
          >
            {selectedInterval.id === 3 && initialDate && finalDate
              ? `${moment(initialDate).format('DD/MM/YYYY')} - ${moment(
                  finalDate
                ).format('DD/MM/YYYY')}`
              : 'período específico'}
          </ButtonTag>
          {isDatePickerOpen && (
            <DatePickerContainer>
              <DatePickerRange
                idDatePickerRange="id-interval"
                blockFutureDays
                numberOfMonths={1}
                onHandleFocusedInput={focused => onHandleRangeFocused(focused)}
                focusedInput={focusedInput}
                rangeDates={{
                  dateBegin: initialDate,
                  dateEnd: finalDate,
                  intervalDateType: INTERVAL_DATE_TYPE.MONTH,
                }}
                onHandleSetRangeDates={(initialDateInput, finalDateInput) => {
                  setInitialDate(initialDateInput)
                  setFinalDate(finalDateInput)
                  setNewInterval({
                    initialDate: moment(initialDateInput).format('YYYY-MM-DD'),
                    finalDate: moment(finalDateInput).format('YYYY-MM-DD'),
                  })
                }}
              />
            </DatePickerContainer>
          )}
        </PeriodButtonsWrapper>
        <Divisor />
        <FilterContentWrapper>
          <Text type="subheading" color="gray6" bold>
            TIPO DE MOVIMENTAÇÃO
          </Text>
          <FilterButtonsWrapper>
            <ButtonTag
              color={newFilters.includes('Aplicação no fundo') ? 'primary' : ''}
              onClick={() => {
                if (newFilters.includes('Aplicação no fundo')) {
                  setNewFilters(
                    newFilters.filter(item => item !== 'Aplicação no fundo')
                  )
                } else {
                  setNewFilters([...newFilters, 'Aplicação no fundo'])
                }
              }}
            >
              aplicação no fundo
            </ButtonTag>
            <ButtonTag
              color={
                newFilters.includes('Vinculo ao Objetivo') ? 'primary' : ''
              }
              onClick={() => {
                if (newFilters.includes('Vinculo ao Objetivo')) {
                  setNewFilters(
                    newFilters.filter(item => item !== 'Vinculo ao Objetivo')
                  )
                } else {
                  setNewFilters([...newFilters, 'Vinculo ao Objetivo'])
                }
              }}
            >
              vínculo ao objetivo
            </ButtonTag>
            <ButtonTag
              color={newFilters.includes('Resgate do fundo') ? 'primary' : ''}
              onClick={() => {
                if (newFilters.includes('Resgate do fundo')) {
                  setNewFilters(
                    newFilters.filter(item => item !== 'Resgate do fundo')
                  )
                } else {
                  setNewFilters([...newFilters, 'Resgate do fundo'])
                }
              }}
            >
              resgate do fundo
            </ButtonTag>
            <ButtonTag
              color={
                newFilters.includes('Desvinculo do objetivo') ? 'primary' : ''
              }
              onClick={() => {
                if (newFilters.includes('Desvinculo do objetivo')) {
                  setNewFilters(
                    newFilters.filter(item => item !== 'Desvinculo do objetivo')
                  )
                } else {
                  setNewFilters([...newFilters, 'Desvinculo do objetivo'])
                }
              }}
            >
              desvínculo do objetivo
            </ButtonTag>
            <ButtonTag
              color={
                newFilters.includes('Transferência entre objetivos')
                  ? 'primary'
                  : ''
              }
              onClick={() => {
                if (newFilters.includes('Transferência entre objetivos')) {
                  setNewFilters(
                    newFilters.filter(
                      item => item !== 'Transferência entre objetivos'
                    )
                  )
                } else {
                  setNewFilters([
                    ...newFilters,
                    'Transferência entre objetivos',
                  ])
                }
              }}
            >
              transferência entre objetivos
            </ButtonTag>
          </FilterButtonsWrapper>
        </FilterContentWrapper>
      </ContentWrapper>
    </Drawer>
  )
}

export default TableFilterDrawer
