import React from 'react'

import {
  BlueText,
  GridContainer,
  GridCol,
  GridRow,
  Link,
  LogoAnbimaDistribuicao,
  LogoAnbimaGestao,
  LogoAnbimaInvestir,
  LogosContainer,
  Text,
  TextWrapper,
} from './styled'

interface IMailLink {
  hrefValue: string
  children: string
}
const MailLink = ({ hrefValue, children, ...rest }: IMailLink) => (
  <a {...rest} href={hrefValue}>
    <BlueText>{children}</BlueText>
  </a>
)

const Anbima = ({ ...rest }) => (
  <GridContainer {...rest}>
    <GridRow>
      <GridCol lg={12}>
        <TextWrapper>
          <Text>
            Você está conectado ao Conquista, a Plataforma Digital de Produtos
            Financeiros da Porto Seguro. A Portopar recebe remuneração de
            distribuição do(s) Administrador(es) e/ou do(s) Fundo(s) de
            Investimento em que seus clientes aplicam recursos, seja na forma de
            investimento direto, seja por meio de conta e ordem e que esta
            remuneração pode ser diferenciada em função dos diversos Fundos de
            Investimento investidos. Leia o Prospecto, o Formulário de
            Informações Complementares, Lâmina de Informações Essenciais e o
            Regulamento antes de investir.
          </Text>
          <Text>
            | Central de Atendimento: (11) 3366-3200/ Atendimento para
            deficientes auditivos 0800-727-8736. Ouvidoria: 0800-727-1184 |
            3366-3184 /
          </Text>
          <MailLink
            data-gtm-type="click"
            data-gtm-clicktype="link"
            data-gtm-subname="Anbima"
            data-gtm-name="ouvidoria@portoseguro.com.br"
            hrefValue="mailto:ouvidoria@portoseguro.com.br"
          >{` ouvidoria@portoseguro.com.br`}</MailLink>
          <Text>
            , (Seg à Sexta das 8h15 às 18h30, exceto feriados). Fale Conosco:
          </Text>
          <MailLink
            data-gtm-type="click"
            data-gtm-clicktype="link"
            data-gtm-subname="Anbima"
            data-gtm-name="suporte.conquista@portoseguro.com.br"
            hrefValue="mailto:suporte.conquista@portoseguro.com.br"
          >{` suporte.conquista@portoseguro.com.br`}</MailLink>
          <Text>.</Text>
          <Text>
            {` Para ter acesso a Políticas Internas, Código de Conduta Profissional
            de AAIs (Agentes autônomos de Investimentos), Lista de AAIs e
            Assembléias acesse `}
          </Text>
          <Link
            target="_blank"
            to={{
              pathname: `/redirect?to=https://www.conquista.com.vc`,
            }}
            data-gtm-type="click"
            data-gtm-clicktype="link"
            data-gtm-subname="Anbima"
            data-gtm-name="www.conquista.com.vc"
          >
            <BlueText>www.conquista.com.vc</BlueText>
          </Link>
          <Text>.</Text>
        </TextWrapper>
        <LogosContainer>
          <a
            href="https://www.anbima.com.br/data/files/0D/E6/16/1D/294D561057EB3C5678A80AC2/codigo_de_Administracao_de_Recursos_de_Terceiros_02_01_19.pdf"
            target="blank"
          >
            <LogoAnbimaGestao />
          </a>
          <LogoAnbimaDistribuicao />
          <a href="https://comoinvestir.anbima.com.br/" target="blank">
            <LogoAnbimaInvestir />
          </a>
        </LogosContainer>
      </GridCol>
    </GridRow>
  </GridContainer>
)

export default Anbima
