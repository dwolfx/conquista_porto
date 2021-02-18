export enum ECEPStates {
  'loading',
  'found',
  'partiallyFound',
  'notFound',
  'manualInput',
  'initialState',
}

export interface ICEPStatesProps {
  CEPState: ECEPStates
  setCEPState: React.Dispatch<React.SetStateAction<ECEPStates>>
}
