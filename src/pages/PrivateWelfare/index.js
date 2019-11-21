import React from 'react'

import TopBanner from '../../components/Solutions/TopBanner'
import BulletsSection from '../../components/Solutions/BulletsSection'
import MakeSenseSection from '../../components/Solutions/MakeSenseSection'
import HighlightSection from '../../components/Solutions/HighlightSection'
import FileDownloadSection from '../../components/Solutions/FileDownloadSection'
import MoreDetails from '../../components/Solutions/MoreDetails'

import BannerPrevidenciaPrivadaImage from '../../assets/images/pages/solutions/privateWelfare/banner_previdencia_privada.jpg'
import SeloPrevidenciaPrivada from '../../assets/images/pages/solutions/privateWelfare/selo-previdencia-privada.svg'

const makeSenseSectionData = [
  {
    icon: 'persongroup',
    description: `Quando você quiser pensar na sua aposentadoria e no futuro da sua família.`,
  },
  {
    icon: 'time',
    description: `Quando você quiser investir para um período mais longo, a partir de 5 anos.`,
  },
  {
    icon: 'coin',
    description: `Quando você quiser reduzir o valor que paga de IR, obtendo economia anual.`,
  },
]

const makeSenseBenefitsSectionData = [
  {
    icon: 'talkman',
    title: 'Gerente de conta',
    description:
      'De acordo com seu saldo investido, conte com a possibilidade de ter o apoio de um Gerente de Conta para auxiliar você em dúvidas e contratações.',
  },
  {
    icon: 'diamond',
    title: 'Programa de Relacionamento',
    description:
      'Pontos do Conquista somados aos pontos do Cartão de Crédito Porto Seguro, que podem ser trocados por descontos, benefícios e vantagens.',
  },
  {
    icon: 'callCenter',
    title: 'Chat inteligente',
    description:
      'Atendimento 24h para esclarecer suas dúvidas sobre o uso da plataforma e sobre as soluções Porto Seguro disponíveis no Conquista.',
  },
  {
    icon: 'apps',
    title: 'Facilidade',
    description:
      'Ferramentas que simplificam seu dia a dia, permitindo que você controle sua vida financeira e contrate soluções da Porto Seguro pelo computador ou smartphone.',
  },
]

const downloadFileSectionData = [
  {
    title: 'Carta do Gestor',
    description:
      'Comentários sobre a estratégia dos fundos de Previdência Privada e, também, um pouco da visão do cenário econômico atual.',
    buttonText: 'Baixar Arquivo',
  },
  {
    title: 'Quadro de Rentabilidade',
    description:
      'Acompanhe o rendimento mais atualizado de todos os fundos de Previdência Privada da Porto Seguro.',
    buttonText: 'Baixar Arquivo',
  },
]

const moreDetailsData = [
  {
    img: 'carousel-01',
    imgTitle: 'PGBL ou VGBL',
    imgDescription:
      'Para quem faz a declaração do IR pelo modelo completo e contribui para o INSS, o PGBL é a melhor opção, além de permitir o benefício fiscal durante o período de acúmulo do IR. Já, o VGBL é indicado para quem é isento ou declara o imposto pelo modelo simplificado.',
    imgPath: 'privateWelfare',
  },
  {
    img: 'carousel-02',
    imgTitle: 'IR para previdência',
    imgDescription:
      'No PGBL, você pode deduzir as parcelas do plano na declaração em até 12% da sua renda bruta anual e com isso restituir mais ou pagar menos imposto de renda. No resgate ou no recebimento da renda, o imposto será cobrado sobre o valor total acumulado no seu plano. Já no VGBL, não há o incentivo fiscal, mas o imposto será cobrado somente sobre os rendimentos do plano.',
    imgPath: 'privateWelfare',
  },
  {
    img: 'carousel-03',
    imgTitle: 'Regime tributário',
    imgDescription:
      'Há duas possibilidades: Progressivo e Regressivo. Na primeira, quanto menor o valor do saque, menor será o Imposto de Renda. Já, na segunda opção, quanto mais tempo acumulando, maior será sua vantagem tributária.',
    imgPath: 'privateWelfare',
  },
]

export default function PrivateWelfare() {
  return (
    <>
      <TopBanner
        title="Previdência Privada"
        description="Conte com a Porto Seguro para planejar sua aposentadoria. Selecione entre receber uma
        renda mensal ou o saldo total na idade escolhida, simule um plano e invista no seu futuro."
        buttonText="Simular e Contratar"
        image={BannerPrevidenciaPrivadaImage}
        imageDescription="Casal de idosos abraçados, sentandos em um banco de madeira e observando o horizonte"
        onClick={() => {}}
      />
      <BulletsSection
        title="Por que contratar a Previdência Privada?"
        imageURL={SeloPrevidenciaPrivada}
        data={[
          'A Previdência Privada é uma opção para você investir no seu futuro, planejando sua aposentadoria e assegurando tranquilidade para o amanhã.',
          'Você tem flexibilidade para fazer um investimento inicial e, depois, aportes mensais fixos ou esporádicos.',
          'De acordo com o plano escolhido, você pode reduzir seus pagamentos anuais de Imposto de Renda, obtendo economia no presente.',
          'Você pode decidir como prefere resgatar o dinheiro, optando por receber todo o valor acumulado de uma vez ou por ter uma renda mensal a partir da idade escolhida.',
        ]}
      />
      <MakeSenseSection
        title="Quando faz sentido contratar um Seguro de Vida?"
        subtitle="Vantagens ao contratar com o conquista:"
        data={makeSenseSectionData}
        benefitsData={makeSenseBenefitsSectionData}
      />
      <HighlightSection
        title="Seu futuro seguro e tranquilo"
        mainDescription="Com a Previdência Privada, você pode definir se prefere receber uma renda mensal ou o saldo total na idade escolhida."
        subDescription="Aproveite a simulação para conhecer os planos da Porto Seguro."
        buttonText="Simular e contratar"
      />

      <MoreDetails title="Saiba mais:" data={moreDetailsData} />

      <FileDownloadSection data={downloadFileSectionData} />
    </>
  )
}
