import React from 'react'

import {
  Container,
  Wrapper,
  Text,
  Line,
  Image,
  Mail,
  Phone,
  Headset,
  ArrowRight
} from './styles'

export default function Footer() {

  return (
    <Container>
      <Wrapper align="flex-start">
        <Text size={14} spacing={2}>
          CONTATO
        </Text>
        <Line width={60} />
        <Wrapper direction="row">
          <Wrapper width={65} direction="row">
            <Wrapper direction="row">
              <Wrapper width={50}>
                <Wrapper direction="row">
                  <Phone />
                  <Wrapper>
                    <Text weight="bold" color="#33beff" size={14}>
                      CENTRAL DE ATENDIMENTO
                    </Text>
                    <Text>(11) 3366 3370</Text>
                  </Wrapper>
                </Wrapper>
                <Wrapper direction="row">
                  <Phone />
                  <Wrapper>
                    <Text weight="bold" color="#33beff" size={14}>
                      ATENDIMENTO PARA DEFICIENTES AUDITIVOS
                    </Text>
                    <Text>0800 727 8736</Text>
                  </Wrapper>
                </Wrapper>
                <Wrapper direction="row">
                  <Phone />
                  <Wrapper>
                    <Text weight="bold" color="#33beff" size={14}>
                      SAC
                    </Text>
                    <Text>0800 727 2763</Text>
                  </Wrapper>
                </Wrapper>
              </Wrapper>
              <Wrapper width={50}>
                <Wrapper direction="row">
                  <Mail />
                  <Wrapper align="flex-start">
                    <Text
                      weight="bold"
                      color="#33beff"
                      size={14}
                      lineHeight="unset"
                    >
                      MENSAGENS
                    </Text>
                    <Text>porto.investimentos@portoseguro.com.br</Text>
                  </Wrapper>
                </Wrapper>
                <Wrapper direction="row">
                  <Headset />
                  <Wrapper>
                    <Text weight="bold" color="#33beff" size={14}>
                      OUVIDORIA
                    </Text>
                    <Text>0800 727 1184</Text>
                    <Text>(11) 3366 3184</Text>
                    <Text>ouvidoria@portoseguro.com.br</Text>
                    <Text>
                      De segunda a sexta, das 8h15 às 18h30, exceto feriados
                    </Text>
                  </Wrapper>
                </Wrapper>
              </Wrapper>
            </Wrapper>
          </Wrapper>
          <Wrapper width={35} margin="0px 0px 0px 100px">
            <Text size={10} margin="0px 0px 15px 0px">
              UMA PLATAFORMA
            </Text>
            <Image />
            <Text>
              © 2018 Porto Seguro Cia. de Seguros - Todos os direitos reservados
            </Text>
            <Wrapper direction="row" align="center">
              <Text weight="bold" size={11} color="#33beff" spacing={2}>
                POLÍTICA DE PRIVACIDADE
              </Text>
              <ArrowRight />
            </Wrapper>
          </Wrapper>
        </Wrapper>
      </Wrapper>
    </Container>
  )
}
