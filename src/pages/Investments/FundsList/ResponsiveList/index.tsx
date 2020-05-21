import React from 'react'
import { useDispatch } from 'react-redux'

import FundCard from './FundCard'
import Loading from 'components/Loading'
import Button from 'components/Button'

import { ListWrapper, EmptyDataText, ErrorText, WrapperContent } from './styles'

import { IFund } from '../Filter/useFilter'
import { GetInvestmentListRequest } from 'store/modules/Investment/action'

interface IResponsiveListProps {
  onChangeIsFundDetailOpen: (prevState: Function) => boolean
  handleLayerOpen: (fundId: string) => void
  data: Array<IFund>
  isLoading: boolean
  isError: boolean
  setTitle: (title: string) => void
  setIsOpenForInvestments: () => boolean
}

const ResponsiveList: React.FC<IResponsiveListProps> = ({
  onChangeIsFundDetailOpen,
  handleLayerOpen,
  data,
  isLoading,
  isError,
  setTitle,
  setIsOpenForInvestments,
}) => {
  const dispatch = useDispatch()

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

    if (!data || data.length === 0) {
      return (
        <ListWrapper>
          <WrapperContent>
            <EmptyDataText>
              No momento, não temos fundos com essas especificações.
            </EmptyDataText>
          </WrapperContent>
        </ListWrapper>
      )
    }
    return (
      <ListWrapper>
        {data.map(fund => {
          return (
            <FundCard
              onChangeIsFundDetailOpen={onChangeIsFundDetailOpen}
              handleLayerOpen={handleLayerOpen}
              key={fund.id_fundo}
              fund={fund}
              setTitle={setTitle}
              setIsOpenForInvestments={setIsOpenForInvestments}
            />
          )
        })}
      </ListWrapper>
    )
  }
  return ResponsiveListRender()
}

export default ResponsiveList
