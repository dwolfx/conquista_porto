import React from 'react'

import { formatCpf } from 'helpers'

import Text from 'components/Text'
import Divisor from 'components/Divisor'

import * as S from './styles'

interface IProps {
  codigo_banco?: string
  nome_banco?: string
  agencia?: string
  conta?: string
  cpf_cnpj?: string
  titular?: string
}

export default function AccountDetailContent({
  codigo_banco,
  nome_banco,
  agencia,
  conta,
  cpf_cnpj,
  titular,
}: IProps) {
  const content = [
    {
      label: 'Banco',
      value: `${codigo_banco}-${nome_banco}`,
    },
    {
      label: 'Agência',
      value: agencia,
    },
    {
      label: 'Conta',
      value: conta,
    },
    {
      label: 'CPF',
      value: cpf_cnpj && formatCpf(cpf_cnpj),
    },
    {
      label: 'Favorecido',
      value: titular,
    },
  ]

  const lastIndex = (i: number, arr: any[]) => i + 1 === arr.length

  return (
    <>
      {content.map(({ label, value }, index) => (
        <div key={label}>
          <S.VerticalListMargin
            elements={[
              <Text color="gray4" type="captionUppercase">
                {label}
              </Text>,
              <Text bold color="gray6" type="headline">
                {value}
              </Text>,
            ]}
          />
          {!lastIndex(index, content) && <Divisor />}
        </div>
      ))}
    </>
  )
}
