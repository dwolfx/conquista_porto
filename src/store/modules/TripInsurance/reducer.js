import { Types } from './types'

const INITIAL_STATE = {
  status: '',
  data: [],
}

export default function(state = INITIAL_STATE, action) {
  let newData = []

  switch (action.type) {
    case Types.GET_DATA_SUCCESS:
      if (Array.isArray(action.payload.ProdutosViagem.Viagem)) {
        newData = [...action.payload.ProdutosViagem.Viagem]
      } else {
        newData.push(...action.payload.ProdutosViagem.Viagem)
      }

      return {
        ...state,
        status: 'loaded',
        data: [...newData],
      }
    case Types.GET_DATA_FAILURE:
      return {
        ...state,
      }
    default:
      return state
  }
}
