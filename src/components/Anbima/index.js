import React from 'react'

import {
  GridContainer,
  GridCol,
  GridRow,
  Link,
  LogoAnbimaDistribuicao,
  LogoAnbimaGestao,
  LogoComoInvestir,
  Text,
  UppercaseBlueText,
} from './styled'

const Anbima = () => (
  <GridContainer>
    <GridRow>
      <GridCol lg="12">
        <Text>
          A Porto Seguro Investimentos informa os cotistas que o Distribuidor de
          cotas dos Fundos poderá receber remuneração de distribuição do(s)
          administrador(es) e/ou dos Fundos de Invest imento em que seus
          clientes aplicarem recursos, seja na forma de investimento direto,
          seja por meio de conta e ordem; Esta remuneração poderá ser
          diferenciada em função dos diversos Fundos de Investimento investidos.
          Leia o formulário de informações complementares, a lâmina de
          informações essenciais, se houver, e o regulamento antes de investir.
          Confira a Lâmina de Informações Essenciais, o Demonstrativo de
          Desempenho e o Formulário de Informações Complementares - INTRAG/CVM.
          <Link
            target="_blank"
            to={{
              pathname: `/redirect?to=https://cvmweb.cvm.gov.br/swb/default.asp?sg_sistema=fundosreg`,
            }}
            data-gtm-type="click"
            data-gtm-clicktype="link"
            data-gtm-subname="Anbima"
            data-gtm-name="ACESSE AQUI"
          >
            <UppercaseBlueText> ACESSE AQUI</UppercaseBlueText>
          </Link>
          . A Porto Seguro Investimentos pode receber eventuais serviços
          adicionais fornecidos por Corretoras em razão de sua contratação e
          relacionamento. A Portopar DTVM recebe remuneração de distribuição
          do(s) Administrador(es) e/ou do(s) Fundo(s) de Investimento em que
          seus clientes aplicam recursos, seja na forma de investimento direto,
          seja por meio de conta e ordem e que esta remuneração pode ser
          diferenciada em função dos diversos Fundos de Investimento investidos.
        </Text>
        <div>
          <LogoAnbimaDistribuicao />
          <Link
            target="_blank"
            to={{
              pathname: `/redirect?to=https://www.anbima.com.br/data/files/0D/E6/16/1D/294D561057EB3C5678A80AC2/codigo_de_Administracao_de_Recursos_de_Terceiros_02_01_19.pdf`,
            }}
            data-gtm-type="click"
            data-gtm-clicktype="link"
            data-gtm-subname="Anbima"
            data-gtm-name="Logo Anbima Gestao"
          >
            <LogoAnbimaGestao />
          </Link>
          <Link
            target="_blank"
            to={{
              pathname: `/redirect?to=https://comoinvestir.anbima.com.br/`,
            }}
            data-gtm-type="click"
            data-gtm-clicktype="link"
            data-gtm-subname="Anbima"
            data-gtm-name="Logo Como Investir"
          >
            <LogoComoInvestir />
          </Link>
        </div>
      </GridCol>
    </GridRow>
  </GridContainer>
)

export default Anbima
