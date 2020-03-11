import React from 'react'

import Banner from 'assets/images/pages/solutions/consortium/building/banner_consortium_building.jpg'
import BulletImage from 'assets/images/pages/solutions/consortium/building/bulletSectionIcon.svg'

import TopBanner from 'components/Solutions/TopBanner'
import BulletsSection from 'components/Solutions/BulletsSection'
import MakeSenseSection from 'components/Solutions/MakeSenseSection'
import HighlightSection from 'components/Solutions/HighlightSection'
import FileDownloadSection from 'components/Solutions/FileDownloadSection'
import MoreDetails from 'components/Solutions/MoreDetails'

import { handleGiwRedirect } from 'helpers'

import { Container } from './styles'

export default function ConsortiumBuilding() {
  return (
    <Container>
      <TopBanner
        title="Consórcio de Imóveis"
        description="O sonho da casa própria sem juros. Para sair do aluguel, quitar um financiamento, aumentar o patrimônio, construir ou reformar, simule e contrate um consórcio com a Porto Seguro."
        buttonText="SIMULAR E CONTRATAR"
        image={Banner}
        imageDescription="Pai empurrando a filha em um balanço e uma casa ao fundo"
        onClick={() =>
          handleGiwRedirect(
            'portaldecliente/conquista/consorcio-de-imoveis/simular?r=true'
          )
        }
      />
      <BulletsSection
        title="Por que contratar o Consórcio de Imóvel?"
        imageURL={BulletImage}
        data={[
          'O consórcio é uma opção para você comprar um imóvel sem juros. Além disso, o crédito pode ser usado para construir, reformar, adquirir um terreno ou pagar o cartório.',
          'São duas formas de receber o valor total solicitado: sorteios e lances, ambos mensais. Aliás, sobre o lance, você pode aumentar suas chances incluindo o FGTS.',
          'A carta de crédito do Consórcio de Imóvel equivale a dinheiro vivo, melhorando suas condições de negociação no momento da compra.',
          'Há planos de até 200 meses, viabilizando parcelas acessíveis e fazendo o consórcio ser uma alternativa para quitar financiamentos com altos juros.',
        ]}
      />
      <MakeSenseSection
        title="Quando faz sentido participar de um Consórcio de Imóveis?"
        data={[
          {
            description:
              'Quando você quiser comprar o imóvel dos seus sonhos, mas sem uma data determinada.',
            icon: 'homewithwindow',
          },
          {
            description:
              'Quando você não tem o valor da entrada e busca uma forma disciplinada de juntar dinheiro para um imóvel.',
            icon: 'barchart',
          },
          {
            description:
              'Quando você não quer um comprometimento de longo prazo com bancos e com pagamento de juros.',
            icon: 'billing',
          },
        ]}
        subtitle="VANTAGENS AO CONTRATAR AQUI:"
        benefitsData={[
          {
            title: 'Gerente de conta',
            description:
              'Possibilidade de apoio de um gerente para te ajudar em contratações e dúvidas',
            icon: 'talkman',
          },
          {
            title: 'Programa de Relacionamento',
            description:
              'Pontos que podem ser trocados por descontos em produtos Porto Seguro e até por viagens',
            icon: 'diamond',
          },
          {
            title: 'Chat inteligente',
            description:
              'Para te ajudar com informações e dicas em qualquer momento.',
            icon: 'callcenter',
          },
          {
            title: 'Facilidade',
            description:
              'A contratação é rápida e descomplicada, feita para facilitar sua vida.',
            icon: 'apps',
          },
        ]}
      />
      <HighlightSection
        title="Parcelas que cabem no seu bolso."
        mainDescription="O Conquista acompanha você na realização do sonho do imóvel próprio."
        subDescription="Você pode fazer quantas simulações quiser, escolhendo entre as opções parcela mensal e
        crédito total. Assim, conhece os planos disponíveis e contrata de acordo com seus interesses."
        buttonText="SIMULAR E CONTRATAR"
        onClick={() =>
          handleGiwRedirect(
            'portaldecliente/conquista/consorcio-de-imoveis/simular?r=true'
          )
        }
      />
      <MoreDetails
        title="SAIBA MAIS:"
        data={[
          {
            img: 'carousel-01',
            imgPath: 'consortium/building',
            imgTitle: 'Tente um lance',
            imgDescription:
              'Você não precisa contar apenas com a sorte para ser contemplado no consórcio. Todos os meses, há a possibilidade de você dar um lance maior do que o valor ofertado por outros participantes do seu grupo para conquistar o seu sonho.',
          },
          {
            img: 'carousel-02',
            imgPath: 'consortium/building',
            imgTitle: 'FGTS para o lance',
            imgDescription:
              'O lance para tentar antecipar o valor do consórcio pode sair diretamente do seu bolso, mas você também pode utilizar seu FGTS (Fundo de Garantia por Tempo de Serviço). Ele rende pouco ao ficar parado e pode ser uma maneira para você ser contemplado antecipadamente.',
          },
          {
            img: 'carousel-03',
            imgPath: 'consortium/building',
            imgTitle: 'Combine mais de um consórcio',
            imgDescription:
              'Os valores dos consórcios são sempre fixos e, nem sempre, o valor de um único consórcio é suficiente para realizar a compra de um bem mais caro, como uma casa, por exemplo. Mas você pode combinar mais de um consórcio para chegar no valor que precisa.',
          },
        ]}
      />
      <FileDownloadSection
        data={[
          {
            title: 'CONDIÇÕES GERAIS',
            description:
              'Mais detalhes sobre as condições de contratação, taxas de juros e outras informações sobre o Consórcio de Imóveis da Porto Seguro.',
            buttonText: 'Visualizar',
            willRedirect: false,
            url:
              'https://www.portoseguro.com.br/NovoInstitucional/static_files/documents/para-imoveis/consorcio-imoveis/regulamento_consorcio_de_imovel.pdf',
          },
        ]}
      />
    </Container>
  )
}
