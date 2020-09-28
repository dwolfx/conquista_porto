import React from 'react'
import { useLocation } from 'react-router-dom'

import BannerSeguroVidaImage from 'assets/images/pages/solutions/lifeInsurance/banner_seguro_vida.jpg'
import SeloSeguroVida from 'assets/images/pages/solutions/lifeInsurance/selo-seguro-vida.svg'

import TopBanner from 'components/Solutions/TopBanner'
import BulletsSection from 'components/Solutions/BulletsSection'
import MakeSenseSection from 'components/Solutions/MakeSenseSection'
import HighlightSection from 'components/Solutions/HighlightSection'
import FileDownloadSection from 'components/Solutions/FileDownloadSection'
import MoreDetails from 'components/Solutions/MoreDetails'

import { handleRedirectToLifeInsuranceSimulate } from './utils'

const makeSenseSectionData = [
  {
    icon: 'persongroup',
    description: `Quando você quiser proteger sua família financeiramente, caso algo aconteça com você.`,
  },
  {
    icon: 'personaccident',
    description: `Quando você quiser garantir renda em situações de invalidez temporária ou permanente.`,
  },
  {
    icon: 'hospital',
    description: `Quando você quiser ter uma segurança financeira em diagnósticos de doenças graves.`,
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
    icon: 'callcenter',
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
    title: 'Condições Gerais',
    description:
      'Confira mais detalhes sobre as condições de contratação e outras informações sobre o Seguro de Vida da Porto Seguro.',
    buttonText: 'Visualizar',
    url:
      'https://www.portoseguro.com.br/NovoInstitucional/static_files/CGs/vida_individual_/vida_e_acidentes_pessoais%20_individual_anual.pdf',
    willRedirect: false,
  },
]

const moreDetailsData = [
  {
    img: 'carousel-01',
    imgTitle: 'Seguro como proteção familiar',
    imgDescription:
      'O seguro de vida é uma boa maneira de garantir segurança financeira às pessoas que você ama. Com ele, você continua proporcionando um padrão de vida de qualidade aos seus entes queridos, caso você falte um dia.',
    imgPath: 'lifeInsurance',
  },
  {
    img: 'carousel-02',
    imgTitle: 'Outras coberturas',
    imgDescription:
      'O seguro de vida não vale só em caso de morte. Dependendo das coberturas da apólice contratada, seu valor também pode ser utilizado em casos de doenças graves e invalidez por acidente total ou parcial entre outros.',
    imgPath: 'lifeInsurance',
  },
  {
    img: 'carousel-03',
    imgTitle: 'Seguro para profissionais',
    imgDescription:
      'A DIT (Diária por Incapacidade Temporária) é indicada para profissionais liberais, que podem contar com o seguro para garantir seus rendimentos em caso de acidente que os afaste do trabalho.',
    imgPath: 'lifeInsurance',
  },
]

export default function LifeInsurance() {
  const { state: locationState } = useLocation()

  return (
    <>
      <TopBanner
        title="Seguro de Vida"
        description="Planeje a sua proteção ou da sua família e tenha tranquilidade para enfrentar adversidades. Você pode simular diferentes planos da Porto Seguro e contratar digitalmente."
        buttonText="Simule e Contrate"
        image={BannerSeguroVidaImage}
        imageDescription="Família andando na beira do mar"
        onClick={() => {
          handleRedirectToLifeInsuranceSimulate(locationState)
        }}
      />
      <BulletsSection
        title="Por que contratar o Seguro de Vida?"
        imageURL={SeloSeguroVida}
        data={[
          'O Seguro de Vida é uma proteção financeira para você e/ou para a sua família estarem preparados para todos os momentos.',
          'E para profissionais liberais o seguro garante a reposição da renda em caso de afastamento do trabalho por doença ou acidente.',
          'O Seguro de Vida também é vantajoso para pessoas solteiras e sem filhos pois oferece estabilidade financeira em casos de invalidez e doenças graves.',
        ]}
      />
      <MakeSenseSection
        title="Quando faz sentido contratar um Seguro de Vida?"
        subtitle="Vantagens ao contratar com o conquista:"
        data={makeSenseSectionData}
        benefitsData={makeSenseBenefitsSectionData}
      />
      <HighlightSection
        title="Futuro protegido."
        mainDescription="Com o Conquista, é fácil encontrar o plano ideal para você."
        subDescription="Informe suas preferências na simulação, conheça as coberturas disponíveis e contrate o Seguro
        de Vida da Porto Seguro."
        buttonText="Simule e Contrate"
        onClick={() => {
          handleRedirectToLifeInsuranceSimulate(locationState)
        }}
      />

      <MoreDetails title="Saiba mais:" data={moreDetailsData} />

      <FileDownloadSection data={downloadFileSectionData} />
    </>
  )
}
