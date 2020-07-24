import React, { useEffect, useCallback } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { GetWithdrawDetailsRequest } from 'store/modules/Withdraw/actions'

import Button from 'components/Button'

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

  const { id_cotista, withdrawClosed, hasError, isLoading } = useSelector<
    any,
    any
  >(state => ({
    id_cotista: state.suitabilityInfo.data?.id_cotista,
    withdrawClosed: state.withdraw.detailsData?.fechado_retirada,
    hasError: state.withdraw.hasErrorDetails,
    isLoading: state.withdraw.isLoadingDetails,
  }))

  const getAccountDetail = useCallback(() => {
    if (id_cotista && !withdrawClosed) {
      dispatch(GetWithdrawDetailsRequest({}))
    }
  }, [dispatch, id_cotista, withdrawClosed])

  useEffect(() => {
    if (!withdrawClosed && !isLoading && !hasError) {
      getAccountDetail()
    }
  }, [getAccountDetail, withdrawClosed, isLoading, hasError])

  const handleClick = () => {
    if (onClick) {
      onClick()
    }
    getAccountDetail()
  }

  return (
    <Button
      color="primary"
      outline
      loading={loading}
      loadingColor="blue4"
      disabled={disabled ? disabled || withdrawClosed : withdrawClosed}
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
