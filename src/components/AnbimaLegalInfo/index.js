import React from 'react'

import logoAnbima from 'assets/images/logo-anbima.png'

import {
  TextWrapper,
  GridContainer,
  GridRow,
  GridCol,
  ImgAnbima,
  Link,
  Text,
} from './styles'

const AnbimaLegalInfo = () => (
  <GridContainer>
    <GridRow>
      <GridCol lg={12}>
        <TextWrapper>
          <Text>
            A Porto Seguro Investimentos informa os cotistas que o Distribuidor
            de cotas dos Fundos poderá receber remuneração de distribuição
            do(s)administrador(es) e/ou dos Fundos de Investimento em que seus
            clientes aplicarem recursos, seja na forma de investimento direto,
            seja por meio de conta e ordem; Esta remuneração poderá ser
            diferenciada em função dos diversos Fundos de Investimento
            investidos. Leia o formulário de informações complementares, a
            lâmina de informações essenciais, se houver, e o regulamento antes
            de investir. Confira a Lâmina de Informações Essenciais, o
            Demonstrativo de Desempenho e o Formulário de Informações
            Complementares - INTRAG/CVM. &nbsp;
            <Link
              target="_blank"
              rel="noopener noreferrer"
              href="http://www.intrag.com.br/intrag-pt/index.html"
            >
              ACESSE AQUI
            </Link>
            . A Porto Seguro Investimentos pode receber eventuais serviços
            adicionais fornecidos por Corretoras em razão de sua contratação e
            relacionamento. A Portopar DTVM recebe remuneração de distribuição
            do(s)Administrador(es) e/ou do(s) Fundo(s) de Investimento em que
            seus clientes aplicam recursos, seja na forma de investimento
            direto, seja por meio de conta e ordem e que esta remuneração pode
            ser diferenciada em função dos diversos Fundos de Investimento
            investidos.
          </Text>
        </TextWrapper>
      </GridCol>
    </GridRow>
    <GridRow>
      <GridCol lg={12}>
        <ImgAnbima src={logoAnbima} alt="Logo anbima" />
      </GridCol>
    </GridRow>
  </GridContainer>
)

export default AnbimaLegalInfo
