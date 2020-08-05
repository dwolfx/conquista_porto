import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import moment from 'moment'

import Text from 'components/Text'
import VerticalListStyled from 'components/VerticalList'
import { useToast } from 'hooks/toast'
import { GetRedeemRequest } from 'store/modules/Investment/Redeem/action'
import { formatMoney } from 'helpers'

import { LoadingSpinner, IconRetry } from './styles'

interface IProps {
  idFundo: number
  isLoading: boolean
  hasError: boolean
}

const BaseAccountInfo = ({ idFundo, isLoading, hasError }: IProps) => {
  const dispatch = useDispatch()
  const { addToast } = useToast()

  const { redeemData } = useSelector((state: any) => ({
    redeemData: state.redeemData.data,
  }))

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
            dispatch(
              GetRedeemRequest({
                id_fundo: idFundo,
                data_operacao: moment(new Date()).format('YYYY-MM-DD'),
                onErrorToast: addToast,
              })
            )
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
            {redeemData &&
              formatMoney(
                redeemData.dados_para_resgate.posicao_cotista_fundo.saldo_atual
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
