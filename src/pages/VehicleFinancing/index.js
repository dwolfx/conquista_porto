import React from 'react'

import TopBanner from '../../components/Solutions/TopBanner'
import BulletsSection from '../../components/Solutions/BulletsSection'
import MakeSenseSection from '../../components/Solutions/MakeSenseSection'
import HighlightSection from '../../components/Solutions/HighlightSection'
import FileDownloadSection from '../../components/Solutions/FileDownloadSection'
import MoreDetails from '../../components/Solutions/MoreDetails'
import { Container } from './styles'
import Banner from '../../assets/images/pages/solutions/vehicleFinancing/banner.jpg'
import BulletImage from '../../assets/images/pages/solutions/vehicleFinancing/selo-financiamento.svg'

export default function VehicleFinancing() {
  return (
    <Container>
      <TopBanner
        title="Financiamento de Veículos"
        description="Carro novo ou seminovo com entrada zero. Simule e contrate um financiamento de até 100% do valor do veículo. Com os planos flexíveis da Porto Seguro, você paga em até 60 meses."
        buttonText="SIMULAR E CONTRATAR"
        onClick={() => console.log('clicked')}
        image={Banner}
      />
      <BulletsSection
        title="Por que contratar o Financiamento?"
        imageURL={BulletImage}
        data={[
          'O financiamento agiliza sua compra, permitindo que você adquira seu carro novo ou seminovo no momento que você deseja.',
          'Com até 5 anos para pagar, você pode financiar 100% do valor do veículo. Ou seja, pode comprar seu carro sem pagar nada de entrada.',
          'Para realizar a compra, você só precisará apresentar o crédito como pagamento, facilitando a aquisição e melhorando suas chances de negociação.',
          'Além de ter acesso a planos flexíveis, você ganha descontos em serviços e benefícios se utilizar o Cartão de Crédito Porto Seguro.',
        ]}
      />
      <MakeSenseSection
        title="Quando faz sentido contratar um Financiamento de Veículo?"
        data={[
          {
            description:
              'Quando você quiser comprar um carro, mas não tiver o valor para pagá-lo à vista.',
            icon: 'piechart',
          },
          {
            description:
              'Quando você quiser substituir um financiamento mais caro por um mais em conta.',
            icon: 'refresh',
          },
          {
            description:
              'Quando você precisar comprar o automóvel logo e com dinheiro em mãos.',
            icon: 'financial',
          },
        ]}
        subtitle="VANTAGENS AO CONTRATAR AQUI:"
        benefitsData={[
          {
            title: 'Gerente de conta',
            description:
              'De acordo com seu saldo investido, conte com a possibilidade de ter o apoio de um Gerente de Conta para auxiliar você em dúvidas e contratações.',
            icon: 'talkman',
          },
          {
            title: 'Programa de Relacionamento',
            description:
              'Pontos do Conquista somados aos pontos do Cartão de Crédito Porto Seguro, que podem ser trocados por descontos, benefícios e vantagens.',
            icon: 'diamond',
          },
          {
            title: 'Chat inteligente',
            description:
              'Atendimento 24h para esclarecer suas dúvidas sobre o uso da plataforma e sobre as soluções Porto Seguro disponíveis no Conquista.',
            icon: 'callcenter',
          },
          {
            title: 'Facilidade',
            description:
              'Ferramentas que simplificam seu dia a dia, permitindo que você controle sua vida financeira e contrate soluções da Porto Seguro pelo computador ou smartphone.',
            icon: 'apps',
          },
        ]}
      />
      <HighlightSection
        title="Parcelas que cabem no seu bolso."
        mainDescription="Com o Conquista, você planeja a compra do seu carro novo ou seminovo."
        subDescription="Você pode fazer quantas simulações quiser, escolhendo parcelas mensais adequadas ao seu orçamento. Conheça os planos e contrate uma solução com a solidez da Porto Seguro."
        buttonText="SIMULAR E CONTRATAR"
      />
      <MoreDetails
        title="SAIBA MAIS:"
        data={[
          {
            img: 'carousel-01',
            imgPath: 'vehicleFinancing',
            imgTitle: 'Financiamento como completo',
            imgDescription:
              'O financiamento de um veículo é o complemento a um valor que você já tem em mãos. Ele é uma escolha segura na hora de realizar o sonho de comprar o carro, sem precisar esperar para ter todo o valor do bem, o que poderia levar um tempo considerável.',
          },
          {
            img: 'carousel-02',
            imgPath: 'vehicleFinancing',
            imgTitle: 'Entrada maior, custo menor',
            imgDescription:
              'No processo de crédito, quanto maior a entrada menor será a prestação e o valor dos juros a pagar. O ideal é sempre dar a maior entrada possível em um financiamento. Assim, as prestações serão mais acessíveis e o custo total da dívida também.',
          },
          {
            img: 'carousel-03',
            imgPath: 'vehicleFinancing',
            imgTitle: 'Prestação que cabe no bolso',
            imgDescription:
              'A escolha do financiamento deve ser feita muito mais pelo valor da prestação do que pelo valor do veículo. Então, ao escolher, pense sempre em um carro que permita parcelas que caibam no seu orçamento mensal.',
          },
        ]}
      />
      <FileDownloadSection
        data={[
          {
            title: 'SISTEMA DE INFORMAÇÕES DE CRÉDITO - SRC',
            description: 'Informações legais sobre financiamento.',
            buttonText: 'BAIXAR ARQUIVO',
          },
          {
            title: 'TABELA DE TARIFAS',
            description:
              'Mais informações sobre tarifas envolvidas na contratação de financiamento.',
            buttonText: 'VISUALIZAR',
          },
          {
            title: 'CONDIÇÕES GERAIS',
            description:
              'Mais detalhes sobre as condições de contratação, taxas de juros e outras informações sobre o Financiamento de Veículos da Porto Seguro.',
            buttonText: 'BAIXAR ARQUIVO',
          },
        ]}
      />
    </Container>
  )
}
