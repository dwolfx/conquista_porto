import React from 'react'

import useMedia from 'hooks/useMedia'

import HorizontalList from 'components/HorizontalList'
import Text from 'components/Text'

import { IProps } from './types'
import * as S from './styles'

export default function StepBar({
  actualStep = null,
  totalNumberOfSteps = null,
}: IProps) {
  const isTabletVertical = useMedia('md')

  return (
    <S.StepBar>
      <S.GridContainer>
        <S.ColStepBar lg={12}>
          <HorizontalList
            size="small"
            startItems={[
              <Text color="gray4" type="headline">
                Contratação
              </Text>,
              <Text color="white" type="headline">
                Seguro Viagem
              </Text>,
            ]}
            endItems={
              !isTabletVertical
                ? [
                    <Text color="gray4" type="title">
                      {`ETAPA ${actualStep} DE ${totalNumberOfSteps}`}
                    </Text>,
                  ]
                : null
            }
            css={`
              width: 100%;
              padding: 0;
            `}
          />
        </S.ColStepBar>
      </S.GridContainer>
    </S.StepBar>
  )
}
