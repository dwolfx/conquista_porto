import React from 'react'
import PropTypes from 'prop-types'

import TopBanner from '../../components/Solutions/TopBanner'
import BulletsSection from '../../components/Solutions/BulletsSection'
import MakeSenseSection from '../../components/Solutions/MakeSenseSection'
import HighlightSection from '../../components/Solutions/HighlightSection'
import FileDownloadSection from '../../components/Solutions/FileDownloadSection'
import MoreDetails from '../../components/Solutions/MoreDetails'
import { Container } from './styles'
import Banner from '../../assets/images/pages/solutions/consortium/vehicle/banner.jpg'
import BulletImage from '../../assets/images/pages/solutions/consortium/vehicle/selo-consorcio-auto.svg'

export default function ConsortiumVehicle({ history }) {
  return (
    <Container>
      <TopBanner
        title="Consórcio de Veículos"
        description="Seu carro novo ou seminovo sem juros. Informando o valor do crédito ou das parcelas que você deseja, simule e contrate um consórcio com a credibilidade da Porto Seguro."
        buttonText="SIMULAR E CONTRATAR"
        onClick={() => history.push('/consorcio-veiculo/visualizar')}
        image={Banner}
      />
      <BulletsSection
        title="Por que contratar o Consórcio de Veículo?"
        imageURL={BulletImage}
        data={[
          'O consórcio é uma opção para você comprar um veículo sem juros. Você pode escolher modelos novos ou seminovos entre as principais marcas do mercado.',
          'Para aumentar suas chances de receber o valor solicitado, o consórcio tem duas formas contemplação: sorteios e lances. Os dois acontecem todos os meses.',
          'A carta de crédito do Consórcio de Veículo equivale a dinheiro vivo, melhorando suas condições de negociação no momento da compra.',
          'Há planos de até 80 meses, viabilizando parcelas acessíveis e permitindo que você defina uma parcela adequada ao seu orçamento.',
        ]}
      />
      <MakeSenseSection
        title="Quando faz sentido participar de um Consórcio de Veículos?"
        data={[
          {
            description:
              'Quando você quiser comprar um carro sem uma data determinada.',
            icon: 'car2',
          },
          {
            description:
              'Quando você não tem o valor da entrada e busca uma forma disciplinada de juntar dinheiro.',
            icon: 'barchart',
          },
          {
            description:
              'Quando você não quer um comprometimento de longo prazo e/ou juros.',
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
        mainDescription="Com o Conquista, você planeja a compra do seu carro novo ou seminovo."
        subDescription="Você pode fazer quantas simulações quiser, escolhendo entre as opções parcela mensal e crédito total. Assim, conhece os planos disponíveis e contrata de acordo com seus interesses."
        buttonText="SIMULAR E CONTRATAR"
        onClick={() => history.push('/consorcio-veiculo/visualizar')}
      />
      <MoreDetails
        title="SAIBA MAIS:"
        data={[
          {
            img: 'carousel-01',
            imgPath: 'consortium/vehicle',
            imgTitle: 'Tente um lance',
            imgDescription:
              'Você não precisa contar apenas com a sorte para ser contemplado no consórcio. Todos os meses, há a possibilidade de você dar um lance maior do que o valor ofertado por outros participantes do seu grupo para conquistar o seu sonho.',
          },
          {
            img: 'carousel-02',
            imgPath: 'consortium/vehicle',
            imgTitle: 'Valor do consórcio como parte do lance',
            imgDescription:
              'Para conseguir dar um lance mais alto e aumentar suas chances de ser contemplado, você pode usar parte do valor do consórcio como complemento ao que foi ofertado. Cada consórcio tem suas regras, basta se informar sobre a existência desse benefício.',
          },
          {
            img: 'carousel-03',
            imgPath: 'consortium/vehicle',
            imgTitle: 'Escolha qualquer veículo',
            imgDescription:
              'Ao fazer um consórcio, será utilizado um veículo específico como referência. No entanto, como o valor obtido com o consórcio é em dinheiro, você pode usá-lo para adquirir qualquer outro veículo sem restrição de modelo.',
          },
        ]}
      />
      <FileDownloadSection
        data={[
          {
            title: 'SISTEMA DE INFORMAÇÕES DE CRÉDITO - SRC',
            description: 'Mais informações legais sobre consórcio.',
            buttonText: 'BAIXAR ARQUIVO',
          },
          {
            title: 'CONDIÇÕES GERAIS',
            description:
              'Mais detalhes sobre as condições de contratação, taxas de juros e outras informações sobre o Consórcio de Veículos da Porto Seguro.',
            buttonText: 'BAIXAR ARQUIVO',
          },
          {
            title: 'TABELA DE TARIFAS',
            description:
              'Confira mais informações sobre tarifas envolvidas na contratação de consórcio.',
            buttonText: 'VISUALIZAR',
          },
        ]}
      />
    </Container>
  )
}

ConsortiumVehicle.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
}
