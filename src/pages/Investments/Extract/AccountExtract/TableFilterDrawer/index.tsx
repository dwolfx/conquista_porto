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

import { months } from '../constants'
import { initialFilters, initialInterval } from '../'
import { IFilter, IInterval, ISelectInterval } from '../types'

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
  filters: IFilter
  handleFilters: (newFilters: IFilter) => void
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
  handleSelectInterval
}: IProps) => {
  const themeContext = useContext(ThemeContext)
  // Datepicker states
  const [isDatePickerOpen, setIsDatePickerOpen] = useState(false)
  const [initialDate, setInitialDate] = useState<moment.Moment | null>(null)
  const [finalDate, setFinalDate] = useState<moment.Moment | null>(null)
  const [focusedInput, setFocusedInput] = useState(null)

  const [newFilters, setNewFilters] = useState<IFilter>(initialFilters)
  const [newInterval, setNewInterval] = useState<IInterval>(initialInterval)

  useEffect(() => {
    setNewFilters(filters)
  }, [filters])

  useEffect(() => {
    setNewInterval(interval)
  }, [interval])

  const clearFilters = () => {
    handleClearFilters()
    changeInterval(months[0])
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
      startDate: moment().subtract(interval.value, 'days').format('YYYY-MM-DD'),
      endDate: moment().format('YYYY-MM-DD')
    })
  }

  const applyFilters = () => {
    handleFilters({ ...newFilters })
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
          <ButtonSubmit
            outline
            onClick={onHandleClose}
          >
            CANCELAR
          </ButtonSubmit>
          <ButtonSubmit
            color="secondary"
            onClick={applyFilters}
          >
            APLICAR
          </ButtonSubmit>
        </FooterButtonsWrapper>
        <ButtonLink
          noIcon
          role="button"
          css={`margin: 0 auto ${themeContext.spacing(3)}px;`}
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
        <Text
          type="subheading"
          color="gray6"
          bold
        >
          PERÍODO
        </Text>
        <PeriodButtonsWrapper
        >
          <ButtonTag
            color={selectedInterval.id === 1 ? 'primary' : ''}
            onClick={() => changeInterval(months[0])}
            css={`margin: 0 ${themeContext.spacing(1)}px ${themeContext.spacing(1)}px 0;`}
          >
            últimos 7 dias
          </ButtonTag>
          <ButtonTag
            color={selectedInterval.id === 2 ? 'primary' : ''}
            onClick={() => changeInterval(months[1])}
          >
            últimos 30 dias
          </ButtonTag>
          <ButtonTag
            color={isDatePickerOpen && selectedInterval.id === 3 ? 'primary' : ''}
            onClick={() => {
              handleSelectInterval(months[2])
              setIsDatePickerOpen(!isDatePickerOpen)
            }}
          >
            período específico
          </ButtonTag>
          {isDatePickerOpen && (
            <DatePickerContainer>
              <DatePickerRange
                idDatePickerRange="id-interval"
                numberOfMonths={1}
                rangeDates={{
                  dateBegin: initialDate,
                  dateEnd: finalDate,
                  intervalDateType: INTERVAL_DATE_TYPE.MONTH,
                }}
                onHandleFocusedInput={focused => onHandleRangeFocused(focused)}
                focusedInput={focusedInput}
                onHandleSetRangeDates={(initialDateInput, finalDateInput) => {
                  setInitialDate(initialDateInput)
                  setFinalDate(finalDateInput)
                  setNewInterval({
                    startDate: moment(initialDateInput).format('YYYY-MM-DD'),
                    endDate: moment(finalDateInput).format('YYYY-MM-DD')
                  })
                }}
              />
            </DatePickerContainer>
          )}
        </PeriodButtonsWrapper>
        <Divisor />
        <FilterContentWrapper>
          <Text
            type="subheading"
            color="gray6"
            bold
          >
            TIPO DE MOVIMENTAÇÃO
          </Text>
          <FilterButtonsWrapper>
            <ButtonTag
              color={newFilters.entry ? 'primary' : ''}
              onClick={() => {
                setNewFilters({
                  ...newFilters,
                  entry: !newFilters.entry
                })
              }}
              css={`margin: 0 ${themeContext.spacing(1)}px ${themeContext.spacing(1)}px 0;`}
              >
              entrada
            </ButtonTag>
            <ButtonTag
              color={newFilters.withdraw ? 'primary' : ''}
              onClick={() => {
                setNewFilters({
                  ...newFilters,
                  withdraw: !newFilters.withdraw
                })
              }}
            >
              retirada
            </ButtonTag>
          </FilterButtonsWrapper>
        </FilterContentWrapper>
      </ContentWrapper>
    </Drawer>
  )
}

export default TableFilterDrawer