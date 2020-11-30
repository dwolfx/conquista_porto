import React, { useState } from 'react'
import { Container, Col } from 'styled-bootstrap-grid'
import Text from 'components/Text'
import Switch from 'components/Inputs/Switch'
import * as s from './styles'
import PlanCard from './PlanCard'
import useMedia from 'hooks/useMedia'

import LogoConquistaBeta from 'assets/images/logoConquistaBeta.png'

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

const ChoosePlan = () => {
  const [isInstallmentPayment, setIsInstallmentPayment] = useState(false)
  const isMobile = useMedia('sm')
  const isTabletHorizontal = useMedia('mdUp')
  const isLgDown = useMedia('lg')
  const handleSwitch = () => setIsInstallmentPayment(!isInstallmentPayment)

  return (
    <>
      <s.HeaderWrapper>
        <Container>
          <Col lg={12}>
            <s.HeaderContent>
              <s.PreviousIcon
                data-gtm-subname="layer seguro viagem"
                data-gtm-name="botao voltar step"
                data-gtm-type="click"
                data-gtm-clicktype="button"
              />
              <s.LogoWrapper>
                <img src={LogoConquistaBeta} alt="Logo Conquista Beta" />
              </s.LogoWrapper>
              <s.CloseIcon
                className="layer-close-button"
                data-gtm-subname="botao fechar layer"
                data-gtm-name="botao fechar"
                data-gtm-type="click"
                data-gtm-clicktype="button"
              />
            </s.HeaderContent>
          </Col>
        </Container>
      </s.HeaderWrapper>
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
        <s.Button outline>comparativo de coberturas</s.Button>
        <s.Button outline>alterar dados</s.Button>
      </s.Footer>
    </>
  )
}

export default ChoosePlan
