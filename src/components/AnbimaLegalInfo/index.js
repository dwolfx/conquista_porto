import React from 'react'

import logoAnbimaGestao from 'assets/images/logo-anbima-gestao.png'
import logoAnbimaDistribuicao from 'assets/images/logo-anbima-distribuicao.png'
import logoAnbimaComoInvestir from 'assets/images/logo-anbima-como-investir.png'

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
            meses. &nbsp;
            <Link
              target="_blank"
              rel="noopener noreferrer"
              href="https://cvmweb.cvm.gov.br/swb/default.asp?sg_sistema=fundosreg"
            >
              Confira aqui
            </Link>
            &nbsp; as informações. as informações legais referentes a cada
            investimento e as informações adicionais de fundos de investimento
            como data de início, patrimônio líquido, taxas aplicáveis e público
            alvo. SUPERVISÃO E FISCALIZAÇÃO: Comissão de Valores Mobiliários –
            CVM Serviço de Atendimento ao Cidadão em &nbsp;
            <Link
              target="_blank"
              rel="noopener noreferrer"
              href="http://www.cvm.gov.br"
            >
              http://www.cvm.gov.br
            </Link>
            | Central de Atendimento: (11) 3366-3200/SAC
            0800-727-2763/0800-727-8736 Atendimento para deficientes auditivos.
            Ouvidoria: 0800-727-1184 | 3366-3184 ouvidoria@portoseguro.com.br,
            (Seg à Sexta das 8h15 às 18h30, exceto feriados). Fale Conosco:
            &nbsp;
            <Link
              target="_blank"
              rel="noopener noreferrer"
              href="mailto:porto.investimentos@portoseguro.com.br"
            >
              porto.investimentos@portoseguro.com.br
            </Link>
            .
          </Text>
        </TextWrapper>
      </GridCol>
    </GridRow>
    <GridRow>
      <GridCol lg={12}>
        <Link
          target="_blank"
          href="https://www.anbima.com.br/data/files/0D/E6/16/1D/294D561057EB3C5678A80AC2/codigo_de_Administracao_de_Recursos_de_Terceiros_02_01_19.pdf"
        >
          <ImgAnbima src={logoAnbimaGestao} alt="Logo Anbima Gestão" />
        </Link>
        <ImgAnbima
          src={logoAnbimaDistribuicao}
          alt="Logo Anbima Distribuição"
        />
        <Link target="_blank" href="https://comoinvestir.anbima.com.br/">
          <ImgAnbima src={logoAnbimaComoInvestir} alt="Como investir" />
        </Link>
      </GridCol>
    </GridRow>
  </GridContainer>
)

export default AnbimaLegalInfo
