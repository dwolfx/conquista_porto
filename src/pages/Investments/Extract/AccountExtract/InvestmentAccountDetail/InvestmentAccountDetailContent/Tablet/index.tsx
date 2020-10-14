import React from 'react'

import { formatCpf } from 'helpers'
import { Container, Col, Row } from 'styled-bootstrap-grid'

import Text from 'components/Text'
import { IProps } from '../index'
import * as S from '../styles'

export default function AccountDetailContentTablet({
  codigo_banco,
  nome_banco,
  agencia,
  conta,
  cpf_cnpj,
  titular,
}: IProps) {
  const firstLine = [
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
  ]
  const secondLine = [
    {
      label: 'CPF',
      value: cpf_cnpj && formatCpf(cpf_cnpj),
    },
    {
      label: 'Favorecido',
      value: titular,
    },
  ]

  return (
    <S.Wrapper>
      <Container>
        <Row>
        {firstLine.map(({ label, value }, index) => (
          <Col sm={4} key={label}>
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
          </Col>
        ))}
        </Row>
      </Container>

      <Container>
        <Row>
        {secondLine.map(({ label, value }, index) => (
          <Col sm={index === 0 ? 4 : 8} key={label}>
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
          </Col>
        ))}
        </Row>
      </Container>
    </S.Wrapper>
  )
}
