import React, { useState } from 'react'
import 'styled-components/macro'
import { Row, Col } from 'styled-bootstrap-grid'

import ButtonLink from 'components/Button/Link'
import Divisor from 'components/Divisor'
import Text from 'components/Text'
import useMedia from 'hooks/useMedia'

import EditHirerData from './EditingData/EditHirerData'
import DataRow from '../../../../../commons/DataRow'

import * as S from './styles'

const InsuranceSummary = () => {
  const isMobile = useMedia('xs')

  const [isHirerDataDrawerOpen, setIsHirerDataDrawerOpen] = useState<boolean>(
    false
  )

  return (
    <>
      <EditHirerData
        isOpen={isHirerDataDrawerOpen}
        handleClose={() => setIsHirerDataDrawerOpen(false)}
      />
      <S.Container>
        <Row>
          <S.HeaderCol lg={3} md={3} sm={12}>
            <S.HeaderWrapper>
              <S.HeaderTitleWrapper>
                <Text type="heading4" bold color="gray6">
                  Proposta de Seguro Viagem especial para você!
                </Text>
              </S.HeaderTitleWrapper>

              <S.HeaderTitleWrapper>
                <Text type={isMobile ? 'body' : 'headline'} color="gray6">
                  Se precisar tirar dúvidas fale com seu parceiro.
                </Text>
              </S.HeaderTitleWrapper>
            </S.HeaderWrapper>
          </S.HeaderCol>

          <Col lg={8} md={9} sm={12}>
            <S.Card>
              <S.CardContentWrapper>
                <S.CardTitleWrapper>
                  <Text type="subheading" bold color="gray5">
                    DADOS DO CONTRATANTE
                  </Text>
                  <ButtonLink
                    onClick={() => {
                      setIsHirerDataDrawerOpen(true)
                    }}
                  >
                    ALTERAR
                  </ButtonLink>
                </S.CardTitleWrapper>

                <DataRow label="Nome" value="Bruno Mizrahi" />
                <Divisor />
                <DataRow label="CPF" value="123.456.789-00" />
                <Divisor />
                <DataRow label="Data de nascimento" value="123.456.789-00" />
                <Divisor />
                <DataRow label="Sexo" value="Masculino" />
                <Divisor />
                <DataRow
                  label="País de residência"
                  value="Não preenchido"
                  error
                />
              </S.CardContentWrapper>
            </S.Card>

            <S.Card>
              <S.CardContentWrapper>
                <S.CardTitleWrapper>
                  <Text type="subheading" bold color="gray5">
                    DADOS PARA CONTATO
                  </Text>
                  <ButtonLink>ALTERAR</ButtonLink>
                </S.CardTitleWrapper>
                <DataRow label="Telefone" value="(13)-99371-2839" />
                <Divisor />
                <DataRow label="Tipo de telefone" value="Celular" />
                <Divisor />
                <DataRow label="E-mail" value="conquista@portoseguro.com.br" />
              </S.CardContentWrapper>
            </S.Card>

            <S.Card>
              <S.CardContentWrapper>
                <S.CardTitleWrapper>
                  <Text type="subheading" bold color="gray5">
                    PESSOA POLITICAMENTE EXPOSTA
                  </Text>
                  <ButtonLink>ALTERAR</ButtonLink>
                </S.CardTitleWrapper>
                <DataRow label="Declarar" value="Não preenchido" />
              </S.CardContentWrapper>
            </S.Card>

            <S.Card>
              <S.CardContentWrapper>
                <S.CardTitleWrapper>
                  <Text type="subheading" bold color="gray5">
                    ENDEREÇO
                  </Text>
                  <ButtonLink>ALTERAR</ButtonLink>
                </S.CardTitleWrapper>
                <DataRow label="CEP" value="Não preenchido" />
                <Divisor />
                <DataRow label="Endereço" value="Não preenchido" />
              </S.CardContentWrapper>
            </S.Card>

            <S.Card>
              <S.CardContentWrapper>
                <S.CardTitleWrapper>
                  <Text type="subheading" bold color="gray5">
                    CONTATO EM CASO DE ACIDENTES
                  </Text>
                  <ButtonLink>ALTERAR</ButtonLink>
                </S.CardTitleWrapper>
                <DataRow label="Nome" value="Não preenchido" error />
                <Divisor />
                <DataRow label="Telefone" value="Não preenchido" error />
              </S.CardContentWrapper>
            </S.Card>

            <S.Card>
              <S.CardContentWrapper>
                <S.CardTitleWrapper>
                  <Text type="subheading" bold color="gray5">
                    DECLARAÇÃO DE ACIDENTES
                  </Text>
                  <ButtonLink hasNotification>ALTERAR</ButtonLink>
                </S.CardTitleWrapper>
                <DataRow label="Acompanhante 1" value="Não preenchido" error />
                <Divisor />
                <DataRow label="Acompanhante 2" value="Não preenchido" error />
                <Divisor />
                <DataRow label="Acompanhante 3" value="Não preenchido" error />
                <Divisor />
                <DataRow label="Acompanhante 4" value="Não preenchido" error />
              </S.CardContentWrapper>
            </S.Card>

            <S.Card>
              <S.CardContentWrapper>
                <S.CardTitleWrapper>
                  <Text type="subheading" bold color="gray5">
                    FORMA DE PAGAMENTO
                  </Text>
                  <ButtonLink hasNotification>ALTERAR</ButtonLink>
                </S.CardTitleWrapper>
                <DataRow label="Modelo" value="Não preenchido" error />
                <Divisor />
                <DataRow label="Número" value="Não preenchido" error />
                <Divisor />
                <DataRow label="Vencimento" value="Não preenchido" error />
                <Divisor />
                <DataRow
                  label="Número de parcelas"
                  value="Não preenchido"
                  error
                />
              </S.CardContentWrapper>
            </S.Card>
          </Col>
        </Row>
      </S.Container>

      <S.FixedFooter>
        <S.Button color="primary" outline>
          rejeitar proposta
        </S.Button>
        <S.Popover
          placement="top"
          content={
            <Text bold type="body" color="gray5">
              Há campos vazios ou com
              <br />
              erros. Por favor, verifique e
              <br />
              tente novamente.
            </Text>
          }
        >
          <S.Button color="secondary" disabled>
            concluir contratação
          </S.Button>
        </S.Popover>
      </S.FixedFooter>
    </>
  )
}

export default InsuranceSummary
