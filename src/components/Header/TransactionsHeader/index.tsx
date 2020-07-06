import React from 'react'

import LogoConquistaBeta from 'assets/images/logoConquistaBeta.png'
import HorizontalList from 'components/HorizontalList'
import Text from 'components/Text'

import * as s from './styles'

export interface IProps {
  onBack?: () => void
  onClose?: () => void
  showStepsBar?: boolean
  stepsBarProps?: {
    step: number
    maxSteps: number
    setStep?: (step: number) => void
    title: string
  }
  showBackButton?: boolean
}

const TransactionHeader = ({
  onClose,
  onBack,
  showStepsBar,
  showBackButton,
  stepsBarProps = {
    step: 1,
    maxSteps: 1,
    setStep: () => null,
    title: '',
  },
  ...rest
}: IProps) => {
  const getStepCount = () => {
    if (showStepsBar) {
      return [
        <Text color="gray4" type="title" data-testid="steps">
          {`ETAPA ${stepsBarProps.step} de ${stepsBarProps.maxSteps}`}
        </Text>,
      ]
    }
    return []
  }

  return (
    <>
      <s.HeaderWrapper>
        <s.GridContainer {...rest}>
          <s.GridRow>
            <s.GridCol lg={12}>
              <s.HeaderContent>
                {showBackButton && (
                  <s.HeaderIconButton
                    data-gtm-subname="layer Investimentir"
                    data-gtm-name="botao voltar step"
                    data-gtm-type="click"
                    data-gtm-clicktype="button"
                    icon="ArrowLeft"
                    onClick={() => !!onBack && onBack()}
                    data-testid="back button"
                  />
                )}
                <s.HeaderColTitle>
                  <img
                    src={LogoConquistaBeta}
                    alt="Logo Conquista Beta"
                    data-testid="logo"
                  />
                </s.HeaderColTitle>
                <s.HeaderIconButton
                  className="layer-close-button"
                  data-gtm-subname="botao fechar layer"
                  data-gtm-name="botao fechar"
                  data-gtm-type="click"
                  data-gtm-clicktype="button"
                  icon="CloseIcon"
                  onClick={() => !!onClose && onClose()}
                  data-testid="close button"
                />
              </s.HeaderContent>
            </s.GridCol>
          </s.GridRow>
        </s.GridContainer>
      </s.HeaderWrapper>
      {showStepsBar && stepsBarProps.title.length && (
        <s.StepBar>
          <s.GridContainer>
            <s.GridRowStepBar>
              <s.ColStepBar lg={12}>
                <HorizontalList
                  size="small"
                  startItems={[
                    <Text
                      color="gray4"
                      type="headline"
                      data-testid="section name"
                    >
                      {stepsBarProps.title}
                    </Text>,
                  ]}
                  endItems={getStepCount()}
                  css={`
                    width: 100%;
                    padding: 0;
                  `}
                />
              </s.ColStepBar>
            </s.GridRowStepBar>
          </s.GridContainer>
        </s.StepBar>
      )}
    </>
  )
}

export default TransactionHeader
