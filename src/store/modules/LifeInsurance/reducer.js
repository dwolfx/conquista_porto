import { Types } from './types'

const INITIAL_STATE = {
  status: '',
  data: null,
}

export default function(state = INITIAL_STATE, action) {
  let newData

  switch (action.type) {
    case Types.GET_DATA_SUCCESS:
      newData = [action.payload.ProdutosVida.SeguroVida].flatMap(
        product => product
      )

      return {
        ...state,
        status: 'loaded',
        data: [...newData],
      }
    case Types.GET_DATA_FAILURE:
      return {
        ...state,
        data: [],
      }
    default:
      return state
  }
}
