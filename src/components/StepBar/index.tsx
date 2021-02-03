import React from 'react'

import useMedia from 'hooks/useMedia'

import HorizontalList from 'components/HorizontalList'
import Text from 'components/Text'

import { IProps } from './types'
import * as S from './styles'

export default function StepBar({
  actualStep = null,
  totalNumberOfSteps = null,
  showSteps = true,
  title,
  type,
}: IProps) {
  const isMobile = useMedia('xs')

  return (
    <S.StepBar>
      <S.GridContainer>
        <S.GridRowStepBar>
          <S.ColStepBar lg={12}>
            <HorizontalList
              size="small"
              startItems={[
                !isMobile ? (
                  <Text color="gray4" type="headline">
                    {title}
                  </Text>
                ) : null,
                <Text color="white" type="headline">
                  {type}
                </Text>,
              ]}
              endItems={
                showSteps
                  ? [
                      <Text color="gray4" type="title">
                        {`ETAPA ${actualStep} de ${totalNumberOfSteps}`}
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
        </S.GridRowStepBar>
      </S.GridContainer>
    </S.StepBar>
  )
}
