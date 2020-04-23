import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { GetPointsBalanceRequest } from 'store/modules/Points/action'

export default function usePointsBalance() {
  const dispatch = useDispatch()
  const authCPF = useSelector(state => state.auth.cpf)

  useEffect(() => {
    dispatch(GetPointsBalanceRequest(authCPF))
  }, [dispatch, authCPF])
}
