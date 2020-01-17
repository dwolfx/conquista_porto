import { Types } from './types'

const INITIAL_STATE = {
  data: {
    novas: [],
    anteriores: [],
  },
}

export default function(state = INITIAL_STATE, action) {
  switch (action.type) {
    case Types.GET_DATA_SUCCESS:
      return {
        ...state,
        data: {
          ...state.data,
          novas: [...action.payload.novas],
          anteriores: [...action.payload.anteriores],
        },
      }
    case Types.SEND_NOTIFICATION_READ_SUCCESS: {
      const { payload } = action
      let indexItemToBeUpdated = null
      indexItemToBeUpdated = state.data.novas.findIndex(
        item => item.idNotificacao === payload.idNotificacao
      )
      if (indexItemToBeUpdated >= 0) {
        const newState = [...state.data.novas]
        newState.splice(indexItemToBeUpdated, 1, {
          ...state.data.novas[indexItemToBeUpdated],
          lida: true,
        })
        return {
          ...state,
          data: {
            anteriores: [...state.data.anteriores],
            novas: [...newState],
          },
        }
      }
      indexItemToBeUpdated = state.data.anteriores.findIndex(
        item => item.idNotificacao === payload.idNotificacao
      )

      const newState = [...state.data.anteriores]
      newState.splice(indexItemToBeUpdated, 1, {
        ...state.data.anteriores[indexItemToBeUpdated],
        lida: true,
      })

      return {
        ...state,
        data: {
          anteriores: [...newState],
          novas: [...state.data.novas],
        },
      }
    }
    case Types.GET_DATA_FAILURE:
      return {
        ...state,
      }
    default:
      return state
  }
}
