import React from 'react'

import FundCard, { IFund } from './FundCard'
import Loading from 'components/Loading'
import Button from 'components/Button'

import { ListWrapper, EmptyDataText, ErrorText, WrapperContent } from './styles'

import { useDispatch } from 'react-redux'
import { GetInvestmentListRequest } from 'store/modules/Investment/action'

interface IResponsiveListProps {
  data: Array<IFund>
  isLoading: boolean
  isError: boolean
  isFiltering: boolean
}

const ResponsiveList: React.FC<IResponsiveListProps> = ({
  data,
  isLoading,
  isError,
  isFiltering,
}) => {
  const dispatch = useDispatch()
  const ResponsiveListRender = () => {
    if (isLoading) {
      return (
        <ListWrapper>
          <WrapperContent>
            <Loading
              type="bar"
              legend="Buscando informações dos fundos de investimento…"
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

    if (!data || data.length === 0) {
      return (
        <ListWrapper>
          <WrapperContent>
            <EmptyDataText>
              {isFiltering
                ? 'Nenhum fundo de investimento encontrado com os filtros selecionados.'
                : 'No momento, não temos fundos com essas especificações.'}
            </EmptyDataText>
          </WrapperContent>
        </ListWrapper>
      )
    }
    return (
      <ListWrapper>
        {data.map(fund => (
          <FundCard key={fund.id_fundo} fund={fund} />
        ))}
      </ListWrapper>
    )
  }
  return ResponsiveListRender()
}

export default ResponsiveList
