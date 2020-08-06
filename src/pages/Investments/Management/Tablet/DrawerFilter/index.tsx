import React, { useState, useEffect } from 'react'
import Header from './header'
import Footer from './footer'
import Divisor from 'components/Divisor'
import useMedia from 'hooks/useMedia'
import IconViewList from 'assets/icons/list.svg'
import IconViewGrid from 'assets/icons/grid.svg'

import {
  TFundsLayout,
  GTM_DATA_FUNDS_FILTROS_DRAWER,
} from 'pages/Investments/Management/types'

import useFundsList from 'pages/Investments/Management/useFundsList'

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
import { useSelector } from 'react-redux'

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

  const { investmentPosition } = useSelector((state: any) => ({
    investmentPosition: state.investmentPosition.data,
  }))

  const fundsListToFilters = [
    ...new Set(
      investmentPosition?.map(
        // TODO: Trocar  categoria por categoria_arena
        (fund: { [item: string]: any }) => fund.categoria
      )
    ),
  ]

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

  const getFilterName = (category: string): string => {
    if (category === 'renda variável') {
      return 'ações'
    }
    return category
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
              {fundsListToFilters &&
                fundsListToFilters.map((category: any) => (
                  <ButtonTagStyled
                    key={category}
                    {...GTM_DATA_FUNDS_FILTROS_DRAWER}
                    data-gtm-name={`botao filtro drawer categoria ${category.toLowerCase()}`}
                    color={handleFilterColors(category.toLowerCase())}
                    onClick={() =>
                      handleSelectedFilters(category.toLowerCase())
                    }
                  >
                    {getFilterName(category.toLowerCase())}
                  </ButtonTagStyled>
                ))}
            </FundsTypeRow>
          </FundsType>
        </ContentFunds>
      </FilterDrawerBody>
    </Drawer>
  )
}

export default Filter
