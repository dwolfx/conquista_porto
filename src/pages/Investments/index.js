import React from 'react'
import PropTypes from 'prop-types'

import Button from 'components/Button'
import TopBanner from 'components/Solutions/TopBanner'
import BulletsSection from 'components/Solutions/BulletsSection'
import MakeSenseSection from 'components/Solutions/MakeSenseSection'
import HighlightSection from 'components/Solutions/HighlightSection'
import FileDownloadSection from 'components/Solutions/FileDownloadSection'
import FundsCarouselSection from 'components/Solutions/Investments/FundsCarousel/index'

import RedHairGirlImage from 'assets/images/red_hair_girl.jpg'
import BannerInvestimentosImage from 'assets/images/banner_investimentos.jpg'
import SeloInvestimentoImage from 'assets/images/selo_investimento.svg'

import {
  SectionCustomPicture,
  CustomContent,
  Picture,
  DescriptionContent,
} from './styles'

const makeSenseSectionData = [
  {
    icon: 'malefemale',
    description: `Quando você quiser uma gestão profissional para
      buscar as melhores opções do mercado para seu dinheiro.`,
  },
  {
    icon: 'barchart',
    description: `Quando você quiser buscar um rendimento melhor do que o da poupança,
      sem correr, necessariamente, um risco maior.`,
  },
  {
    icon: 'safebox',
    description: `Quando você quiser se organizar para buscar seus sonhos,
      economizando seu dinheiro e esperando rendimentos melhores.`,
  },
]

const makeSenseBenefitsSectionData = [
  {
    icon: 'talkman',
    title: 'Gerente de conta',
    description:
      'Possibilidade de apoio de um gerente para te ajudar em contratações e dúvidas.',
  },
  {
    icon: 'diamond',
    title: 'Programa de Relacionamento',
    description:
      'Pontos que podem ser trocados por descontos em produtos Porto Seguro e até por viagens.',
  },
  {
    icon: 'callcenter',
    title: 'Chat inteligente',
    description: 'Para te ajudar com informações e dicas em qualquer momento.',
  },
  {
    icon: 'apps',
    title: 'Facilidade',
    description:
      'A contratação é rápida e descomplicada, feita para facilitar sua vida.',
  },
]

const downloadFileSectionData = [
  {
    title: 'Cenário Econômico',
    description:
      'Comentários sobre a estratégia dos fundos de Investimentos e, também, um pouco da visão do cenário econômico atual.',
    buttonText: 'Visualizar',
    url:
      'https://www.portoseguro.com.br/NovoInstitucional/static_files/documents/para-mim/investimentos/relatorio%20economico/Relatorio_Economico_Mensal.pdf',
  },
  {
    title: 'Tabela de Rentabilizade Mensal',
    description:
      'Acompanhe o rendimento mais atualizado de todos os fundos de Investimentos da Porto Seguro.',
    buttonText: 'Visualizar',
    url:
      'https://www.portoseguro.com.br/NovoInstitucional/static_files/documents/para-mim/investimentos/fundos-de-terceiros/Tabela-Mensal/TABELAMENSALDEFUNDOS.pdf',
  },
]

export default function Investments({ history }) {
  return (
    <>
      <TopBanner
        title="Fundos de Investimentos"
        description="Com o Conquista, você pode investir em Fundos de Investimento da Porto Seguro e de gestoras parceiras. Consulte a Lista de Fundos e conheça opções para diversos perfis."
        buttonText="Lista de fundos"
        image={BannerInvestimentosImage}
        imageDescription="Homem pesquisando investimentos em um website em seu computador"
        onClick={() => history.push('/investimentos/lista-fundos')}
      />
      <BulletsSection
        title="Por que investir em Fundos?"
        imageURL={SeloInvestimentoImage}
        data={[
          'Você pode investir para construir e aumentar seu patrimônio, realizar os seus sonhos ou multiplicar seu dinheiro.',
          'Com opções de baixo a alto risco, os fundos têm tipos e retornos variados, atendendo a todos os perfis de investidores (conservador, moderado, arrojado e agressivo).',
          'Os fundos são aplicações que somam vários ativos. Gerenciados por especialistas, facilitam o dia a dia de quem quer diversificar sem precisar administrar ativamente.',
          'Os fundos têm períodos variados de resgate, que é o tempo para reaver o dinheiro. Você pode usá-los para organizar metas a curto, médio ou longo prazo.',
        ]}
      />
      <MakeSenseSection
        title="Quando faz sentido investir?"
        subtitle="Vantagens ao contratar aqui:"
        data={makeSenseSectionData}
        benefitsData={makeSenseBenefitsSectionData}
      />
      <HighlightSection
        title="Facilidade para investir"
        mainDescription="Com o Conquista, é prático e rápido investir."
        subDescription="Você confere as opções disponíveis na Lista de Fundo, consulta
        informações detalhadas de cada um e realiza seus investimentos com a
        segurança de uma plataforma da Porto Seguro."
        buttonText="lista de fundos"
        onClick={() => history.push('/investimentos/lista-fundos')}
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
            <Button
              color="primary"
              data-gtm-type="click"
              data-gtm-clicktype="button"
              data-gtm-subname="banner - investindo em objetivos"
              data-gtm-name="criar objetivo"
            >
              Criar Objetivo
            </Button>
          </DescriptionContent>
        </CustomContent>
      </SectionCustomPicture>
      <FundsCarouselSection />
      <FileDownloadSection data={downloadFileSectionData} />
    </>
  )
}

Investments.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }),
}

Investments.defaultProps = {
  history: {
    push: () => {},
  },
}
