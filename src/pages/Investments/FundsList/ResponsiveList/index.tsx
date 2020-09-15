import React, { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux'

import FundCard from './FundCard'
import Loading from 'components/Loading'
import Button from 'components/Button'
import Divisor from 'components/Divisor'
import ButtonLink from 'components/Button/Link'
import Text from 'components/Text'

import {
  EmptyDataText,
  ErrorText,
  FiltersInfo,
  FiltersInfoContainer,
  ListWrapper,
  WrapperContent,
} from './styles'

import { IFund } from '../Filter/useFilter'
import { GetInvestmentListRequest } from 'store/modules/Investment/action'

interface IFilterInformation {
  filtersCount: number
  isFiltersBarHidden: boolean
  handleCleanUpButtonClick(): void
  setIsFiltersBarHidden(hidden: boolean): void
}

const FilterInformation: React.FC<IFilterInformation> = ({
  filtersCount,
  isFiltersBarHidden,
  handleCleanUpButtonClick,
  setIsFiltersBarHidden,
}) => {
  filtersCount <= 0 && setIsFiltersBarHidden(true)

  return (
    <FiltersInfoContainer hidden={isFiltersBarHidden}>
      <FiltersInfo>
        <Text type="subheading" color="gray5">
          {filtersCount === 1 && '1 FILTRO ATIVO'}
          {filtersCount > 1 && `${filtersCount} FILTROS ATIVOS`}
        </Text>
        <ButtonLink
          data-gtm-type="click"
          data-gtm-clicktype="button"
          data-gtm-name="limpar"
          noIcon
          onClick={() => {
            handleCleanUpButtonClick()
          }}
        >
          LIMPAR
        </ButtonLink>
      </FiltersInfo>
      <Divisor />
    </FiltersInfoContainer>
  )
}

interface IResponsiveListProps {
  onChangeIsFundDetailOpen: (prevState: Function) => boolean
  handleLayerOpen: (fundId: number) => void
  data: Array<IFund>
  isLoading: boolean
  isError: boolean
  setTitle: (title: string) => void
  setCategory: (title: string) => void
  setIsOpenForInvestments: () => boolean
  filtersCount: number
  handleCleanFilterAndSort: () => void
}

const ResponsiveList: React.FC<IResponsiveListProps> = ({
  onChangeIsFundDetailOpen,
  handleLayerOpen,
  data,
  isLoading,
  isError,
  setTitle,
  setCategory,
  setIsOpenForInvestments,
  filtersCount,
  handleCleanFilterAndSort,
}) => {
  const [isFiltersBarHidden, setIsFiltersBarHidden] = useState(true)

  const handleCleanUpButtonClick = () => {
    handleCleanFilterAndSort()
    setIsFiltersBarHidden(true)
  }

  const dispatch = useDispatch()

  useEffect(() => {
    filtersCount > 0 && setIsFiltersBarHidden(false)
  }, [filtersCount])

  const ResponsiveListRender = () => {
    if (isLoading) {
      return (
        <ListWrapper>
          <WrapperContent>
            <Loading
              type="bar"
              legend="Buscando informações dos fundos de investimentos…"
            />
          </WrapperContent>
        </ListWrapper>
      )
    }

    if (isError) {
      return (
        <ListWrapper>
          <WrapperContent errorType>
            <ErrorText>
              Não foi possível carregar a lista de fundos. Por favor, tente
              novamente.
            </ErrorText>
            <Button onClick={() => dispatch(GetInvestmentListRequest())}>
              Tentar novamente
            </Button>
          </WrapperContent>
        </ListWrapper>
      )
    }

    if (filtersCount <= 0 && (!data || data.length === 0)) {
      return (
        <ListWrapper>
          <WrapperContent>
            <EmptyDataText>
              No momento não possuímos nenhum fundo de investimento em nossa
              plataforma.
            </EmptyDataText>
          </WrapperContent>
        </ListWrapper>
      )
    }

    if (filtersCount > 0 && (!data || data.length === 0)) {
      return (
        <>
          <FilterInformation
            filtersCount={filtersCount}
            isFiltersBarHidden={isFiltersBarHidden}
            handleCleanUpButtonClick={handleCleanUpButtonClick}
            setIsFiltersBarHidden={setIsFiltersBarHidden}
          />
          <ListWrapper marginTop>
            <WrapperContent hasFilterInfo>
              <EmptyDataText>
                No momento, não temos fundos com essas especificações.
              </EmptyDataText>
            </WrapperContent>
          </ListWrapper>
        </>
      )
    }

    return (
      <>
        <FilterInformation
          filtersCount={filtersCount}
          isFiltersBarHidden={isFiltersBarHidden}
          handleCleanUpButtonClick={handleCleanUpButtonClick}
          setIsFiltersBarHidden={setIsFiltersBarHidden}
        />
        <ListWrapper marginTop={!isFiltersBarHidden}>
          {data.map(fund => {
            return (
              <FundCard
                onChangeIsFundDetailOpen={onChangeIsFundDetailOpen}
                handleLayerOpen={handleLayerOpen}
                key={fund.id_carteira}
                fund={fund}
                setTitle={setTitle}
                setCategory={setCategory}
                setIsOpenForInvestments={setIsOpenForInvestments}
              />
            )
          })}
        </ListWrapper>
      </>
    )
  }
  return ResponsiveListRender()
}

export default React.memo(ResponsiveList)
