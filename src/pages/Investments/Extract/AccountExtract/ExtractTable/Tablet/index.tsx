import React, { useState } from 'react'
import moment from 'moment'
import { Row } from 'styled-bootstrap-grid'

import VerticalList from 'components/VerticalList'
import Text from 'components/Text'
import Button from 'components/Button'
import Loading from 'components/Loading'

import { ITransaction } from '../../types'
import * as S from '../styles'
import { formatMoney } from 'helpers'
import { useDispatch } from 'react-redux'
import { GetBankExtractRequest } from 'store/modules/BankExtract/action'


interface IProps {
  extracts: ITransaction[]
  isLoading: boolean,
  hasError: boolean
  request: any
}
const ExtractTableMobile = ({ extracts, isLoading, hasError, request }: IProps) => {
  const [listSize, setListSize] = useState(8)
  const dispatch = useDispatch()

  if (isLoading) {
    return (
      <S.StyledErrorOrLoadingCard>
        <Loading type="bar" legend="Buscando informações dos fundos de investimento…" textAlign="center" />
      </S.StyledErrorOrLoadingCard>
    )
  }

  if (hasError) {
    return (
      <S.StyledErrorOrLoadingCard>
        <Text type="headline" color="magenta2" textAlign="center">
          Não foi possível carregar a lista de fundos. Por favor, tente novamente.
        </Text>
        <Button onClick={() => dispatch(GetBankExtractRequest(request))}>Tentar novamente</Button>
      </S.StyledErrorOrLoadingCard>
    )
  }

  if (extracts.length === 0) {
    return (
      <S.StyledErrorOrLoadingCard>
        <Text type="headline" color="gray5" textAlign="center">
          A sua conta de investimento não foi movimentada até o presente momento.
        </Text>
      </S.StyledErrorOrLoadingCard>
    )
  }

  return (
    <S.StyledContainer>
      <Row>
        {extracts.slice(0, listSize).map((extract, index) => (
          <S.StyledCol sm={6} key={`extract-${index}`}>
            <S.StyledCard
              data-testid="table-account-extract"
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
          </S.StyledCol>
        ))}
      </Row>
      {listSize < extracts.length &&
        <S.ButtonWrapper data-testid="button-wrapper">
          <Button
            outline
            data-gtm-subname="carregar mais"
            data-gtm-name="carregar mais"
            data-gtm-type="click"
            data-gtm-clicktype="button"
            color="primary"
            onClick={() => setListSize(listSize + 8)}
          >
            Carregar mais
        </Button>
        </S.ButtonWrapper>
      }
    </S.StyledContainer>
  )
}

export default ExtractTableMobile
