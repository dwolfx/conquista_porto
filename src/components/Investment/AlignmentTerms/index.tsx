import React from 'react'
import Divisor from 'components/Divisor'
import Checkbox from 'components/Inputs/Checkbox'
import Text from 'components/Text'

import {
  Container,
  GridRow,
  GridCol,
  Main,
  Footer,
  WrapperTitle,
  Title,
  WrapperTermItems,
  TermItemText,
  CheckboxContainer,
  Controls,
  ButtonsCtrls,
} from './styles'

interface IProps {
  acceptAlignmentTerms: boolean
  onHandleChangeacceptAlignmentTerms: () => void
  onHandleCloseAlignmentTerm: () => void
  onHandleConfirmNextStep: () => void
}

const AlignmentTerms: React.FC<IProps> = ({
  acceptAlignmentTerms,
  onHandleChangeacceptAlignmentTerms,
  onHandleCloseAlignmentTerm,
  onHandleConfirmNextStep,
}) => {
  return (
    <Container>
      <GridRow>
        <GridCol>
          <Main>
            <WrapperTitle>
              <Title>Termo de desenquadramento</Title>
            </WrapperTitle>
            <Divisor />
            <WrapperTermItems>
              <TermItemText bold color="gray5">
                1. A operação que desejo realizar torna meu portfólio de
                investimentos inadequado ao meu perfil de risco, objetivo de
                investimento, conhecimento financeiro e/ou minha situação
                patrimonial;
              </TermItemText>
              <TermItemText bold color="gray5">
                2. Ao prosseguir com esta operação, assumirei riscos maiores do
                que aqueles previstos nos produtos adequados ao meu perfil;
              </TermItemText>
              <TermItemText bold color="gray5">
                3. A avaliação dos riscos inerentes à operação que desejo
                realizar é de minha única e exclusiva responsabilidade, estando
                a PORTOPAR DTVM LTDA isenta de qualquer responsabilidade em
                razão da minha decisão de investimento;
              </TermItemText>
              <TermItemText bold color="gray5">
                4. Após leitura detalhada e compreensão dos itens acima, decidi
                realizar a operação.
              </TermItemText>
            </WrapperTermItems>
            <CheckboxContainer>
              <Checkbox
                label={
                  <Text type="body" color="gray5" bold>
                    Confirmo que li e concordo com todas as informações.
                  </Text>
                }
                checked={acceptAlignmentTerms}
                onChange={onHandleChangeacceptAlignmentTerms}
                id="checkbox-accept-alignment-term"
              />
            </CheckboxContainer>
          </Main>
        </GridCol>
      </GridRow>
      <Footer>
        <Divisor />
        <GridRow>
          <GridCol>
            <Controls>
              <ButtonsCtrls
                data-gtm-subname="aplicar em fundo"
                data-gtm-name="termo enquadramento voltar"
                data-gtm-type="click"
                data-gtm-clicktype="button"
                outline
                color="primary"
                onClick={onHandleCloseAlignmentTerm}
              >
                voltar
              </ButtonsCtrls>
              <ButtonsCtrls
                data-gtm-subname="aplicar em fundo"
                data-gtm-name="termo enquadramento continuar"
                data-gtm-type="click"
                data-gtm-clicktype="button"
                color="secondary"
                disabled={!acceptAlignmentTerms}
                onClick={onHandleConfirmNextStep}
              >
                continuar
              </ButtonsCtrls>
            </Controls>
          </GridCol>
        </GridRow>
      </Footer>
    </Container>
  )
}

export default AlignmentTerms
