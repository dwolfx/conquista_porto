import React, { useContext } from 'react'
import { ThemeContext } from 'styled-components'

import TopBanner from '../../components/Solutions/TopBanner'
import Button from '../../components/Button'

import { ReactComponent as BarChartIcon } from '../../assets/icons/bar-chart.svg'
import { ReactComponent as FinancialIcon } from '../../assets/icons/financial.svg'
import { ReactComponent as GlobeIcon } from '../../assets/icons/globe.svg'
import { ReactComponent as CreditCard2 } from '../../assets/icons/credit-card2.svg'

import Card01Image from '../../assets/images/pages/points/card01.jpg'
import Card02Image from '../../assets/images/pages/points/card02.jpg'
import Card03Image from '../../assets/images/pages/points/card03.jpg'
import Card04Image from '../../assets/images/pages/points/card04.jpg'
import Card05Image from '../../assets/images/pages/points/card05.jpg'

import {
  PointsContainer,
  Point,
  GoToLink,
  PointsWrapper,
  PointHeadline,
  PointText,
  RescuePointsSection,
  RescuePointsTitle,
  RelationshipProgramSection,
  RelationshipProgramTitle,
  RelationshipProgram,
  RelationshipProgramItem,
  BenefitsSection,
  BenefitsTitle,
  BenefitsDescription,
  BenefitsItems,
  BenefitItem,
  BenefitsSectionContent,
} from './styles'

import BannerInvestimentosImage from '../../assets/images/banner_pontos.jpg'

const settings = {
  slidesToShow: 3,
  slidesToScroll: 3,
  responsive: [
    {
      breakpoint: 770,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 2,
        arrows: false,
      },
    },
    {
      breakpoint: 600,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows: false,
      },
    },
  ],
}

