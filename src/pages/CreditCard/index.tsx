import React from 'react'
import { useDispatch, useSelector } from 'react-redux'

import BannerCartaoCreditoImage from 'assets/images/pages/solutions/creditCard/banner_cartao_credito.jpg'
import SeloCartaoCredito from 'assets/images/pages/solutions/creditCard/selo-cartao-credito.svg'

import TopBanner from 'components/Solutions/TopBanner'
import BulletsSection from 'components/Solutions/BulletsSection'
import MakeSenseSection from 'components/Solutions/MakeSenseSection'
import HighlightSection from 'components/Solutions/HighlightSection'
import FileDownloadSection from 'components/Solutions/FileDownloadSection'
import MoreDetails from 'components/Solutions/MoreDetails'
import {
  CloseCreationLayer,
  OpenCreationLayer,
} from 'store/modules/CreditCard/action'
import { ICreditCardState } from 'store/modules/CreditCard/types'

import Creation from './Creation'

const makeSenseSectionData = [
  {
    icon: 'creditcard2',
    description: `Quando você quiser pagar suas despesas sem precisar de dinheiro à mão e podendo parcelar.`,
  },
  {
    icon: 'calendar',
    description: `Quando você quiser fazer uma compra hoje e pagar dias depois, só no fechamento da fatura.`,
  },
  {
    icon: 'thumbsup',
    description: `Quando você quiser ganhar benefícios, como pontos no Programa de Relacionamento.`,
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
    title: 'Sistema de informações de crédito - SCR',
    description: 'Informações legais sobre crédito.',
    buttonText: 'Visualizar',
    willRedirect: true,
    url: 'https://www.portoseguro.com.br/cartao-de-credito',
  },
  {
    title: 'Tabela de tarifas',
    description:
      'Mais informações sobre tarifas envolvidas na contratação de cartão de crédito.',
    buttonText: 'Visualizar',
    willRedirect: true,
    url: 'https://www.portoseguro.com.br/cartao-de-credito',
  },
  {
    title: 'Condições gerais',
    description:
      'Mais detalhes sobre as condições de contratação, taxas de juros e outras informações sobre o Cartão de Crédito da Porto Seguro.',
    buttonText: 'Visualizar',
    willRedirect: true,
    url: 'https://www.portoseguro.com.br/cartao-de-credito',
  },
]

const moreDetailsData = [
  {
    img: 'carousel-01',
    imgTitle: 'Parcelando as compras',
    imgDescription:
      'O Cartão de Crédito Porto Seguro permite parcelar as compras, dando a opção de usar seu limite para outras finalidades. Mas, apesar dessa vantagem, é preciso ficar atento ao limite, que será reduzido com o valor total das compras e não apenas com as parcelas referentes ao mês.',
    imgPath: 'creditCard',
  },
  {
    img: 'carousel-02',
    imgTitle: 'Ferramenta de controle',
    imgDescription:
      'Com o Cartão de Crédito Porto Seguro, você pode ter suas despesas registradas na fatura para facilitar seu controle financeiro. E também pode parcelar compras para resolver problemas sem que eles comprometam seu orçamento, além de contar com o limite para não se exceder.',
    imgPath: 'creditCard',
  },
  {
    img: 'carousel-03',
    imgTitle: 'Relacionamento',
    imgDescription:
      'Concentrando o pagamento das compras no Cartão de Crédito Porto Seguro, você pode acumular pontos para trocar por descontos em seguros e por serviços para a casa ou para o carro. Ou pode optar por trocar por produtos de lojas parceiras ou por milhas aéreas.',
    imgPath: 'creditCard',
  },
]

export default function CreditCard() {
  const dispatch = useDispatch()
  const { isCreationLayerOpen } = useSelector(
    (state: { creditCard: ICreditCardState }) => ({
      isCreationLayerOpen: state.creditCard.isCreationLayerOpen,
    })
  )

  return (
    <>
      <TopBanner
        title="Cartão de Crédito"
        description="O Cartão de Crédito que resolve e ainda dá vantagens e benefícios da Porto Seguro para você, sua casa e seu carro. Configure seu cartão e contrate com a facilidade do Conquista."
        buttonText="Simule e Contrate"
        image={BannerCartaoCreditoImage}
        imageDescription="Mulher segurando cartão de crédito em casa"
        onClick={() => dispatch(OpenCreationLayer())}
      />
      <BulletsSection
        title="Por que contratar o Cartão de Crédito?"
        imageURL={SeloCartaoCredito}
        data={[
          'Com o Cartão de Crédito Porto Seguro, você pode realizar compras presenciais e online, contando com a facilidade de parcelar.',
          'Além das formas tradicionais de uso, você pode contar com o contactless - pagamento por aproximação - e o cartão virtual, que dá mais segurança para suas compras online.',
          'A 1ª anuidade é grátis* e, a partir do 2° ano, as mensalidades podem ter descontos de acordo com o valor de cada fatura, podendo até sair de graça.',
          'Ao usar o cartão, você acumula pontos no Programa de Relacionamento e pode trocá-los por milhas, passagens, descontos em soluções da Porto Seguro e mais.',
        ]}
        observation="*Exceto para Cartões Porto Seguro Visa Infinite e Mastercard Black."
      />
      <MakeSenseSection
        title="Quando faz sentido contratar um Cartão de Crédito?"
        subtitle="Vantagens ao contratar com o conquista:"
        data={makeSenseSectionData}
        benefitsData={makeSenseBenefitsSectionData}
      />
      <HighlightSection
        title="O cartão cheio de vantagens."
        mainDescription="Descontos em seguros para você, para sua casa e para seu carro."
        subDescription="Além das conveniências da Porto Seguro, o Cartão de Crédito tem bandeiras e limites para
        vários perfis. Inclusive, na simulação, você pode verificar se há pré-aprovações para você."
        buttonText="Simular e contratar"
        onClick={() => dispatch(OpenCreationLayer())}
      />

      <MoreDetails title="Saiba mais:" data={moreDetailsData} />

      <FileDownloadSection data={downloadFileSectionData} />

      {isCreationLayerOpen && (
        <Creation
          isOpen={isCreationLayerOpen}
          handleClose={() => dispatch(CloseCreationLayer())}
        />
      )}
    </>
  )
}
