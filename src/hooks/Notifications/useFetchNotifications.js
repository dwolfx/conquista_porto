import { useEffect } from 'react'
import { useDispatch } from 'react-redux'

import { GetDataRequest } from 'store/modules/Notifications/action'

export default function useFetchNotifications() {
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(GetDataRequest())
  }, [dispatch])
}