export default function Points() {
  const themeContext = useContext(ThemeContext)
  return (
    <>
      <TopBanner
        title="Pontos"
        description="Acumule pontos ao investir e contratar com o Conquista. Confira sua pontuação no Programa de
        Relacionamento e aproveite as diversas opções de trocas, descontos e benefícios."
        image={BannerInvestimentosImage}
        imageDescription="Grupo de amigos sorrindo"
      />
      <PointsContainer>
        <PointText>PONTOS</PointText>
        <PointsWrapper settings={settings}>
          <Point>
            <PointHeadline fontSize={18}>Saldo atual</PointHeadline>
            <PointHeadline fontSize={34} colorText={themeContext.colors.blue4}>
              16.500
            </PointHeadline>
            <PointText>PONTOS</PointText>
            <GoToLink
              data-gtm-type="click"
              data-gtm-clicktype="link"
              data-gtm-subname="saldo atual"
              data-gtm-name="ver extrato"
            >
              ver extrato &gt;
            </GoToLink>
          </Point>
          <Point>
            <PointHeadline fontSize={18}>Saldo atual</PointHeadline>
            <PointHeadline fontSize={34} colorText={themeContext.colors.blue4}>
              16.500
            </PointHeadline>
            <PointText>PONTOS</PointText>
            <GoToLink
              data-gtm-type="click"
              data-gtm-clicktype="link"
              data-gtm-subname="saldo atual"
              data-gtm-name="ver extrato"
            >
              ver extrato &gt;
            </GoToLink>
          </Point>
          <Point>
            <PointHeadline fontSize={18}>Saldo atual</PointHeadline>
            <PointHeadline fontSize={34} colorText={themeContext.colors.blue4}>
              16.500
            </PointHeadline>
            <PointText>PONTOS</PointText>
            <GoToLink
              data-gtm-type="click"
              data-gtm-clicktype="link"
              data-gtm-subname="saldo atual"
              data-gtm-name="ver extrato"
            >
              ver extrato &gt;
            </GoToLink>
          </Point>
        </PointsWrapper>
      </PointsContainer>
      <RescuePointsSection>
        <RescuePointsTitle>
          Conheça as ofertas e veja o que você pode resgatar com o seu saldo
          atual.
        </RescuePointsTitle>
        <Button
          data-gtm-type="click"
          data-gtm-clicktype="link"
          data-gtm-subname="Conheça as ofertas e veja o que você pode resgatar com o seu saldo
        atual"
          data-gtm-name="resgatar pontos"
          color="secondary"
          className="button-with-right-icon"
        >
          Resgatar Pontos <span>&gt;</span>
        </Button>
      </RescuePointsSection>
      <RelationshipProgramSection>
        <RelationshipProgramTitle>
          COMO ACUMULAR PONTOS NO PROGRAMA DE RELACIONAMENTO DO CONQUISTA?
        </RelationshipProgramTitle>
        <RelationshipProgram>
          <RelationshipProgramItem>
            <div>
              <BarChartIcon fill={themeContext.colors.gray5} height={36} />
            </div>
            <p>
              Invista e pontue todo mês com seu saldo em Fundos e Previdência
              Privada.
            </p>
          </RelationshipProgramItem>
          <RelationshipProgramItem>
            <div>
              <GlobeIcon fill={themeContext.colors.gray5} height={36} />
            </div>
            <p>
              Contrate soluções da Porto Seguro com o Conquista e acumule
              pontos.
            </p>
          </RelationshipProgramItem>
          <RelationshipProgramItem>
            <div>
              <CreditCard2 fill={themeContext.colors.gray5} height={36} />
            </div>
            <p>
              Some o seu saldo com os pontos do Cartão de Crédito Porto Seguro.
            </p>
          </RelationshipProgramItem>
          <RelationshipProgramItem>
            <div>
              <FinancialIcon fill={themeContext.colors.gray5} height={36} />
            </div>
            <p>
              Ganhe a partir de 1 ponto a cada R$ 1.000,00 em investimentos.
            </p>
          </RelationshipProgramItem>
          <RelationshipProgramItem>
            <div>
              <FinancialIcon fill={themeContext.colors.gray5} height={36} />
            </div>
            <p>
              Ganhe 1 ponto a cada R$ 1,00 pago em Seguro Viagem e Seguro de
              Vida.
            </p>
          </RelationshipProgramItem>
          <RelationshipProgramItem>
            <div>
              <FinancialIcon fill={themeContext.colors.gray5} height={36} />
            </div>
            <p>
              Ganhe 1 ponto a cada R$ 50,00 de crédito no Financiamento de
              Veículo ou Consórcio.
            </p>
          </RelationshipProgramItem>
        </RelationshipProgram>
      </RelationshipProgramSection>
      <BenefitsSection>
        <BenefitsSectionContent>
          <BenefitsTitle>
            Benefícios do Programa de Relacionamento
          </BenefitsTitle>
          <BenefitsDescription>
            Você pode trocar os seus pontos por produtos, descontos e diversas
            vantagens.
          </BenefitsDescription>
          <BenefitsItems>
            <BenefitItem>
              <img src={Card02Image} alt="4 homens posando para foto" />
              <div>
                <p>Porto Seguro</p>
                <p>Vouchers e descontos</p>
              </div>
            </BenefitItem>
            <BenefitItem>
              <img src={Card01Image} alt="Mulher feliz fazendo anotações" />
              <div>
                <p>Produtos</p>
                <p>Várias categorias e utilidades</p>
              </div>
            </BenefitItem>
            <BenefitItem>
              <img src={Card03Image} alt="Por do Sol na praia" />
              <div>
                <p>Viagens</p>
                <p>Passagens, hotéis e pacotes.</p>
              </div>
            </BenefitItem>
            <BenefitItem>
              <img src={Card04Image} alt="Mapa mundi em cima de uma mesa" />
              <div>
                <p>Experiências</p>
                <p>Ingressos, passeios e bem-estar.</p>
              </div>
            </BenefitItem>
            <BenefitItem>
              <img
                src={Card05Image}
                alt="Rapaz posando para foto tomando café"
              />
              <div>
                <p>Moda</p>
                <p>Feminino, masculino e kids.</p>
              </div>
            </BenefitItem>
          </BenefitsItems>
        </BenefitsSectionContent>
      </BenefitsSection>
    </>
  )
}
