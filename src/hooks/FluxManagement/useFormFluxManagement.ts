import { useCallback } from 'react'
import { useSelector, useDispatch } from 'react-redux'

import { UpdateFormFluxManagementStack } from 'store/modules/FluxManagement/actions'

export interface IUseFormFluxManagement<T> {
  form: T
  updateForm(updatedKeys: T): void
}

export default function useFormFluxManagement<T>() {
  const form: T = useSelector((state: any) => state.fluxManagement.form)
  const dispatch = useDispatch()

  const updateForm = useCallback(
    (updatedKeys: T) => {
      dispatch(UpdateFormFluxManagementStack(updatedKeys))
    },
    [dispatch]
  )

  return { form, updateForm }
}
