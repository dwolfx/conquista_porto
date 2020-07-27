import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'
import moment from 'moment'

import Button from 'components/Button'
import { useToast } from 'hooks/toast'
import { GetWithdrawDetailsRequest } from 'store/modules/Withdraw/actions'

interface IProps {
  loading?: boolean
  onClick?: () => void
  disabled?: boolean
  gtmSubname: string
}

const WithdrawButton: React.FC<IProps> = ({
  loading = false,
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

    if (onClick) {
      onClick()
    }
  }

  return (
    <Button
      color="primary"
      outline
      loading={isLoading && isButtonClicked}
      loadingColor="blue4"
      disabled={
        disabled || (isLoading && isButtonClicked) || +availableBalance === 0
      }
      data-gtm-type="click"
      data-gtm-clicktype="button"
      data-gtm-subname={gtmSubname}
      data-gtm-name="retirar"
      onClick={handleClick}
      title={
        +availableBalance === 0 ? `Saldo indisponível` : 'clique para retirar'
      }
      data-testid="retirar"
      {...rest}
    >
      retirar
    </Button>
  )
}

export default WithdrawButton
