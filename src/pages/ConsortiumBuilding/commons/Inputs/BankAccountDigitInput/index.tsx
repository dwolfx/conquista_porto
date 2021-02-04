import React from 'react'

// import useFormFluxManagement from 'hooks/FluxManagement/useFormFluxManagement'

import { texts } from 'pages/ConsortiumBuilding/commons/Texts'

import * as s from './styles'
import * as t from '../types'

const BankAccountDigitInput: React.FC<t.ITextInput> = ({
  inputState,
  ...rest
}) => {
  const { formDefault } = texts()

  const setBankAccountDigit = inputState[1]
  // const [bankAccountDigit, setBankAccountDigit] = inputState

  /*
   * retirar de comentário quando a interface do formulário estiver definida
   */

  // const { form } = useFormFluxManagement<IForm>()

  // React.useEffect(() => {
  //   if (!!form.bankAccountDigit) {
  //     setBankAccountDigit(form.bankAccountDigit)
  //   }
  // }, [form.bankAccountDigit, setBankAccountDigit])

  return (
    <s.TextInput
      label="dígito"
      name="dígito"
      placeholder={formDefault.placeholderInput}
      // value={bankAccountDigit}
      disabled={false}
      onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
        setBankAccountDigit(event.target.value)
      }}
      maxLength={1}
      {...rest}
    />
  )
}

export default BankAccountDigitInput
