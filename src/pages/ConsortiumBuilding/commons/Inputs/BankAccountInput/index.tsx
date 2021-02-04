import React from 'react'

// import useFormFluxManagement from 'hooks/FluxManagement/useFormFluxManagement'

import { texts } from 'pages/ConsortiumBuilding/commons/Texts'

import * as s from './styles'
import * as t from '../types'
import * as u from '../utils'

const BankAccountInput: React.FC<t.ITextInput> = ({ inputState, ...rest }) => {
  const { formDefault } = texts()

  const setBankAccount = inputState[1]
  // const [bankAccount, setBankAccount] = inputState

  /*
   * retirar de comentário quando a interface do formulário estiver definida
   */

  // const { form } = useFormFluxManagement<IForm>()

  // React.useEffect(() => {
  //   if (!!form.bankAccount) {
  //     setBankAccount(form.bankAccount)
  //   }
  // }, [form.bankAccount, setBankAccount])

  return (
    <s.TextInput
      label="conta corrente"
      name="conta corrente"
      placeholder={formDefault.placeholderInput}
      // value={bankAccount}
      disabled={false}
      onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
        u.inputHandleChange(event, setBankAccount)
      }}
      maxLength={9}
      {...rest}
    />
  )
}

export default BankAccountInput
