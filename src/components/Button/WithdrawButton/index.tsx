import React, { useEffect, useCallback, useState } from 'react'
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

  const { withdrawDetails, isLoading } = useSelector<any, any>(state => ({
    withdrawDetails: state.withdraw.detailsData,
    isLoading: state.withdraw.isLoadingDetails,
  }))

  const getAccountDetail = useCallback(() => {
    dispatch(
      GetWithdrawDetailsRequest({
        onSuccess: () => setButtonClicked(false),
        addToast,
      })
    )
  }, [dispatch, addToast])

  useEffect(() => {
    if (Object.entries(withdrawDetails).length && isButtonClicked) {
      if (withdrawDetails.fechado_retirada) {
        addToast({
          description: `Tente novamente amanhã a partir das ${moment(
            withdrawDetails.horario_inicio_permitido_retirada,
            'H:mm:ss'
          ).format('H:mm')}`,
          title: `Não é possivel fazer retirada após as ${moment(
            withdrawDetails.horario_fim_permitido_retirada,
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
  }, [withdrawDetails, addToast, history, isButtonClicked])

  const handleClick = () => {
    setButtonClicked(true)

    if (onClick) {
      onClick()
    }
    getAccountDetail()
  }

  return (
    <Button
      color="primary"
      outline
      loading={isLoading && isButtonClicked}
      loadingColor="blue4"
      disabled={disabled || (isLoading && isButtonClicked)}
      data-gtm-type="click"
      data-gtm-clicktype="button"
      data-gtm-subname={gtmSubname}
      data-gtm-name="retirar"
      onClick={() => handleClick()}
      {...rest}
    >
      retirar
    </Button>
  )
}

export default WithdrawButton
