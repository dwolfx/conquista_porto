import React, { useState, useEffect } from 'react'

import LogoConquistaBeta from 'assets/images/logoConquistaBeta.png'

import Drawer from 'components/Drawer'
import Divisor from 'components/Divisor'
import Switch from 'components/Inputs/Switch'
import Text from 'components/Text'

import { IFundSort } from './sortFundList'

import {
  FILTER_TYPES,
  FILTER_RISKS,
  ORDER_TYPES,
} from 'pages/Investments/FundsList/constants'

import {
  FilterDrawerBody,
  ButtonContainer,
  ButtonTagStyled,
  ButtonSubmit,
  CustomRow,
  FilterDrawerHeader,
  HeaderColTitle,
  CloseButton,
  PrevButton,
} from './styles'
import useMedia from 'hooks/useMedia'

interface IFilterProps {
  byCategoriaArena: string[]
  byPerfilRisco: string[]
}

interface IProps {
  filter: IFilterProps
  sort: IFundSort
  isDrawerOpen: boolean
  onChangeIsDrawerOpen: (isOpen: boolean) => void
  onChangeFilter: (filter: IFilterProps) => void
  onChangeSort: (sort: IFundSort) => void
}

export const DrawerFilter = ({
  filter,
  onChangeFilter,
  sort,
  onChangeSort,
  isDrawerOpen,
  onChangeIsDrawerOpen,
}: IProps) => {
  const [isDesc, setIsDesc] = useState<boolean | null>(null)
  const [applyButtonDisabled, setApplyButtonDisabled] = useState<boolean>(false)
  const [cleanUpButtonDisabled, setCleanUpButtonDisabled] = useState<boolean>(
    false
  )
  const [newFilters, setNewFilters] = useState<IFilterProps>({
    byCategoriaArena: [],
    byPerfilRisco: [],
  })
  const [newSort, setNewSort] = useState<IFundSort>({
    sortBy: null,
    sortType: null,
  })

  const initialFilterAndSort = {
    byCategoriaArena: [],
    byPerfilRisco: [],
    sortBy: null,
    sortType: null,
  }

  const isMobile = useMedia('sm')

  useEffect(() => {
    setNewFilters({ ...filter })
    setNewSort({ ...sort })
    if (sort.sortBy === null) {
      setIsDesc(null)
    }
  }, [filter, sort])

  useEffect(() => {
    const filterAndSort = { ...filter, ...sort }
    const newFilterAndNewSort = { ...newFilters, ...newSort, sortType: isDesc }

    isFiltersEqual(filterAndSort, newFilterAndNewSort)
      ? setApplyButtonDisabled(true)
      : setApplyButtonDisabled(false)

    isFiltersEqual(initialFilterAndSort, newFilterAndNewSort)
      ? setCleanUpButtonDisabled(true)
      : setCleanUpButtonDisabled(false)
  }, [filter, sort, newFilters, newSort, isDesc, initialFilterAndSort])

  const submitNewFilters = () => {
    onChangeFilter({ ...newFilters })
    onChangeSort({ ...newSort, sortType: isDesc })
    onChangeIsDrawerOpen(false)
  }

  const isFiltersEqual = (
    filterAndSort: IFilterProps & IFundSort,
    newFilterAndNewSort: IFilterProps & IFundSort
  ) => {
    return JSON.stringify(filterAndSort) === JSON.stringify(newFilterAndNewSort)
  }

  const handleAddOrderFilter = (field: string) => {
    if (newSort.sortBy === field) {
      setIsDesc(null)
      setNewSort({ sortBy: null, sortType: null })
    } else if (sort.sortType === null) {
      setIsDesc(false)
      setNewSort({ sortType: isDesc, sortBy: field })
    } else {
      setNewSort({ sortType: isDesc, sortBy: field })
    }
  }

  const handleAddAssetTypeFilter = (newFilter: string) => {
    if (newFilters.byCategoriaArena.includes(newFilter)) {
      setNewFilters({
        ...newFilters,
        byCategoriaArena: newFilters.byCategoriaArena
          .filter(item => item !== newFilter)
          .sort(),
      })
    } else {
      setNewFilters({
        ...newFilters,
        byCategoriaArena: [...newFilters.byCategoriaArena, newFilter].sort(),
      })
    }
  }

  const handleAddRiskFilter = (newFilter: string) => {
    if (newFilters.byPerfilRisco.includes(newFilter)) {
      setNewFilters({
        ...newFilters,
        byPerfilRisco: newFilters.byPerfilRisco
          .filter(item => item !== newFilter)
          .sort(),
      })
    } else {
      setNewFilters({
        ...newFilters,
        byPerfilRisco: [...newFilters.byPerfilRisco, newFilter].sort(),
      })
    }
  }

  const handleCloseFilters = () => {
    setIsDesc(sort.sortType)
    onChangeIsDrawerOpen(false)
    setNewFilters({ ...filter })
    setNewSort({ ...sort })
  }

  const handleRemoveFilters = () => {
    setIsDesc(null)
    setNewFilters({
      byCategoriaArena: [],
      byPerfilRisco: [],
    })
    setNewSort({
      sortBy: null,
      sortType: null,
    })
  }

  return (
    <Drawer
      isOpen={isDrawerOpen}
      header={isMobile ? DrawerHeader(handleCloseFilters) : null}
      drawerTitle={!isMobile ? 'Filtros' : undefined}
      handleClose={!isMobile ? handleCloseFilters : undefined}
      footer={DrawerFooter(
        submitNewFilters,
        handleRemoveFilters,
        applyButtonDisabled,
        cleanUpButtonDisabled
      )}
    >
      <FilterDrawerBody>
        <div>
          <Text type="subheading" bold color="gray6">
            ORDENAR
          </Text>
          <ButtonContainer>
            <ButtonTagStyled
              color={newSort.sortBy === ORDER_TYPES[1] ? 'primary' : ''}
              onClick={() => {
                handleAddOrderFilter(ORDER_TYPES[1])
              }}
            >
              APLICAÇÃO MÍNIMA
            </ButtonTagStyled>
            <ButtonTagStyled
              color={newSort.sortBy === ORDER_TYPES[2] ? 'primary' : ''}
              onClick={() => {
                handleAddOrderFilter(ORDER_TYPES[2])
              }}
            >
              COTIZAÇÃO DE RESGATE
            </ButtonTagStyled>
            <ButtonTagStyled
              color={newSort.sortBy === ORDER_TYPES[3] ? 'primary' : ''}
              onClick={() => {
                handleAddOrderFilter(ORDER_TYPES[3])
              }}
            >
              TAXA ADM.
            </ButtonTagStyled>
            <ButtonTagStyled
              color={newSort.sortBy === ORDER_TYPES[4] ? 'primary' : ''}
              onClick={() => {
                handleAddOrderFilter(ORDER_TYPES[4])
              }}
            >
              RENT. MÊS
            </ButtonTagStyled>
            <ButtonTagStyled
              color={newSort.sortBy === ORDER_TYPES[5] ? 'primary' : ''}
              onClick={() => {
                handleAddOrderFilter(ORDER_TYPES[5])
              }}
            >
              RENT. ANO
            </ButtonTagStyled>
            <ButtonTagStyled
              color={newSort.sortBy === ORDER_TYPES[6] ? 'primary' : ''}
              onClick={() => {
                handleAddOrderFilter(ORDER_TYPES[6])
              }}
            >
              RENT. 12M
            </ButtonTagStyled>
          </ButtonContainer>
          <CustomRow margin="0 0 21px 0">
            <Switch
              id="switch-fund-sort"
              value={!!isDesc}
              onChangeSwitch={() => setIsDesc(prevState => !prevState)}
              leftLabel="Crescente"
              rightLabel="Decrescente"
              disabled={!newSort.sortBy}
            ></Switch>
          </CustomRow>
        </div>
        <Divisor />
        <CustomRow margin="28px 0 28px 0">
          <Text type="subheading" bold color="gray6">
            TIPO DE ATIVO
          </Text>
          <ButtonContainer>
            <ButtonTagStyled
              color={
                newFilters.byCategoriaArena.includes(FILTER_TYPES[1])
                  ? 'primary'
                  : ''
              }
              onClick={() => {
                handleAddAssetTypeFilter(FILTER_TYPES[1])
              }}
            >
              RENDA FIXA
            </ButtonTagStyled>
            <ButtonTagStyled
              color={
                newFilters.byCategoriaArena.includes(FILTER_TYPES[2])
                  ? 'primary'
                  : ''
              }
              onClick={() => {
                handleAddAssetTypeFilter(FILTER_TYPES[2])
              }}
            >
              MULTIMERCADO
            </ButtonTagStyled>
            <ButtonTagStyled
              color={
                newFilters.byCategoriaArena.includes(FILTER_TYPES[3])
                  ? 'primary'
                  : ''
              }
              onClick={() => {
                handleAddAssetTypeFilter(FILTER_TYPES[3])
              }}
            >
              AÇÕES
            </ButtonTagStyled>
            <ButtonTagStyled
              color={
                newFilters.byCategoriaArena.includes(FILTER_TYPES[4])
                  ? 'primary'
                  : ''
              }
              onClick={() => {
                handleAddAssetTypeFilter(FILTER_TYPES[4])
              }}
            >
              INVESTIMENTO NO EXTERIOR
            </ButtonTagStyled>
            <ButtonTagStyled
              color={
                newFilters.byCategoriaArena.includes(FILTER_TYPES[5])
                  ? 'primary'
                  : ''
              }
              onClick={() => {
                handleAddAssetTypeFilter(FILTER_TYPES[5])
              }}
            >
              CAMBIAL
            </ButtonTagStyled>
          </ButtonContainer>
        </CustomRow>
        <Divisor />
        <CustomRow margin="28px 0 28px 0">
          <Text type="subheading" bold color="gray6">
            NÍVEL DE RISCO
          </Text>
          <ButtonContainer>
            <ButtonTagStyled
              color={
                newFilters.byPerfilRisco.includes(FILTER_RISKS[1])
                  ? 'primary'
                  : ''
              }
              onClick={() => {
                handleAddRiskFilter(FILTER_RISKS[1])
              }}
            >
              BAIXO
            </ButtonTagStyled>
            <ButtonTagStyled
              color={
                newFilters.byPerfilRisco.includes(FILTER_RISKS[2])
                  ? 'primary'
                  : ''
              }
              onClick={() => {
                handleAddRiskFilter(FILTER_RISKS[2])
              }}
            >
              MÉDIO-BAIXO
            </ButtonTagStyled>
            <ButtonTagStyled
              color={
                newFilters.byPerfilRisco.includes(FILTER_RISKS[3])
                  ? 'primary'
                  : ''
              }
              onClick={() => {
                handleAddRiskFilter(FILTER_RISKS[3])
              }}
            >
              MÉDIO
            </ButtonTagStyled>
            <ButtonTagStyled
              color={
                newFilters.byPerfilRisco.includes(FILTER_RISKS[4])
                  ? 'primary'
                  : ''
              }
              onClick={() => {
                handleAddRiskFilter(FILTER_RISKS[4])
              }}
            >
              MÉDIO-ALTO
            </ButtonTagStyled>
            <ButtonTagStyled
              color={
                newFilters.byPerfilRisco.includes(FILTER_RISKS[5])
                  ? 'primary'
                  : ''
              }
              onClick={() => {
                handleAddRiskFilter(FILTER_RISKS[5])
              }}
            >
              ALTO
            </ButtonTagStyled>
          </ButtonContainer>
        </CustomRow>
      </FilterDrawerBody>
    </Drawer>
  )
}

const DrawerHeader = (handleCloseFilters: () => void) => (
  <FilterDrawerHeader>
    <PrevButton
      data-gtm-subname="drawer filtros"
      data-gtm-name="botao fechar drawer filtros"
      data-gtm-type="click"
      data-gtm-clicktype="button"
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
      onClick={() => handleCloseFilters()}
    />
  </FilterDrawerHeader>
)

const DrawerFooter = (
  submitNewFilters: () => void,
  handleRemoveFilters: () => void,
  applyButtonDisabled: boolean,
  cleanUpButtonDisabled: boolean
) => {
  return (
    <>
      <ButtonSubmit
        outline={!cleanUpButtonDisabled}
        onClick={() => handleRemoveFilters()}
        disabled={cleanUpButtonDisabled}
      >
        LIMPAR
      </ButtonSubmit>
      <ButtonSubmit
        color="secondary"
        onClick={() => submitNewFilters()}
        disabled={applyButtonDisabled}
      >
        APLICAR
      </ButtonSubmit>
    </>
  )
}

export default React.memo(DrawerFilter)
