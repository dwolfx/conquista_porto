import { all, takeLatest } from 'redux-saga/effects'
// import { all, put, takeLatest } from 'redux-saga/effects'

// import { exampleActionAddSuccess, exampleActionAddFailure } from './action'

function* example() {
  // function* example({ payload }) {
  // doSomething with payload;
  // newPayload = payload + something;
  // yield put(exampleActionAddSuccess(newPayload));
}

export default all([takeLatest('@example/ADD_REQUEST', example)])
