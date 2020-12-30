import React, { useState, useEffect, useCallback } from 'react'
import { uuid } from 'uuidv4'
import VerticalList from 'components/VerticalList'
import Text from 'components/Text'
import Button from 'components/Button'
import Loading from 'components/Loading'

import { formatMoney } from 'helpers'

import { IFundExtract } from 'store/modules/ObjectiveManagement/types'
import * as S from '../styles'

interface IProps {
  extractFund: IFundExtract[]
  isLoading?: boolean
  hasError?: boolean
  request: () => void
}
const ExtractTableMobile = ({
  extractFund,
  isLoading,
  hasError,
  request,
}: IProps) => {
  const [listSize, setListSize] = useState(8)
  const [buttonShouldAppear, setButtonShouldAppear] = useState(true)

  const handleOnClick = useCallback(() => {
    setButtonShouldAppear(false)
    setListSize(listSize + 8)
  }, [listSize])

  useEffect(() => {
    setButtonShouldAppear(true)
  }, [handleOnClick])

  if (isLoading) {
    return (
      <S.StyledErrorOrLoadingCard>
        <Loading
          type="bar"
          legend="Buscando informações do extrato…"
          textAlign="center"
        />
      </S.StyledErrorOrLoadingCard>
    )
  }

  if (hasError) {
    return (
      <S.StyledErrorOrLoadingCard>
        <Text type="headline" color="magenta2" textAlign="center">
          Não foi possível carregar a lista de fundos. Por favor, tente
          novamente.
        </Text>
        <Button onClick={() => request}>Tentar novamente</Button>
      </S.StyledErrorOrLoadingCard>
    )
  }

  if (extractFund.length === 0) {
    return (
      <S.StyledErrorOrLoadingCard>
        <Text type="headline" color="gray5" textAlign="center">
          Não há movimentações com essas especificações
        </Text>
      </S.StyledErrorOrLoadingCard>
    )
  }

  return (
    <>
      {extractFund.slice(0, listSize).map((extract, index, array) => (
        <S.StyledCard data-testid="table-account-extract" key={uuid()}>
          <VerticalList
            elements={[
              <S.StyledHorizontalList
                startItems={[
                  <Text bold type="body" color="gray5">
                    Data da transação
                  </Text>,
                ]}
                endItems={[
                  <Text bold type="title">
                    {extract.transaction_date}
                  </Text>,
                ]}
              />,
              <S.StyledHorizontalList
                startItems={[
                  <Text bold type="body" color="gray5">
                    Tipo
                  </Text>,
                ]}
                endItems={[
                  <Text bold type="title">
                    {extract.transaction_type}
                  </Text>,
                ]}
              />,
              <S.StyledHorizontalList
                startItems={[
                  <Text bold type="body" color="gray5">
                    Valor
                  </Text>,
                ]}
                endItems={[
                  <Text bold type="title">
                    {formatMoney(extract.value)}
                  </Text>,
                ]}
              />,
              <S.StyledHorizontalList
                startItems={[
                  <Text bold type="body" color="gray5">
                    Status
                  </Text>,
                ]}
                endItems={[
                  <Text bold type="title">
                    {extract.transaction_status}
                  </Text>,
                ]}
              />,
              <S.StyledHorizontalList
                startItems={[
                  <Text bold type="body" color="gray5">
                    Data da efetivação
                  </Text>,
                ]}
                endItems={[
                  <Text bold type="title">
                    {extract.processed_transaction_date}
                  </Text>,
                ]}
              />,
            ]}
          />
        </S.StyledCard>
      ))}
      {listSize < extractFund.length && buttonShouldAppear && (
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
      )}
    </>
  )
}

export default ExtractTableMobile
