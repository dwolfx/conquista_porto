import { dict } from 'components/IconExporter'
const stripValue = (value: string) => value.replace(/\D/g, '')

export interface errorObject {
  icon: keyof typeof dict
  message: string
}

export const isInvalidCEP = (value: string, touched: boolean) => {
  const strippedValue = stripValue(value)
  if (strippedValue.length === 0 && touched) {
    return true
  }
  if (strippedValue.length < 8 && touched) {
    return true
  }
  return false
}

export const errorCEP = (
  value: string
): boolean | { icon: keyof typeof dict; message: string } => {
  const strippedValue = stripValue(value)
  if (strippedValue.length === 0) {
    return {
      icon: 'information',
      message: 'Campo obrigatório',
    }
  }
  if (strippedValue.length < 8) {
    return {
      icon: 'information',
      message: 'CEP Inválido',
    }
  }
  return false
}

export const validtionGeneric = (
  value: string | number | undefined,
  touch: boolean,
  extra: boolean = true,
  error: errorObject = {
    icon: 'information',
    message: 'Campo obrigatório',
  }
) => (extra && !value && touch ? error : false)
