import React, { useState, useEffect, useCallback } from 'react'
import moment from 'moment'

import VerticalList from 'components/VerticalList'
import Text from 'components/Text'
import Button from 'components/Button'
import Loading from 'components/Loading'

import * as S from '../styles'
import { formatMoney } from 'helpers'
import { useDispatch } from 'react-redux'
import { GetBankExtractRequest } from 'store/modules/BankExtract/action'
import { ITransaction } from 'pages/Investments/Extract/AccountExtract/types'

interface IProps {
  extracts: ITransaction[]
  isLoading: boolean,
  hasError: boolean
  request: any
}
const ExtractTableMobile = ({ extracts, isLoading, hasError, request }: IProps) => {
  const [listSize, setListSize] = useState(8)
  const [buttonShouldAppear, setButtonShouldAppear] = useState(true)
  const dispatch = useDispatch()

  const handleOnClick = useCallback(() => {
    setButtonShouldAppear(false)
    setListSize(listSize + 8)
  }, [listSize])

  useEffect(() => {
    setButtonShouldAppear(true)
  }, [handleOnClick]);

  if(isLoading) {
    return (
      <S.StyledErrorOrLoadingCard>
        <Loading type="bar" legend="Buscando informações dos fundos de investimento…" textAlign="center"/>
      </S.StyledErrorOrLoadingCard>
    )
  }

  if(hasError) {
    return (
      <S.StyledErrorOrLoadingCard>
        <Text type="headline" color="magenta2" textAlign="center">
          Não foi possível carregar a lista de fundos. Por favor, tente novamente.
        </Text>
        <Button onClick={() => dispatch(GetBankExtractRequest(request))}>Tentar novamente</Button>
      </S.StyledErrorOrLoadingCard>
    )
  }

  if(extracts.length === 0) {
    return (
      <S.StyledErrorOrLoadingCard>
        <Text type="headline" color="gray5" textAlign="center">
          A sua conta de investimento não foi movimentada até o presente momento.
        </Text>
      </S.StyledErrorOrLoadingCard>
    )
  }

  return (
    <>
      {extracts.slice(0, listSize).map((extract, index, array) => (
          <S.StyledCard
            data-testid="table-account-extract"
            key={`extract-${index}`}
          >
            <VerticalList
              elements={[
                <S.StyledHorizontalList
                  startItems={[
                    <Text bold type="body" color="gray5">Data da transação</Text>
                  ]}
                  endItems={[
                    <Text bold type="title">{moment(extract.data).format('DD/MM/YYYY')}</Text>
                  ]}
                />,
                <S.StyledHorizontalList
                  startItems={[
                    <Text bold type="body" color="gray5">Tipo</Text>
                  ]}
                  endItems={[
                    <Text bold type="title">{extract.tipo}</Text>
                  ]}
                />,
                <S.StyledHorizontalList
                  startItems={[
                    <Text bold type="body" color="gray5">Valor</Text>
                  ]}
                  endItems={[
                    <Text bold type="title">{formatMoney(extract.valor)}</Text>
                  ]}
                />
              ]}
            />
          </S.StyledCard>
      ))}
      {listSize < extracts.length && buttonShouldAppear &&
      <S.ButtonWrapper data-testid="button-wrapper">
        <Button
            outline
            data-gtm-subname="carregar mais"
            data-gtm-name="carregar mais"
            data-gtm-type="click"
            data-gtm-clicktype="button"
            color="primary"
            onClick={handleOnClick}
          >
            Carregar mais
        </Button>
      </S.ButtonWrapper>
    }
  </>
  )
}

export default ExtractTableMobile
