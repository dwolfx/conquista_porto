import React, { useContext } from 'react'
import { Row } from 'styled-bootstrap-grid'
import { ThemeContext } from 'styled-components'
import 'styled-components/macro'

import Text from 'components/Text'

import {
  SectionBar,
  Col,
  NicknameCol,
} from 'pages/Objectives/GoalStreams/Components/styles'

interface IProps {
  currentStep: number
  nickname?: string
  numberSteps: number
}

const TopBar = ({ currentStep, nickname, numberSteps }: IProps) => {
  const theme = useContext(ThemeContext)

  return (
    <SectionBar>
      <Row
        justifyContent="between"
        alignItems="center"
        css={`
          position: relative;
        `}
      >
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
          <NicknameCol>
            <Text type="heading4" color="white">
              {nickname}
            </Text>
          </NicknameCol>
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
    </SectionBar>
  )
}

export default TopBar
