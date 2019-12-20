import produce from 'immer'

const INITIAL_STATE = {
  dataExample: [],
}

export default function example(state = INITIAL_STATE, action) {
  switch (action.type) {
    case '@example/ADD_SUCCESS':
      return produce(state, draft => {
        draft.dataExample.push('something')
      })
    case '@example/ADD_FAILURE':
      return produce(state, draft => {
        draft.dataExample.push('something')
        console.log('fail')
      })
    default:
      return state
  }
}
