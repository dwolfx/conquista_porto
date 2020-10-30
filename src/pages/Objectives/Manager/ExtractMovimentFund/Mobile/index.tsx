import React, { useState, useEffect, useCallback } from 'react'
import { useDispatch } from 'react-redux'
import moment from 'moment'

import VerticalList from 'components/VerticalList'
import Text from 'components/Text'
import Button from 'components/Button'
import Loading from 'components/Loading'

import { formatMoney } from 'helpers'

import { GetObjectiveManagementExtractFundRequest } from 'store/modules/ObjectiveManagement/action'

import { IFundExtract } from 'store/modules/ObjectiveManagement/types'
import * as S from './styles'

interface IProps {
  extractFund: IFundExtract[]
  isLoading?: boolean
  hasError?: boolean
  request: any
  filters: any
  handleFilters: any
  interval: any
  selectedInterval: any
  handleSelectInterval: any
  handleInterval: any
  handleClearFilters: any
}
const ExtractTableMobile = ({
  extractFund,
  isLoading,
  hasError,
  filters,
  handleFilters,
  interval,
  selectedInterval,
  handleSelectInterval,
  handleInterval,
  handleClearFilters,
  request,
}: //   objectiveId,
//   fundId,
IProps) => {
  const [listSize, setListSize] = useState(8)
  const [buttonShouldAppear, setButtonShouldAppear] = useState(true)
  const dispatch = useDispatch()

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
          A sua conta de investimento não foi movimentada até o presente
          momento.
        </Text>
      </S.StyledErrorOrLoadingCard>
    )
  }

  return (
    <>
      {extractFund.slice(0, listSize).map((extract, index, array) => (
        <S.StyledCard
          data-testid="table-account-extract"
          key={`extract-${index}`}
        >
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
