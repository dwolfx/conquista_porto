import React from 'react'

import Button from '../../components/Button'
import TopBanner from '../../components/Solutions/TopBanner'
import BulletsSection from '../../components/Solutions/BulletsSection'
import MakeSenseSection from '../../components/Solutions/MakeSenseSection'
import HighlightSection from '../../components/Solutions/HighlightSection'
import FileDownloadSection from '../../components/Solutions/FileDownloadSection'
import FundsCarouselSection from '../../components/Solutions/Investments/FundsCarousel/index'

import { ReactComponent as MaleFemaleIcon } from '../../assets/icons/male-female.svg'
import { ReactComponent as SafeBoxIcon } from '../../assets/icons/safe-box.svg'
import { ReactComponent as BarChartIcon } from '../../assets/icons/bar-chart.svg'

import RedHairGirlImage from '../../assets/images/red_hair_girl.jpg'
import BannerInvestimentosImage from '../../assets/images/banner_investimentos.jpg'
import SeloInvestimentoImage from '../../assets/images/selo_investimento.svg'

import {
  SectionCustomPicture,
  CustomContent,
  Picture,
  DescriptionContent
} from './styles'

const makeSenseSectionData = [
  {
    icon: <MaleFemaleIcon fill="white" height={30} />,
    description: `Quando você quiser uma gestão profissional para
      buscar as melhores opções do mercado para seu dinheiro.`
  },
  {
    icon: <BarChartIcon fill="white" height={30} />,
    description: `Quando você quiser buscar um rendimento melhor do que o da poupança,
      sem correr, necessariamente, um risco maior.`
  },
  {
    icon: <SafeBoxIcon fill="white" height={30} />,
    description: `Quando você quiser se organizar para buscar seus sonhos,
      economizando seu dinheiro e esperando rendimentos melhores.`
  }
]

const downloadFileSectionData = [
  {
    title: 'quadro de rentabilidade',
    description:
      'Acompanhe o rendimento mais atualizado de todos os fundos de Investimentos da Porto Seguro.'
  },
  {
    title: 'carta do gestor',
    description:
      'Comentários sobre a estratégia dos fundos de Investimentos e, também, um pouco da visão do cenário econômico atual.'
  }
]

export default function Investments() {
  return (
    <>
      <TopBanner
        title="Fundos de Investimentos"
        description="Com o Conquista, você pode investir em Fundos de Investimento da Porto Seguro e de gestoras parceiras. Consulte a Lista de Fundos e conheça opções para diversos perfis."
        buttonText="Lista de fundos"
        image={BannerInvestimentosImage}
        imageDescription="Homem pesquisando investimentos em um website em seu computador"
      />
      <BulletsSection
        title="Por que investir em Fundos?"
        imageURL={SeloInvestimentoImage}
        data={[
          'Você pode investir para construir e aumentar seu patrimônio, realizar os seus sonhos ou multiplicar seu dinheiro.',
          'Com opções de baixo a alto risco, os fundos têm tipos e retornos variados, atendendo a todos os perfis de investidores (conservador, moderado, arrojado e agressivo).',
          'Os fundos são aplicações que somam vários ativos. Gerenciados por especialistas, facilitam o dia a dia de quem quer diversificar sem precisar administrar ativamente.',
          'Os fundos têm períodos variados de resgate, que é o tempo para reaver o dinheiro. Você pode usá-los para organizar metas a curto, médio ou longo prazo.'
        ]}
      />
      <MakeSenseSection
        title="Quando faz sentido investir?"
        data={makeSenseSectionData}
      />
      <HighlightSection
        title="Facilidade para investir"
        mainDescription="Com o Conquista, é prático e rápido investir."
        subDescription="Você confere as opções disponíveis na Lista de Fundo, consulta
        informações detalhadas de cada um e realiza seus investimentos com a
        segurança de uma plataforma da Porto Seguro."
        buttonText="lista de fundos"
      />
      <SectionCustomPicture backgroundColor="#d6dde5">
        <CustomContent>
          <Picture>
            <img src={RedHairGirlImage} alt="Mulher feliz" />
          </Picture>
          <DescriptionContent>
            <h1>Investindo em objetivos</h1>
            <p>
              No Conquista, você tem total controle para escolher os Fundos de
              Investimentos que preferir, além de auxílio inteligente para
              encontrar opções adequadas ao seu perfil e ao que você busca.
              <br />
              <br />
              Crie objetivos e aproveite os planos personalizados que a
              ferramenta apresenta para investir com mais facilidade.
            </p>
            <Button color="primary">Criar Objetivo</Button>
          </DescriptionContent>
        </CustomContent>
      </SectionCustomPicture>

      <FundsCarouselSection />

      <FileDownloadSection data={downloadFileSectionData} />
    </>
  )
}
