import React from 'react'

import * as s from './styles'

interface IMailLink {
  hrefValue: string
  children: string
}
const MailLink = ({ hrefValue, children, ...rest }: IMailLink) => (
  <a {...rest} href={hrefValue}>
    <s.BlueText>{children}</s.BlueText>
  </a>
)

const Anbima = ({ ...rest }) => (
  <s.GridContainer {...rest}>
    <s.GridRow>
      <s.GridCol lg={12}>
        <s.TextWrapper>
          <s.Text>
            Você está conectado ao Conquista, a Plataforma Digital de Produtos
            Financeiros da Porto Seguro. A distribuição dos fundos de
            investimento poderá ser realizada pela Portopar DTVM Ltda. e/ou por
            agentes autônomos de investimentos (“AAIs”) contratados pela
            Portopar. Os AAIs são remunerados pela distribuição dos fundos ao
            equivalente a um percentual da taxa de distribuição devida à
            Portopar DTVM, incidente sobre o montante aplicado nos fundos. A
            Portopar DTVM está autorizada a realizar a subscrição das cotas do
            fundo por conta e ordem de seus respectivos clientes, na forma dos
            artigos 30 e seguintes da Instrução CVM nº 555/2014. Leia o
            Prospecto, o Formulário de Informações Complementares, Lâmina de
            Informações Essenciais e o Regulamento antes de investir.
          </s.Text>
          <s.Text>
            | Central de Atendimento Conquista para clientes: 3366-3200; para
            parceiros: 3366-3762. SAC: 0800-727-2763. Atendimento para
            deficientes auditivos: 0800-727-8736. Ouvidoria: 0800-727-1184 |
            3366-3184
          </s.Text>
          <MailLink
            data-gtm-type="click"
            data-gtm-clicktype="link"
            data-gtm-subname="Anbima"
            data-gtm-name="ouvidoria@portoseguro.com.br"
            hrefValue="mailto:ouvidoria@portoseguro.com.br"
          >{` ouvidoria@portoseguro.com.br`}</MailLink>
          <s.Text>
            . Disponíveis de seg a sex, das 8h15 às 18h30, exceto feriados. Fale
            Conosco:
          </s.Text>
          <MailLink
            data-gtm-type="click"
            data-gtm-clicktype="link"
            data-gtm-subname="Anbima"
            data-gtm-name="suporte.conquista@portoseguro.com.br"
            hrefValue="mailto:suporte.conquista@portoseguro.com.br"
          >{` suporte.conquista@portoseguro.com.br`}</MailLink>
          <s.Text>.</s.Text>
          <s.Text>
            {` Para ter acesso a Políticas Internas, Código de Conduta Profissional de AAIs (Agentes autônomos de Investimentos), Lista de AAIs e Assembléias acesse `}
          </s.Text>
          <s.Link
            target="_blank"
            to={{
              pathname: `/redirect?to=https://www.conquista.com.vc`,
            }}
            data-gtm-type="click"
            data-gtm-clicktype="link"
            data-gtm-subname="Anbima"
            data-gtm-name="www.conquista.com.vc"
          >
            <s.BlueText>www.conquista.com.vc</s.BlueText>
          </s.Link>
          <s.Text>
            . © 2020 Porto Seguro Cia. de Seguros Gerais - Todos os direitos
            reservados. - CNPJ: 61.198.164/0001-60, Avenida Rio Branco, nº 1.489
            e Rua Guaianases, nº 1.238, Campos Elíseos, São Paulo/SP, CEP
            01204-001.
          </s.Text>
        </s.TextWrapper>
        <s.LogosContainer>
          <s.AnchorTag href="http://www.cvm.gov.br/index.html">
            <s.LogoAnbimaCVM />
          </s.AnchorTag>
          <s.AnchorTag href="https://www.anbima.com.br/data/files/0D/E6/16/1D/294D561057EB3C5678A80AC2/codigo_de_Administracao_de_Recursos_de_Terceiros_02_01_19.pdf">
            <s.LogoAnbimaGestao />
          </s.AnchorTag>
          <s.LogoWrapper>
            <s.LogoAnbimaDistribuicao />
          </s.LogoWrapper>
          <s.AnchorTag href="https://comoinvestir.anbima.com.br/">
            <s.LogoAnbimaInvestir />
          </s.AnchorTag>
        </s.LogosContainer>
      </s.GridCol>
    </s.GridRow>
  </s.GridContainer>
)

export default Anbima
