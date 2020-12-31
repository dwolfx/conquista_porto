import React, { useContext, useState } from 'react'

import { formatCpf } from 'helpers'

import Text from 'components/Text'
import Icon from 'components/IconExporter'
import HorizontalList from 'components/HorizontalList'
import Divisor from 'components/Divisor'
import { ThemeContext } from 'styled-components/macro'
import Modal from 'components/Modal/ModalNew'
import { IProps } from '../index'
import * as S from '../styles'
export default function AccountDetailContentMobile({
  codigo_banco,
  nome_banco,
  agencia,
  conta,
  cpf_cnpj,
  titular,
}: IProps) {
  const theme = useContext(ThemeContext)
  const [isOpen, setIsOpen] = useState(false)
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
    <S.MobileWrapper>
      <HorizontalList
        startItems={[
          <Text type="heading4" bold>Conta de investimento</Text>
        ]}
        endItems={[
          <Icon
            name="information"
            role="button"
            aria-label="info-account-detail"
            fill={theme.colors.blue4}
            width={21}
            onClick={() => setIsOpen(true)}
          />
        ]}
      />
      <Modal isOpen={isOpen} handleClose={() => setIsOpen(false)} modalTitle="Conta de investimento" noChildrenPadding>
        <S.VerticalListWrapper>
          {content.map(({ label, value }, index) => (
            <div key={label}>
              <S.VerticalListMargin
                elements={[
                  <Text color="gray4" type="captionUppercase" bold>
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
        </S.VerticalListWrapper>
      </Modal>
    </S.MobileWrapper>
  )
}
