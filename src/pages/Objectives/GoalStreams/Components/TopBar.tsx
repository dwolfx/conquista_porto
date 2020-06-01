import React, { useContext } from 'react'
import { Container, Row } from 'styled-bootstrap-grid'
import { ThemeContext } from 'styled-components'
import 'styled-components/macro'

import Text from 'components/Text'

import { SectionBar, Col } from 'pages/Objectives/GoalStreams/Components/styles'

interface IProps {
  currentStep: number
  nickname?: string
  numberSteps: number
}

const TopBar = ({ currentStep, nickname, numberSteps }: IProps) => {
  const theme = useContext(ThemeContext)

  return (
    <SectionBar>
      <Container>
        <Row justifyContent="between" alignItems="center">
          <Col lgAuto mdAuto smAuto xs={12}>
            <Text type="heading4" color="gray4">
              Criar{' '}
              <span
                css={`
                  color: ${theme.colors.white};
                `}
              >
                Objetivo
              </span>
            </Text>
          </Col>
          {nickname && (
            <Col lgAuto mdAuto smAuto xs={12}>
              <Text type="heading4" color="white">
                {nickname}
              </Text>
            </Col>
          )}
          <Col lgAuto mdAuto smAuto xs={12}>
            <Text
              type="title"
              color="white"
              css={`
                text-transform: uppercase;
              `}
            >
              Etapa {currentStep} de {numberSteps}
            </Text>
          </Col>
        </Row>
      </Container>
    </SectionBar>
  )
}

export default TopBar
