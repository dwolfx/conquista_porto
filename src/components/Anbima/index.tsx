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

const Anbima = () => (
  <GridContainer>
    <GridRow>
      <GridCol lg={12}>
        <TextWrapper>
          <Text>
            Indicadores: trata-se de mera referência econômica, e não meta ou
            parâmetro de performance. Leia a lâmina de informações essenciais,
            se houver, e o regulamento antes de investir. Rentabilidade passada
            não representa garantia de rentabilidade futura. A rentabilidade
            divulgada não é líquida de impostos. Fundos de Investimento não
            contam com a garantia do administrador, do gestor, de qualquer
            mecanismo de seguro ou Fundo Garantidor de Crédito – FGC. Descrição
            do tipo ANBIMA disponível no Formulário de Informações
            Complementares. Para avaliação de performance de um fundo de
            investimento, é recomendável a análise de, no mínimo, 12 (doze)
            meses.
          </Text>
          <Link
            target="_blank"
            to={{
              pathname: `/redirect?to=https://cvmweb.cvm.gov.br/swb/default.asp?sg_sistema=fundosreg`,
            }}
            data-gtm-type="click"
            data-gtm-clicktype="link"
            data-gtm-subname="Anbima"
            data-gtm-name="confira aqui"
          >
            <BlueText> Confira aqui </BlueText>
          </Link>
          <Text>
            as informações legais referentes a cada investimento e as
            informações adicionais de fundos de investimento como data de
            início, patrimônio líquido, taxas aplicáveis e público alvo.
            SUPERVISÃO E FISCALIZAÇÃO: Comissão de Valores Mobiliários – CVM
            Serviço de Atendimento ao Cidadão em
          </Text>
          <Link
            target="_blank"
            to={{
              pathname: `/redirect?to=http://www.cvm.gov.br/`,
            }}
            data-gtm-type="click"
            data-gtm-clicktype="link"
            data-gtm-subname="Anbima"
            data-gtm-name="www.cvm.gov.br"
          >
            <BlueText> www.cvm.gov.br </BlueText>
          </Link>
          <Text>
            | Central de Atendimento: (11) 3366-3200/SAC
            0800-727-2763/0800-727-8736 Atendimento para deficientes auditivos.
            Ouvidoria: 0800-727-1184 | 3366-3184
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
            data-gtm-name="porto.investimentos@portoseguro.com.br"
            hrefValue="mailto:porto.investimentos@portoseguro.com.br"
          >{` porto.investimentos@portoseguro.com.br`}</MailLink>
          <Text>.</Text>
        </TextWrapper>
        <div>
          <a
            href="https://www.anbima.com.br/data/files/0D/E6/16/1D/294D561057EB3C5678A80AC2/codigo_de_Administracao_de_Recursos_de_Terceiros_02_01_19.pdf"
            target="blank"
          >
            <LogoAnbimaGestao />
          </a>
          <a>
            <LogoAnbimaDistribuicao />
          </a>
          <a href="https://comoinvestir.anbima.com.br/" target="blank">
            <LogoAnbimaInvestir />
          </a>
        </div>
      </GridCol>
    </GridRow>
  </GridContainer>
)

export default Anbima
