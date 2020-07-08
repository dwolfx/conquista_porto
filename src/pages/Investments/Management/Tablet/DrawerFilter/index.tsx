import React, { useState, useEffect } from 'react'
import Header from './header'
import Footer from './footer'
import Divisor from 'components/Divisor'
import useMedia from 'hooks/useMedia'
import IconViewList from 'assets/icons/list.svg'
import IconViewGrid from 'assets/icons/grid.svg'

import {
  TFundsLayout,
  FUNDS_FILTER_TYPES,
  GTM_DATA_FUNDS_FILTROS_DRAWER,
} from 'pages/Investments/Management/types'

import {
  Drawer,
  FilterDrawerBody,
  ContentView,
  ContentFunds,
  TitleContent,
  ViewModeRow,
  ButtonViewMode,
  ViewModeGroupButton,
  ButtonTagStyled,
  FundsType,
  FundsTypeRow,
} from './styles'

interface IProps {
  filters: any
  viewMode: TFundsLayout
  isDrawerOpen: boolean
  onHandleChangeView: (newStateLayout: TFundsLayout) => void
  onChangeIsDrawerOpen: (isOpen: boolean) => void
  onHandleChangeFilter: (newStateFilters: string[]) => void
}

const Filter: React.FC<IProps> = ({
  filters,
  viewMode,
  isDrawerOpen,
  onHandleChangeView,
  onChangeIsDrawerOpen,
  onHandleChangeFilter,
}) => {
  const [applyButtonDisabled, setApplyButtonDisabled] = useState<boolean>(false)
  const [cleanUpButtonDisabled, setCleanUpButtonDisabled] = useState<boolean>(
    false
  )
  const [selectedFilters, setSelectedFilters] = useState<any[]>([])
  const [selectedViewMode, setSelectedViewMode] = useState<TFundsLayout>(
    'CARDS'
  )

  const isMobile = useMedia('xs')

  const initialFilter: string[] = ['CARDS']

  const isFiltersEqualPrevious = (
    prevFilters: string[],
    newFilters: string[]
  ) => {
    return JSON.stringify(prevFilters) === JSON.stringify(newFilters)
  }

  useEffect(() => {
    const newFilters = [...filters, viewMode]
    const newSelectedFilters = [...selectedFilters, selectedViewMode]
    setApplyButtonDisabled(
      isFiltersEqualPrevious(newFilters, newSelectedFilters)
    )
    setCleanUpButtonDisabled(
      isFiltersEqualPrevious(initialFilter, newSelectedFilters)
    )
  }, [initialFilter, filters, selectedFilters, viewMode, selectedViewMode])

  const handleViewMode = (newViewMode: TFundsLayout) => {
    setSelectedViewMode(newViewMode)
  }

  const handleCloseFilters = () => {
    onChangeIsDrawerOpen(false)
  }

  const handleClearFilters = () => {
    setSelectedFilters([])
    setSelectedViewMode('CARDS')
  }

  const handleFilterColors = (category: string) => {
    return selectedFilters.includes(category) ? 'primary' : ''
  }

  const applyFiltersAndViewMode = (
    selectedFilters: string[],
    selectedViewMode: TFundsLayout
  ) => {
    onHandleChangeFilter([...selectedFilters])
    onHandleChangeView(selectedViewMode)
    handleCloseFilters()
  }

  const handleSelectedFilters = (category: string) => {
    if (!selectedFilters.includes(category)) {
      setSelectedFilters([...selectedFilters, category])
    } else {
      setSelectedFilters([
        ...selectedFilters.filter((item: any) => item !== category),
      ])
    }
  }

  return (
    <Drawer
      isOpen={isDrawerOpen}
      header={isMobile ? Header(handleCloseFilters) : null}
      drawerTitle={'Filtros'}
      handleClose={handleCloseFilters}
      footer={
        <Footer
          onSubmitNewFilters={() =>
            applyFiltersAndViewMode(selectedFilters, selectedViewMode)
          }
          onHandleRemoveFilters={handleClearFilters}
          applyButtonDisabled={applyButtonDisabled}
          cleanUpButtonDisabled={cleanUpButtonDisabled}
        />
      }
    >
      <FilterDrawerBody>
        <ContentView>
          <TitleContent>Visualizar</TitleContent>
          <ViewModeRow>
            <ViewModeGroupButton
              {...GTM_DATA_FUNDS_FILTROS_DRAWER}
              data-gtm-name="botao fundos drawer layout cards"
              textColor={selectedViewMode === 'CARDS' ? 'primary' : 'secondary'}
              onClick={() => handleViewMode('CARDS')}
            >
              <span>grade</span>
              <ButtonViewMode
                backgroundcolor={
                  selectedViewMode === 'CARDS' ? 'primary' : 'secondary'
                }
                iconViewMode={IconViewGrid}
              />
            </ViewModeGroupButton>
            <ViewModeGroupButton
              {...GTM_DATA_FUNDS_FILTROS_DRAWER}
              data-gtm-name="botao fundos drawer layout list"
              textColor={selectedViewMode === 'LIST' ? 'primary' : 'secondary'}
              onClick={() => handleViewMode('LIST')}
            >
              <span>lista</span>
              <ButtonViewMode
                backgroundcolor={
                  selectedViewMode === 'LIST' ? 'primary' : 'secondary'
                }
                iconViewMode={IconViewList}
              />
            </ViewModeGroupButton>
          </ViewModeRow>
        </ContentView>
        <Divisor />
        <ContentFunds>
          <TitleContent>Tipo de fundo</TitleContent>
          <FundsType>
            <FundsTypeRow>
              <ButtonTagStyled
                {...GTM_DATA_FUNDS_FILTROS_DRAWER}
                data-gtm-name="botao filtro drawer categoria renda fixa"
                color={handleFilterColors(FUNDS_FILTER_TYPES[1])}
                onClick={() => handleSelectedFilters(FUNDS_FILTER_TYPES[1])}
              >
                renda fixa
              </ButtonTagStyled>
              <ButtonTagStyled
                {...GTM_DATA_FUNDS_FILTROS_DRAWER}
                data-gtm-name="botao filtro drawer categoria multimercado"
                color={handleFilterColors(FUNDS_FILTER_TYPES[2])}
                onClick={() => handleSelectedFilters(FUNDS_FILTER_TYPES[2])}
              >
                multimercado
              </ButtonTagStyled>
              <ButtonTagStyled
                {...GTM_DATA_FUNDS_FILTROS_DRAWER}
                data-gtm-name="botao filtro drawer categoria acoes"
                color={handleFilterColors(FUNDS_FILTER_TYPES[3])}
                onClick={() => handleSelectedFilters(FUNDS_FILTER_TYPES[3])}
              >
                ações
              </ButtonTagStyled>
            </FundsTypeRow>
            <FundsTypeRow>
              <ButtonTagStyled
                {...GTM_DATA_FUNDS_FILTROS_DRAWER}
                data-gtm-name="botao filtro drawer categoria investimento no exterior"
                color={handleFilterColors(FUNDS_FILTER_TYPES[4])}
                onClick={() => handleSelectedFilters(FUNDS_FILTER_TYPES[4])}
              >
                investimento no exterior
              </ButtonTagStyled>
              <ButtonTagStyled
                {...GTM_DATA_FUNDS_FILTROS_DRAWER}
                data-gtm-name="botao filtro drawer categoria cambial"
                color={handleFilterColors(FUNDS_FILTER_TYPES[5])}
                onClick={() => handleSelectedFilters(FUNDS_FILTER_TYPES[5])}
              >
                cambial
              </ButtonTagStyled>
            </FundsTypeRow>
          </FundsType>
        </ContentFunds>
      </FilterDrawerBody>
    </Drawer>
  )
}

export default Filter
