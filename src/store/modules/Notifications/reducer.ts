import { Types } from './types'

const INITIAL_STATE = {
  data: {
    novas: [],
    anteriores: [],
  },
}

export default function(state = INITIAL_STATE, action: any) {
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
        (item: any) => item.idNotificacao === payload.idNotificacao
      )
      if (indexItemToBeUpdated >= 0) {
        const newNovasState = [...state.data.novas] as any
        newNovasState.splice(indexItemToBeUpdated, 1, {
          ...newNovasState[indexItemToBeUpdated],
          lida: true,
        })
        return {
          ...state,
          data: {
            anteriores: [...state.data.anteriores],
            novas: [...newNovasState],
          },
        }
      }
      indexItemToBeUpdated = state.data.anteriores.findIndex(
        (item: any) => item.idNotificacao === payload.idNotificacao
      )

      const newAnterioresState = [...state.data.anteriores] as any
      newAnterioresState.splice(indexItemToBeUpdated, 1, {
        ...newAnterioresState[indexItemToBeUpdated],
        lida: true,
      })

      return {
        ...state,
        data: {
          anteriores: [...newAnterioresState],
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
