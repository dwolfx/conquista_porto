export function exampleActionAddRequest(payload) {
  return {
    type: '@example/ADD_REQUEST',
    payload
  }
}

export function exampleActionAddSuccess(payload) {
  return {
    type: '@example/ADD_SUCCESS',
    payload
  }
}

export function exampleActionAddFailure() {
  return {
    type: '@example/ADD_FAILURE'
  }
}
