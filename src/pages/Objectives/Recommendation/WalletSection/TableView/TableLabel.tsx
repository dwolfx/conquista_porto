import React from 'react'
import 'styled-components/macro'

import Text from 'components/Text'

import { FILTER_RISKS } from 'pages/Investments/FundsList/constants'

import * as s from './styles'
import useMedia from 'hooks/useMedia'

interface IProps {
  isInteractive?: boolean
}

export default function TableLabel({ isInteractive, ...rest }: IProps) {
  const disabled = false
  const isMobile = useMedia('xs')

  return !isMobile ? (
    <s.LabelRow justifyContent="end">
      <Text type="title" color="gray5" bold>
        Baixo Risco
      </Text>
      <s.SquareRiskContainer>
        <s.SquareRiskLevel
          disabled={disabled}
          // filter.byPerfilRisco.includes(FILTER_RISKS[1]) || isTablet
          selectedRisk={true}
          value={FILTER_RISKS[1]}
          color="darkBlue2"
          onClick={() => {
            // if (!isTablet && !disabled) {
            //   handleClickFilterByRisk(FILTER_RISKS[1])
            // }
            return null
          }}
          isInteractive={isInteractive}
        />
        <s.SquareRiskLevel
          disabled={disabled}
          // filter.byPerfilRisco.includes(FILTER_RISKS[2]) || isTablet
          selectedRisk={true}
          value={FILTER_RISKS[2]}
          color="blue4"
          onClick={() => {
            // if (!isTablet && !disabled) {
            //   handleClickFilterByRisk(FILTER_RISKS[2])
            // }
            return null
          }}
          isInteractive={isInteractive}
        />
        <s.SquareRiskLevel
          disabled={disabled}
          // filter.byPerfilRisco.includes(FILTER_RISKS[3]) || isTablet
          selectedRisk={true}
          value={FILTER_RISKS[3]}
          color="green3"
          onClick={() => {
            // if (!isTablet && !disabled) {
            //   handleClickFilterByRisk(FILTER_RISKS[3])
            // }
            return null
          }}
          isInteractive={isInteractive}
        />
        <s.SquareRiskLevel
          disabled={disabled}
          // filter.byPerfilRisco.includes(FILTER_RISKS[4]) || isTablet
          selectedRisk={true}
          value={FILTER_RISKS[4]}
          color="yellow2"
          onClick={() => {
            // if (!isTablet && !disabled) {
            //   handleClickFilterByRisk(FILTER_RISKS[4])
            // }
            return null
          }}
          isInteractive={isInteractive}
        />
        <s.SquareRiskLevel
          disabled={disabled}
          // filter.byPerfilRisco.includes(FILTER_RISKS[5]) || isTablet
          selectedRisk={true}
          value={FILTER_RISKS[5]}
          color="magenta2"
          onClick={() => {
            // if (!isTablet && !disabled) {
            //   handleClickFilterByRisk(FILTER_RISKS[5])
            // }
            return null
          }}
          isInteractive={isInteractive}
        />
      </s.SquareRiskContainer>
      <Text type="title" color="gray5" bold>
        Alto Risco
      </Text>
    </s.LabelRow>
  ) : null
}
