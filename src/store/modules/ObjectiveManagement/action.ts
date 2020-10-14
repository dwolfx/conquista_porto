import {
  Types,
  IPostObjectiveManagementDataRequest,
  IGetObjectiveManagementDataRequest,
  IDeleteObjectiveRequest,
  IObjectManagement,
  IPutObjectiveFundsMovementRequest,
  IUpdateObjectiveNicknameRequest,
  ITransferBetweenObjectivesRequest,
} from './types'

export function PostObjectiveManagementDataRequest(
  payload: Omit<IPostObjectiveManagementDataRequest, 'type'>
) {
  return {
    type: Types.POST_REQUEST,
    ...payload,
  }
}

export function PostObjectiveManagementDataSuccess(payload: IObjectManagement) {
  return {
    type: Types.POST_SUCCESS,
    payload,
  }
}

export function PostObjectiveManagementDataFailure() {
  return {
    type: Types.POST_FAILURE,
  }
}

export function GetObjectiveManagementDataRequest(
  payload: Omit<IGetObjectiveManagementDataRequest, 'type'>
) {
  return {
    type: Types.GET_REQUEST,
    ...payload,
  }
}

export function GetObjectiveManagementDataSuccess(payload: IObjectManagement) {
  return {
    type: Types.GET_SUCCESS,
    payload,
  }
}

export function GetObjectiveManagementDataFailure() {
  return {
    type: Types.GET_FAILURE,
  }
}

export function DeleteObjectiveRequest(
  payload: Omit<IDeleteObjectiveRequest, 'type'>
) {
  return {
    type: Types.DELETE_REQUEST,
    ...payload,
  }
}

export function DeleteObjectiveSuccess() {
  return {
    type: Types.DELETE_SUCCESS,
  }
}

export function DeleteObjectiveFailure() {
  return {
    type: Types.DELETE_FAILURE,
  }
}

export function PutObjectiveFundsMovementRequest(
  payload: Omit<IPutObjectiveFundsMovementRequest, 'type'>
) {
  return {
    type: Types.PUT_FUNDS_MOVEMENT_REQUEST,
    ...payload,
  }
}

export function PutObjectiveFundsMovementSuccess(payload: IObjectManagement) {
  return {
    type: Types.PUT_FUNDS_MOVEMENT_SUCCESS,
    payload,
  }
}

export function PutObjectiveFundsMovementFailure() {
  return {
    type: Types.PUT_FUNDS_MOVEMENT_FAILURE,
  }
}

export function UpdateObjectiveNicknameRequest(
  payload: Omit<IUpdateObjectiveNicknameRequest, 'type'>
) {
  return {
    type: Types.UPDATE_OBJECTIVE_NICKNAME_REQUEST,
    ...payload,
  }
}

export function UpdateObjectiveNicknameSuccess(payload: string) {
  return {
    type: Types.UPDATE_OBJECTIVE_NICKNAME_SUCCESS,
    payload,
  }
}

export function UpdateObjectiveNicknameFailure() {
  return {
    type: Types.UPDATE_OBJECTIVE_NICKNAME_FAILURE,
  }
}

export function TransferBetweenObjectivesRequest(
  payload: Omit<ITransferBetweenObjectivesRequest, 'type'>
) {
  return {
    type: Types.TRANSFER_BETWEEN_OBJECTIVES_REQUEST,
    ...payload,
  }
}

export function TransferBetweenObjectivesSuccess(payload: IObjectManagement) {
  return {
    type: Types.TRANSFER_BETWEEN_OBJECTIVES_SUCCESS,
    payload,
  }
}

export function TransferBetweenObjectivesFailure() {
  return {
    type: Types.TRANSFER_BETWEEN_OBJECTIVES_FAILURE,
  }
}

export function CleanObjectiveManagementData() {
  return {
    type: Types.CLEAN_DATA,
  }
}
