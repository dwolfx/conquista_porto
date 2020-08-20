import { IResgisteredDevice } from './types'
import { hideEmailCharacters } from 'helpers'

/* Função para retornar o email que foi enviado a nova assinatura */
export function normalizedEmailToNewSignature(response: IResgisteredDevice) {
  if (!response.data) return ''
  const objRegisteredDevice = response.data.reduce(
    (acc: any, item: { name: string; value: string }) => {
      acc[item.name] = item.value
      return acc
    },
    {}
  )

  return hideEmailCharacters(objRegisteredDevice['email_otp'])
}
