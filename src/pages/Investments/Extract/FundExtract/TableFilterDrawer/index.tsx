import React, { useState, useEffect, useContext } from 'react'
import { ThemeContext } from 'styled-components'
import 'styled-components/macro'
import moment from 'moment'

import LogoConquistaBeta from 'assets/images/logoConquistaBeta.png'
import DatePickerRange from 'components/Dates/DatePickerRange'
import Drawer from 'components/Drawer'
import ButtonTag from 'components/Button/Tag'
import ButtonLink from 'components/Button/Link'
import Divisor from 'components/Divisor'
import Text from 'components/Text'

import { IFundExtractFilter } from '../types'
import { IInterval, ISelectInterval } from '../../types'

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
} from '../../AccountExtract/TableFilterDrawer/styles'
import { INTERVAL_SELECT_OPTIONS } from '../../constants'
import { INTERVAL_DATE_TYPE } from 'components/Dates/types'

interface IProps {
  isOpen: boolean
  onHandleClose: () => void
  filters: IFundExtractFilter
  handleFilters: (newFilters: IFundExtractFilter) => void
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

  const [newFilters, setNewFilters] = useState<IFundExtractFilter>({
    apply: false,
    redeem: false,
    quotaEater: false,
    others: false
  })
  const [newInterval, setNewInterval] = useState<IInterval>({
    startDate: '',
    endDate: ''
  })

  useEffect(() => {
    setNewFilters(filters)
  }, [filters])

  useEffect(() => {
    setNewInterval(interval)
  }, [interval])

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
          onClick={handleClearFilters}
          >
          LIMPAR
        </ButtonLink>
      </FooterWrapper>
    )
  }

  const getSpecificPeriodLabel = () => {
    if (
      selectedInterval.id === INTERVAL_SELECT_OPTIONS.SPECIFIC_INTERVAL_SELECT_OPTION.id &&
      interval.startDate && 
      interval.endDate
    ) {
      return `${moment(interval.startDate).format('DD/MM/YYYY')} - ${moment(interval.endDate).format('DD/MM/YYYY')}`
    }
    return 'período específico' 
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
            color={selectedInterval.id === INTERVAL_SELECT_OPTIONS.WEEK_INTERVAL_SELECT_OPTION.id ? 'primary' : ''}
            onClick={() => changeInterval(INTERVAL_SELECT_OPTIONS.WEEK_INTERVAL_SELECT_OPTION)}
            css={`margin: 0 ${themeContext.spacing(1)}px ${themeContext.spacing(1)}px 0;`}
          >
            últimos 7 dias
          </ButtonTag>
          <ButtonTag
            color={selectedInterval.id === INTERVAL_SELECT_OPTIONS.MONTH_INTERVAL_SELECT_OPTION.id ? 'primary' : ''}
            onClick={() => changeInterval(INTERVAL_SELECT_OPTIONS.MONTH_INTERVAL_SELECT_OPTION)}
          >
            últimos 30 dias
          </ButtonTag>
          <ButtonTag
            color={
              isDatePickerOpen || 
              selectedInterval.id === INTERVAL_SELECT_OPTIONS.SPECIFIC_INTERVAL_SELECT_OPTION.id ? 'primary' : ''
            }
            onClick={() => {
              handleSelectInterval(INTERVAL_SELECT_OPTIONS.SPECIFIC_INTERVAL_SELECT_OPTION)
              setIsDatePickerOpen(prevState => !prevState)
            }}
          >
            {getSpecificPeriodLabel()}
          </ButtonTag>
          {isDatePickerOpen && (
            <DatePickerContainer>
              <DatePickerRange
                idDatePickerRange="id-interval"
                numberOfMonths={1}
                blockFutureDays
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
              color={newFilters.apply ? 'primary' : ''}
              onClick={() => {
                setNewFilters({
                  ...newFilters,
                  apply: !newFilters.apply
                })
              }}
              css={`margin: 0 ${themeContext.spacing(1)}px ${themeContext.spacing(1)}px 0;`}
              >
              aplicação
            </ButtonTag>
            <ButtonTag
              color={newFilters.redeem ? 'primary' : ''}
              css={`margin: 0 ${themeContext.spacing(1)}px ${themeContext.spacing(1)}px 0;`}
              onClick={() => {
                setNewFilters({
                  ...newFilters,
                  redeem: !newFilters.redeem
                })
              }}
            >
              resgate
            </ButtonTag>
            <ButtonTag
              color={newFilters.quotaEater ? 'primary' : ''}
              onClick={() => {
                setNewFilters({
                  ...newFilters,
                  quotaEater: !newFilters.quotaEater
                })
              }}
            >
              come-cotas
            </ButtonTag>
            <ButtonTag
              color={newFilters.others ? 'primary' : ''}
              onClick={() => {
                setNewFilters({
                  ...newFilters,
                  others: !newFilters.others
                })
              }}
            >
              outros
            </ButtonTag>
          </FilterButtonsWrapper>
        </FilterContentWrapper>
      </ContentWrapper>
    </Drawer>
  )
}

export default TableFilterDrawer