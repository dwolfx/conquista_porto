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
              legend="Aguarde enquanto buscamos informações de fundos de investimentos..."
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
              Não foi possível carregar suas informações de fundos de
              investimentos.
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
                ? 'No momento, não temos fundos com essas especificações.'
                : 'No momento não possuímos nenhum fundo de investimento em nossa plataforma.'}
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
