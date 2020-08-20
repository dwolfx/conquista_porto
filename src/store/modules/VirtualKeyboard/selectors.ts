import { normalizedEmailToNewSignature } from './utils'

export const getAuth = (state: any) => state.auth

export const getEmailToNewSignature = (state: any) =>
  normalizedEmailToNewSignature(state.token2fa)
