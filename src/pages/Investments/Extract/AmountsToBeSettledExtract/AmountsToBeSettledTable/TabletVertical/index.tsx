import React, { useState } from 'react'
import moment from 'moment'
import { Row } from 'styled-bootstrap-grid'

import VerticalList from 'components/VerticalList'
import Text from 'components/Text'
import Button from 'components/Button'
import Loading from 'components/Loading'

import { ITransaction } from '../../types'
import * as s from '../styles'
import { formatMoney } from 'helpers'
import { useDispatch } from 'react-redux'
// atualizar quando existir informações sobre o serviço de Saldo a liquidar
import { GetBankExtractRequest } from 'store/modules/BankExtract/action'

interface IProps {
  extracts: ITransaction[]
  isLoading: boolean
  hasError: boolean
  request: any
}
const AmountsToBeSettledTableMobile = ({
  extracts,
  isLoading,
  hasError,
  request,
}: IProps) => {
  const [listSize, setListSize] = useState(8)
  const dispatch = useDispatch()

  if (isLoading) {
    return (
      <s.StyledErrorOrLoadingCard>
        <Loading
          type="bar"
          legend="Buscando informações dos saldos a liquidar…"
          textAlign="center"
        />
      </s.StyledErrorOrLoadingCard>
    )
  }

  if (hasError) {
    return (
      <s.StyledErrorOrLoadingCard>
        <Text type="headline" color="magenta2" textAlign="center">
          Não foi possível carregar a lista de valores a liquidar. Por favor,
          tente novamente.
        </Text>
        {/* atualizar quando existir informações sobre o serviço de Saldo a liquidar */}
        <Button onClick={() => dispatch(GetBankExtractRequest(request))}>
          Tentar novamente
        </Button>
      </s.StyledErrorOrLoadingCard>
    )
  }

  if (extracts.length === 0) {
    return (
      <s.StyledErrorOrLoadingCard>
        <Text type="headline" color="gray5" textAlign="center">
          Não existem valores a liquidar até o presente momento.
        </Text>
      </s.StyledErrorOrLoadingCard>
    )
  }

  return (
    <s.StyledContainer>
      <Row>
        {extracts.slice(0, listSize).map((extract, index) => (
          <s.StyledCol sm={6} key={`extract-${index}`}>
            <s.StyledCard data-testid="table-account-extract">
              <VerticalList
                elements={[
                  <s.StyledHorizontalList
                    startItems={[
                      <Text bold type="body" color="gray5">
                        Data da transação
                      </Text>,
                    ]}
                    endItems={[
                      <Text bold type="title">
                        {moment(extract.data).format('DD/MM/YYYY')}
                      </Text>,
                    ]}
                  />,
                  <s.StyledHorizontalList
                    startItems={[
                      <Text bold type="body" color="gray5">
                        Fundo
                      </Text>,
                    ]}
                    endItems={[
                      <Text bold type="title">
                        {extract.tipo}
                      </Text>,
                    ]}
                  />,
                  <s.StyledHorizontalList
                    startItems={[
                      <Text bold type="body" color="gray5">
                        Tipo
                      </Text>,
                    ]}
                    endItems={[
                      <Text bold type="title">
                        {extract.tipo}
                      </Text>,
                    ]}
                  />,
                  <s.StyledHorizontalList
                    startItems={[
                      <Text bold type="body" color="gray5">
                        Valor
                      </Text>,
                    ]}
                    endItems={[
                      <Text bold type="title">
                        {formatMoney(extract.valor)}
                      </Text>,
                    ]}
                  />,
                ]}
              />
            </s.StyledCard>
          </s.StyledCol>
        ))}
      </Row>
      {listSize < extracts.length && (
        <s.ButtonWrapper data-testid="button-wrapper">
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
        </s.ButtonWrapper>
      )}
    </s.StyledContainer>
  )
}

export default AmountsToBeSettledTableMobile
