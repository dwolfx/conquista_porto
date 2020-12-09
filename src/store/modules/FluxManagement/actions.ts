import { Types } from './types'

export function AddElementFluxManagementStack<T>(element: React.ReactElement<T>) {
  return {
    type: Types.FLUX_MANAGEMENT_ADD_TO_STACK,
    element,
  }
}

export function PopElementFluxManagementStack() {
  return {
    type: Types.FLUX_MANAGEMENT_POP_FROM_STACK,
  }
}

export function UpdateFormFluxManagementStack<T>(updatedKeys: T) {
  return {
    type: Types.FLUX_MANAGEMENT_UPDATE_FORM,
    updatedKeys
  }
}

export function ResetFluxManagement() {
  return {
    type: Types.FLUX_MANAGEMENT_RESET_FLUX,
  }
}
