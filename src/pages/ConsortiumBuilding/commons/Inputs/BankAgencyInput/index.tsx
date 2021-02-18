import React from 'react'

// import useFormFluxManagement from 'hooks/FluxManagement/useFormFluxManagement'

import { TextsConsortiumBuilding } from 'pages/ConsortiumBuilding/commons/Texts'

import * as s from './styles'
import * as t from '../types'
import * as u from '../utils'

const BankAgencyInput: React.FC<t.ITextInput> = ({ inputState, ...rest }) => {
  const { formDefault } = TextsConsortiumBuilding()

  const setBankAgency = inputState[1]
  // const [bankAgency, setBankAgency] = inputState

  /*
   * retirar de comentário quando a interface do formulário estiver definida
   */

  // const { form } = useFormFluxManagement<IForm>()

  // React.useEffect(() => {
  //   if (!!form.bankAgency) {
  //     setBankAgency(form.bankAgency)
  //   }
  // }, [form.bankAgency, setBankAgency])

  return (
    <s.TextInput
      label="agência"
      name="agencia"
      placeholder={formDefault.placeholderInput}
      // value={bankAgency}
      disabled={false}
      onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
        u.inputHandleChange(event, setBankAgency)
      }}
      maxLength={4}
      {...rest}
    />
  )
}

export default BankAgencyInput
