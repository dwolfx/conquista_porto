import { Types } from './types'

const INITIAL_STATE = {
  status: '',
  data: [],
}

export default function(state = INITIAL_STATE, action) {
  let newData = []

  switch (action.type) {
    case Types.GET_DATA_SUCCESS:
      if (Array.isArray(action.payload.ProdutosVida.SeguroVida)) {
        newData = [...action.payload.ProdutosVida.SeguroVida]
      } else {
        newData.push(...action.payload.ProdutosVida.SeguroVida)
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
