import Text from 'components/Text'
import React from 'react'
import 'styled-components/macro'

import { Row, Col } from 'styled-bootstrap-grid'

import ButtonLink from 'components/Button/Link'
import Divisor from 'components/Divisor'
import useMedia from 'hooks/useMedia'

import * as S from './styles'
import DataRow from './DataRow'

const Sumary = () => {
  const isMobile = useMedia('xs')
  return (
    <>
      <S.Container>
        <Row>
          <S.HeaderCol lg={3} md={12}>
            <S.HeaderWrapper>
              <S.HeaderTitleWrapper>
                <Text type="heading4" bold color="gray6">
                  Resumo do contrato
                </Text>
              </S.HeaderTitleWrapper>
              <S.HeaderTitleWrapper>
                <Text type={isMobile ? 'body' : 'headline'} color="gray6">
                  Revise as informações e os termos do seu contrato.
                </Text>
              </S.HeaderTitleWrapper>
            </S.HeaderWrapper>
          </S.HeaderCol>
          <Col lg={8} lgOffset={0} md={10} mdOffset={1}>
            <S.Card>
              <S.CardContentWrapper>
                <S.CardTitleWrapper>
                  <Text type="subheading" bold color="gray5">
                    RESUMO
                  </Text>
                </S.CardTitleWrapper>
                <DataRow label="Tipo de Seguro" value="Internacional" />
              </S.CardContentWrapper>
            </S.Card>
            <S.Card>
              <S.CardContentWrapper>
                <S.CardTitleWrapper>
                  <Text type="subheading" bold color="gray5">
                    COBERTURA
                  </Text>
                </S.CardTitleWrapper>
                <DataRow
                  label="Despesas Médicas, Hospitalares e/ou Odontológicas - DMO"
                  value="30.000,00 €"
                />
                <Divisor />
                <DataRow label="Morte Acidental" value="R$ 200.000,00" />
                <Divisor />
                <DataRow
                  label="Invalidez Permanente Total ou Parcial por Acidente"
                  value="R$ 200.000,00"
                />
                <Divisor />
                <DataRow label="Cancelamento de Viagem" value="R$ 200.000,00" />
                <Divisor />
                <DataRow label="Interrupção da Viagem" value="R$ 3.000,00" />
                <Divisor />
                <DataRow label="Extravio de Bagagem" value="R$ 3.000,00" />
                <Divisor />
                <DataRow label="Danos de Bagagem" value="R$ 3.000,00" />
                <Divisor />
                <DataRow label="Translado de Corpo" value="20.000,00 €" />
                <Divisor />
                <DataRow label="Translado Médico" value="20.000,00 €" />
                <Divisor />
                <DataRow label="Tregresso Sanitário" value="20.000,00 €" />
                <Divisor />
                <DataRow label="Assistência Funeral" value="5.000,00 €" />
                <Divisor />
                <DataRow
                  label="Hospedagem após alta hospitalar"
                  value="100,00 €/Dia - Limite 5 Dias"
                />
                <Divisor />
                <DataRow
                  label="Remarcação de Passagem para Regresso"
                  value="5.000,00 €"
                />
                <Divisor />
                <DataRow
                  label="Remarcação de Passagem para Regresso de membros da família"
                  value="5.000,00 €"
                />
                <Divisor />
                <DataRow
                  label="Acompanhante em caso de hospitalização prolongada"
                  value="5.000,00 €"
                />
                <Divisor />
                <DataRow
                  label="Hospedagem para acompanhante em caso de hospitalização prolongada"
                  value="5.000,00 €"
                />
                <Divisor />
                <DataRow label="Acompanhante de menor" value="5.000,00 €" />
                <Divisor />
                <DataRow label="Despesas farmacêuticas" value="5.000,00 €" />
                <Divisor />
                <DataRow label="Despesas Jurídicas" value="5.000,00 €" />
                <Divisor />
                <DataRow label="Pagamento de fiança" value="5.000,00 €" />
                <Divisor />
                <DataRow
                  label="Extensão de vigência por razões médicas"
                  value="5.000,00 €"
                />
                <Divisor />
                <DataRow label="Porto Viage Bem" value="Sim" />
                <Divisor />
                <DataRow
                  label="Localização e Encaminhamento de bagagem"
                  value="Sim (se transporte aéreo ou marítimo)"
                />
                <Divisor />
                <DataRow
                  label="Localização e Encaminhamento de bagagem"
                  value="Sim"
                />
                <Divisor />
                <DataRow
                  label="Transmissão de mensagens urgentes"
                  value="Sim"
                />
              </S.CardContentWrapper>
            </S.Card>
            <S.Card>
              <S.CardContentWrapper>
                <S.CardTitleWrapper>
                  <Text type="subheading" bold color="gray5">
                    FORMA DE PAGAMENTO
                  </Text>
                  <ButtonLink>ALTERAR</ButtonLink>
                </S.CardTitleWrapper>
                <DataRow label="Modelo" value="Cartão Porto Seguro Black" />
                <Divisor />
                <DataRow label="Número" value="**** **** **** 9988" />
                <Divisor />
                <DataRow label="Vencimento" value="08/28" />
                <Divisor />
                <DataRow label="Número de Parcelas" value="12x de R$ 310,00" />
              </S.CardContentWrapper>
            </S.Card>
          </Col>
        </Row>
      </S.Container>
      <S.FixedFooter>
        <S.Button color="secondary">continuar</S.Button>
      </S.FixedFooter>
    </>
  )
}

export default Sumary
