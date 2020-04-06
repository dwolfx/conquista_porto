import React from 'react'

import Banner from 'assets/images/pages/solutions/tripInsurance/banner.jpg'
import BulletImage from 'assets/images/pages/solutions/tripInsurance/selo-seguro-viagem.svg'

import TopBanner from 'components/Solutions/TopBanner'
import BulletsSection from 'components/Solutions/BulletsSection'
import MakeSenseSection from 'components/Solutions/MakeSenseSection'
import HighlightSection from 'components/Solutions/HighlightSection'
import FileDownloadSection from 'components/Solutions/FileDownloadSection'
import MoreDetails from 'components/Solutions/MoreDetails'

import { handleGiwRedirect } from 'helpers'

import { Container } from './styles'

export default function TripInsurance() {
  return (
    <Container>
      <TopBanner
        title="Seguro Viagem"
        description="Viaje com tranquilidade e tenha assistência 24h da Porto Seguro em qualquer lugar do mundo. Faça uma simulação informando os detalhes da viagem e contrate em alguns cliques."
        buttonText="SIMULAR E CONTRATAR"
        onClick={() =>
          handleGiwRedirect(
            'portaldecliente/conquista/seguro-viagem/simular?r=true'
          )
        }
        image={Banner}
      />
      <BulletsSection
        title="Por que contratar o Seguro Viagem?"
        imageURL={BulletImage}
        data={[
          'O Seguro Viagem protege você e/ou sua família em viagens nacionais e internacionais, podendo ser acionado de qualquer lugar do mundo.',
          'Com coberturas para períodos variados, incluindo intercâmbios, o seguro também inclui assistência 24h da Porto Seguro e orientação para diversas situações.',
          'Especificamente para os países europeus inclusos no Tratado de Schengen, o Seguro Viagem é obrigatório. Então, contratá-lo é essencial para evitar impedimentos.',
        ]}
      />
      <MakeSenseSection
        title="Quando faz sentido contratar um Seguro Viagem?"
        data={[
          {
            description:
              'Quando você for viajar para locais não incluídos na cobertura do seu plano de saúde.',
            icon: 'plane',
          },
          {
            description:
              'Quando você quiser ter auxílio com orientações em viagens nacionais ou internacionais.',
            icon: 'businesswoman',
          },
          {
            description:
              'Quando você quiser proteger seus dependentes, caso aconteça algo com você na viagem.',
            icon: 'persongroup',
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
        title="Tranquilidade para viajar."
        mainDescription="O Conquista acompanha você do planejamento da viagem à realização."
        subDescription="Informando detalhes como local e data, você pode simular coberturas e assistências nacionais e internacionais. Na sequência, basta escolher um plano e contratar."
        buttonText="SIMULAR E CONTRATAR"
        onClick={() =>
          handleGiwRedirect(
            'portaldecliente/conquista/seguro-viagem/simular?r=true'
          )
        }
      />
      <MoreDetails
        title="SAIBA MAIS:"
        data={[
          {
            img: 'carousel-03',
            imgPath: 'tripInsurance',
            imgTitle: 'Desconto em hotéis para pet',
            imgDescription:
              'Com o Porto Seguro Viagem, você conta com vários estabelecimentos parceiros, que oferecem descontos e condições especiais para você hospedar seu pet com muita tranquilidade durante o período em que você estiver viajando. *Benefício válido apenas para a região de São Paulo.',
          },
          {
            img: 'carousel-02',
            imgPath: 'tripInsurance',
            imgTitle: 'Extensão de vigência',
            imgDescription:
              'Caso você não possa retornar de sua viagem por razões médicas ou por acidente de algum evento coberto, o prazo de vigência das coberturas será estendido até que você consiga voltar para sua cidade ou para o local de início da viagem, respeitando os limites de valores contratados.',
          },
          {
            img: 'carousel-01',
            imgPath: 'tripInsurance',
            imgTitle: 'Porto Seguro Viaje Bem',
            imgDescription:
              'O Seguro Viagem é uma boa maneira de garantir sua tranquilidade. Com ele, você tem assistência 24h e, ainda, conta com reserva e compras de passagens aéreas, organização de pacotes de viagem, reservas de hotéis, dicas com roteiros culturais e de lazer e orientações para você viajar sem preocupação.',
          },
        ]}
      />
      <FileDownloadSection
        data={[
          {
            title: 'CONDIÇÕES GERAIS',
            description:
              'Confira mais detalhes sobre as condições de contratação, taxas de juros e outras informações sobre o Seguro Viagem da Porto Seguro.',
            buttonText: 'Visualizar',
            willRedirect: true,
            url: 'https://www.portoseguro.com.br/seguro-viagem',
          },
        ]}
      />
    </Container>
  )
}
