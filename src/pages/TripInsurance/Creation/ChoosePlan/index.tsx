import React, { useState } from 'react'
import Text from 'components/Text'
import Switch from 'components/Inputs/Switch'
import * as s from './styles'
import PlanCard from './PlanCard'
import useMedia from 'hooks/useMedia'

import ComparativeModal from '../ComparativeModal'
import EditDrawer from '../EditDrawer'
import { StepComponent } from 'hooks/FluxManagement/types'

const planos = [
  {
    planName: 'Brasil Terra',
    rating: '1',
    installmentsAmount: '3x sem juros de R$ 209,97',
    upfrontAmount: 'R$ 659,82 à vista',
    firstCoverageAmount: 'R$ 150.000,00',
    secondCoverageAmount: 'R$ 250.000,00',
    thridCoverageAmount: 'R$ 350.000,00',
    isLoading: false,
  },
  {
    planName: 'Brasil Prata',
    rating: '2',
    installmentsAmount: '4x sem juros de R$ 209,97',
    upfrontAmount: 'R$ 759,82 à vista',
    firstCoverageAmount: 'R$ 160.000,00',
    secondCoverageAmount: 'R$ 260.000,00',
    thridCoverageAmount: 'R$ 360.000,00',
    isLoading: false,
  },
  {
    planName: 'Brasil Ouro',
    rating: '3',
    installmentsAmount: '5x sem juros de R$ 209,97',
    upfrontAmount: 'R$ 859,82 à vista',
    firstCoverageAmount: 'R$ 170.000,00',
    secondCoverageAmount: 'R$ 270.000,00',
    thridCoverageAmount: 'R$ 370.000,00',
    isLoading: true,
  },
]

const ChoosePlan: StepComponent = () => {
  const [isInstallmentPayment, setIsInstallmentPayment] = useState(false)
  const isMobile = useMedia('sm')
  const isTabletHorizontal = useMedia('mdUp')
  const isLgDown = useMedia('lg')
  const handleSwitch = () => setIsInstallmentPayment(!isInstallmentPayment)
  const [modalOpen, setModalOpen] = useState(false)
  const [isDrawerOpen, setIsDrawerOpen] = useState(false)

  return (
    <s.Container>
      <ComparativeModal isOpen={modalOpen} handleClose={setModalOpen} />
      <EditDrawer isDrawerOpen={isDrawerOpen} handleClose={setIsDrawerOpen} />
      <s.BackgroundWrapper>
        <s.DarkBackground />
        <s.ContentContainer>
          {isMobile ? (
            <s.ContextWrapper>
              <Text color="white" type="heading4">
                Seguro Viagem
              </Text>
            </s.ContextWrapper>
          ) : (
            <s.ContextWrapper>
              <s.SimulationText color="gray4" type="headline">
                Simulacao
              </s.SimulationText>
              <Text color="white" type="headline">
                Seguro Viagem
              </Text>
            </s.ContextWrapper>
          )}
          <s.Divider />
          <s.ContentWrapper>
            {planos.length === 2 && isTabletHorizontal && isLgDown ? (
              <s.TitleWrapperColumn>
                <s.Title color="white" type="heading3">
                  Escolha um plano disponível
                </s.Title>
                <s.SwitchWrapper>
                  <s.SwitchText
                    color="white"
                    type="subheading"
                    bold
                    textTransform="uppercase"
                  >
                    simular em até 12x sem juros com 5% de desconto no Cartão
                    Porto Seguro
                  </s.SwitchText>
                  <Switch
                    id="123"
                    value={isInstallmentPayment}
                    onChangeSwitch={handleSwitch}
                    disabled={false}
                    leftLabel=""
                    rightLabel=""
                  />
                </s.SwitchWrapper>
              </s.TitleWrapperColumn>
            ) : planos.length === 1 && isTabletHorizontal ? (
              <s.TitleWrapperCentralized>
                <s.SwitchWrapper>
                  <s.SwitchText
                    color="white"
                    type="subheading"
                    bold
                    textTransform="uppercase"
                  >
                    simular em até 12x sem juros com 5% de desconto no Cartão
                    Porto Seguro
                  </s.SwitchText>
                  <Switch
                    id="123"
                    value={isInstallmentPayment}
                    onChangeSwitch={handleSwitch}
                    disabled={false}
                    leftLabel=""
                    rightLabel=""
                  />
                </s.SwitchWrapper>
              </s.TitleWrapperCentralized>
            ) : (
              <s.TitleWrapper>
                <s.Title
                  color="white"
                  type={isMobile ? 'heading4' : 'heading3'}
                >
                  Escolha um plano disponível
                </s.Title>
                <s.SwitchWrapper>
                  <s.SwitchText
                    color="white"
                    type="subheading"
                    bold
                    textTransform="uppercase"
                  >
                    simular em até 12x sem juros com 5% de desconto no Cartão
                    Porto Seguro
                  </s.SwitchText>
                  <Switch
                    id="123"
                    value={isInstallmentPayment}
                    onChangeSwitch={handleSwitch}
                    disabled={false}
                    leftLabel=""
                    rightLabel=""
                  />
                </s.SwitchWrapper>
              </s.TitleWrapper>
            )}
            <s.CardsWrapper>
              {planos.map(plano => (
                <PlanCard
                  planName={plano.planName}
                  rating={plano.rating}
                  installmentsAmount={plano.installmentsAmount}
                  upfrontAmount={plano.upfrontAmount}
                  firstCoverageAmount={plano.firstCoverageAmount}
                  secondCoverageAmount={plano.secondCoverageAmount}
                  thridCoverageAmount={plano.thridCoverageAmount}
                  isLoading={plano.isLoading}
                  key={plano.planName}
                  onHireClick={() => {}}
                />
              ))}
            </s.CardsWrapper>
          </s.ContentWrapper>
          <s.DisclosureWrapper>
            <Text color="gray5" bold>
              Importante: As coberturas de seguro e serviços de assistência
              possuem restrições para indenização e/ou prestação de serviços,
              com riscos excluídos.
            </Text>
            <Text color="gray5" bold>
              Consulte as{' '}
              <s.Link href="www.google.com.br">Condições Gerais</s.Link> e{' '}
              <s.Link href="www.google.com.br">
                Manual de Assistência Emergencial
              </s.Link>{' '}
              do plano escolhido.
            </Text>
            <Text color="gray5" bold>
              Valores calculados em reais, considerando o câmbio do dia da
              cotação.
            </Text>
            <Text color="gray5" bold>
              Orçamento válido somente para a data da cotação.
            </Text>
          </s.DisclosureWrapper>
        </s.ContentContainer>
      </s.BackgroundWrapper>
      <s.Footer>
        <s.Button outline onClick={() => setModalOpen(true)}>
          comparativo de coberturas
        </s.Button>
        <s.Button outline onClick={() => setIsDrawerOpen(true)}>
          alterar dados
        </s.Button>
      </s.Footer>
    </s.Container>
  )
}

export default ChoosePlan
