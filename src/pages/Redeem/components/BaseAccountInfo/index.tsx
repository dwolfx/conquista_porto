import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import Text from 'components/Text'
import VerticalListStyled from 'components/VerticalList'
import useMedia from 'hooks/useMedia'

import { formatMoney } from 'helpers'
import { GetBankDataRequest } from 'store/modules/BankData/action'
import { GetPositionDataRequest } from 'store/modules/Investment/Position/action'

import { LoadingSpinner, IconRetry } from './styles'

interface IProps {
  idFundo: string
  isLoading: boolean
  hasError: boolean
}

const BaseAccountInfo = ({ idFundo, isLoading, hasError }: IProps) => {
  const dispatch = useDispatch()
  const isTabletOrSmaller = useMedia('md')

  const { investmentPosition, auth } = useSelector((state: any) => ({
    investmentPosition: state.investmentPosition,
    auth: state.auth,
  }))

  const dispatchPositionData = () => {
    if (!isTabletOrSmaller) {
      dispatch(GetPositionDataRequest(auth.cpf))
    }
  }

  const chosenInvestmentFund = () =>
    investmentPosition.data &&
    investmentPosition.data.length !== 0 &&
    investmentPosition.data[0].posicoes.posicao.find(
      (posicao: any) => posicao.fundo.id_carteira === idFundo
    )

  const fund: any = chosenInvestmentFund()
  let saldoAtual = ''
  if (fund) {
    saldoAtual = fund.saldo_atual
  }

  if (isLoading) {
    return (
      <>
        <Text type="headline" color="gray5">
          Buscando informações de saldo...
        </Text>
        <LoadingSpinner />
      </>
    )
  }

  if (hasError) {
    return (
      <>
        <Text type="headline" color="magenta2">
          Não foi possível carregar o saldo. Por favor, tente novamente.
        </Text>
        <IconRetry
          onClick={() => {
            dispatch(GetBankDataRequest(auth.cpf))
            dispatchPositionData()
          }}
        />
      </>
    )
  }

  return (
    <>
      <VerticalListStyled
        elements={[
          <Text type="captionUppercase" color="gray4" bold>
            fundo
          </Text>,
          <Text type="headline" color="gray6" bold>
            {formatMoney(
              investmentPosition.data && investmentPosition.data.length === 0
                ? 0
                : saldoAtual
            )}
          </Text>,
          <Text type="caption" color="gray5" bold>
            Saldo e rendimento bruto
          </Text>,
        ]}
      />
    </>
  )
}

export default BaseAccountInfo
