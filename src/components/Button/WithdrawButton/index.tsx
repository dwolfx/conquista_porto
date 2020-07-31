import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'
import moment from 'moment'

import Button from 'components/Button'
import { formatLocaleStringToNumber } from 'helpers'
import { useToast } from 'hooks/toast'
import { GetWithdrawDetailsRequest } from 'store/modules/Withdraw/actions'

import * as s from './styles'

interface IProps {
  loading?: boolean
  onClickSetLoading?: (state: boolean) => void
  onClick?: () => void
  disabled?: boolean
  gtmSubname: string
}

const WithdrawButton: React.FC<IProps> = ({
  loading = false,
  onClickSetLoading,
  onClick,
  disabled = false,
  gtmSubname,
  ...rest
}) => {
  const dispatch = useDispatch()
  const history = useHistory()
  const { addToast } = useToast()

  const [isButtonClicked, setButtonClicked] = useState(false)

  const { isLoading, availableBalance } = useSelector<any, any>(state => ({
    isLoading: state.withdraw.isLoadingDetails,
    availableBalance:
      state.bankData.data?.DadosContaPortoSeguro?.saldo_disponivel,
  }))

  const handleClick = () => {
    setButtonClicked(true)

    dispatch(
      GetWithdrawDetailsRequest({
        onSuccess: withdrawData => {
          if (Object.entries(withdrawData).length) {
            if (withdrawData.fechado_retirada) {
              addToast({
                description: `Tente novamente amanhã a partir das ${moment(
                  withdrawData.horario_inicio_permitido_retirada,
                  'H:mm:ss'
                ).format('H:mm')}`,
                title: `Não é possivel fazer retirada após as ${moment(
                  withdrawData.horario_fim_permitido_retirada,
                  'H:mm:ss'
                ).format('H:mm')}`,
                type: 'error',
              })
            } else {
              history.push({
                pathname: '/conta/retirar',
                state: {
                  accessFromButton: true,
                },
              })
            }
          }

          setButtonClicked(false)
        },
        addToast,
      })
    )

    if (onClickSetLoading) {
      onClickSetLoading(true)
    }

    if (onClick) {
      onClick()
    }
  }

  const ButtonComponent = () => (
    <Button
      color="primary"
      outline
      loading={isLoading && (isButtonClicked || loading)}
      loadingColor="blue4"
      disabled={
        disabled ||
        (isLoading && isButtonClicked) ||
        !formatLocaleStringToNumber(availableBalance || '0')
      }
      data-gtm-type="click"
      data-gtm-clicktype="button"
      data-gtm-subname={gtmSubname}
      data-gtm-name="retirar"
      onClick={handleClick}
      data-testid="retirar"
      {...rest}
    >
      retirar
    </Button>
  )

  return formatLocaleStringToNumber(availableBalance || '0') ? (
    <ButtonComponent />
  ) : (
    <s.Popover content="Saldo indisponível" tooltip placement="top">
      <ButtonComponent />
    </s.Popover>
  )
}

export default WithdrawButton
