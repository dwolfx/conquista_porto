import React from 'react'
// import { uuid } from 'uuidv4'

import { StepComponent } from 'hooks/FluxManagement/types'
import Text from 'components/Text'
import ButtonLink from 'components/Button/Link'
import Divisor from 'components/Divisor'
// import useMedia from 'hooks/useMedia'
// import useStackFluxManagement from 'hooks/FluxManagement/useStackFluxManagement'

// import HorizontalCard from './HorizontalCard'
// import VerticalCard from './VerticalCard'

import * as s from './styles'

// eslint-disable-next-line arrow-body-style
const ChoosePlan: StepComponent = () => {
  // const isXs = useMedia('xs')
  // const isSmUp = useMedia('smUp')
  // const isMd = useMedia('md')
  // const IsMdUp = useMedia('mdUp')
  // const Islg = useMedia('lg')
  // const [selectedCard, setSelectedCard] = useState('Brasil Prata')

  // const { instantiate } = useStackFluxManagement<{}>()

  // const renderDesktop = (plans: t.IPlan[]) => {
  //   if (plans.length === 1) {
  //     return (
  //       <HorizontalCard
  //         planInformation={plans[0]}
  //         selectedCard={selectedCard}
  //         setSelectedCard={setSelectedCard}
  //       />
  //     )
  //   }
  //   return plans.map(plan => (
  //     <VerticalCard
  //       planInformation={plan}
  //       key={uuid()}
  //       selectedCard={selectedCard}
  //       setSelectedCard={setSelectedCard}
  //     />
  //   ))
  // }

  // const renderCards = (plans: t.IPlan[]) => {
  //   switch (true) {
  //     // mobile
  //     case isXs:
  //       return plans.map(plan => (
  //         <VerticalCard
  //           planInformation={plan}
  //           key={uuid()}
  //           selectedCard={selectedCard}
  //           setSelectedCard={setSelectedCard}
  //         />
  //       ))
  //     // vertical tablet
  //     case isSmUp && isMd:
  //       return plans.map(plan => (
  //         <HorizontalCard
  //           planInformation={plan}
  //           key={uuid()}
  //           selectedCard={selectedCard}
  //           setSelectedCard={setSelectedCard}
  //         />
  //       ))
  //     // vertical tablet
  //     case IsMdUp && Islg:
  //       return plans.map(plan => (
  //         <HorizontalCard
  //           planInformation={plan}
  //           key={uuid()}
  //           selectedCard={selectedCard}
  //           setSelectedCard={setSelectedCard}
  //         />
  //       ))
  //     // desktop
  //     default:
  //       return renderDesktop(plans)
  //   }
  // }

  return (
    <>
      <s.Container>
        <s.Col lg={3} md={3} sm={12}>
          <s.InformationWrapper>
            <s.Text type="heading4" bold>
              Proposta de Seguro Viagem especial para você!
            </s.Text>
            <Text type="headline">
              Se precisar tirar dúvidas fale com seu parceiro.
            </Text>
          </s.InformationWrapper>
        </s.Col>
        <s.Col lg={8} md={9} sm={12}>
          <s.Card>
            <s.CardTitleWrapper>
              <Text bold type="subheading" color="gray5">
                DETALHES DA VIAGEM
              </Text>
              <ButtonLink>
                <Text bold type="button" color="blue4">
                  ALTERAR
                </Text>
              </ButtonLink>
            </s.CardTitleWrapper>
            <s.DataDisplayer label="Origem" value="Brasil" />
            <Divisor />
            <s.DataDisplayer label="Destino" value="Nacional" />
            <Divisor />
            <s.DataDisplayer
              label="Período"
              value="10/10/2020 até 10/11/2020"
            />
            <Divisor />
            <s.DataDisplayer label="Passageiros" value="Até 71 anos: 02" />
            <Divisor />
            <s.DataDisplayer
              label="Coberturas: Esportes"
              value="Não irei praticar"
            />
            <s.DataDisplayer
              label="Coberturas: Motocicleta"
              value="Não irei praticar"
            />
          </s.Card>
          {/* <s.PlansContainer>{renderCards(planos)}</s.PlansContainer> */}
        </s.Col>
      </s.Container>
      <s.FooterContainer>
        <s.FooterCol lg={11}>
          <s.NextButton color="primary" outline>
            REJEITAR PROPOSTA
          </s.NextButton>
          <s.NextButton
            color="secondary"
            onClick={() =>
              console.log('instantiate(Steps.proposalSummaryForm)')
            }
          >
            AVANÇAR
          </s.NextButton>
        </s.FooterCol>
      </s.FooterContainer>
    </>
  )
}

export default ChoosePlan
