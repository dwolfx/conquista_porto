import { Types } from './types'

const INITIAL_STATE: { stack: React.ReactElement[], form: {} } = {
  stack: [],
  form: {
    counter: ''
  },
}

export default function (state = INITIAL_STATE, action: any) {
  switch (action.type) {
    case Types.FLUX_MANAGEMENT_ADD_TO_STACK:
      return {
        ...state,
        stack: [...state.stack, action.element]
      }

    case Types.FLUX_MANAGEMENT_POP_FROM_STACK:
      const newState = state.stack
      newState.pop()

      return {
        ...state,
        stack: newState
      }

    case Types.FLUX_MANAGEMENT_UPDATE_FORM:
      const { updatedKeys } = action

      return {
        ...state,
        form: {
          ...state.form,
          ...updatedKeys
        }
      }

    case Types.FLUX_MANAGEMENT_RESET_FLUX:
      return {
        ...state,
        ...INITIAL_STATE
      }

    default:
      return state
  }
}
