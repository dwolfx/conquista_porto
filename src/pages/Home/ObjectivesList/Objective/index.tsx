import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'
import 'styled-components/macro'

import Button from 'components/Button'
import MiniLinearProgressBar from 'components/MiniLinearProgressBar'
import Text from 'components/Text'
import { formatMoney } from 'helpers'
import { useToast } from 'hooks/toast'
import { GetObjectiveManagementDataRequest } from 'store/modules/ObjectiveManagement/action'

import { IObjectiveProps } from '../types'
import {
  ObjectivesTableContainer,
  ObjectivesTableBox,
  ObjectivesAccordion,
  ObjectiveDivisor,
  LinearProgressBarContent,
  HorizontalListTruncateStartBlock,
  ObjectivePercentageContainer,
  VerticalListStyled,
} from './styles'

export default function Objective({ objective }: IObjectiveProps) {
  const dispatch = useDispatch()
  const history = useHistory()
  const { addToast } = useToast()

  const [loadingObjectiveButton, setLoadingObjectiveButton] = useState<
    number | undefined
  >(undefined)

  const { isLoading } = useSelector((state: any) => state.objectiveManagement)

  const horizontalListProgressAndPorcentage = (
    actual: number,
    max: number,
    percentage: number
  ) => (
    <ObjectivePercentageContainer>
      <LinearProgressBarContent>
        <MiniLinearProgressBar current={actual} max={max} />
      </LinearProgressBarContent>
      <Text
        type="captionUppercase"
        color="gray5"
        textAlign="left"
        bold
        css={`
          min-width: 44px;
        `}
      >
        {`${percentage.toFixed(2)}%`}
      </Text>
    </ObjectivePercentageContainer>
  )

  const table = (current: number, remaining: number, total: number) => (
    <ObjectivesTableContainer>
      <ObjectivesTableBox noGutter lg={4} md={4} sm={4} xs={12}>
        <VerticalListStyled
          elements={[
            <Text type="captionUppercase" color="gray4">
              ALCANÇADO
            </Text>,
            <Text type="headline" color="gray6">
              {formatMoney(current)}
            </Text>,
          ]}
        />
      </ObjectivesTableBox>
      <ObjectivesTableBox noGutter lg={4} md={4} sm={4} xs={12}>
        <VerticalListStyled
          elements={[
            <Text type="captionUppercase" color="gray4">
              FALTAM
            </Text>,
            <Text type="headline" color="gray6">
              {formatMoney(remaining)}
            </Text>,
          ]}
        />
      </ObjectivesTableBox>
      <ObjectivesTableBox noGutter lg={4} md={4} sm={4} xs={12}>
        <VerticalListStyled
          elements={[
            <Text type="captionUppercase" color="gray4">
              META
            </Text>,
            <Text type="headline" color="gray6">
              {formatMoney(total)}
            </Text>,
          ]}
        />
      </ObjectivesTableBox>
    </ObjectivesTableContainer>
  )

  return (
    <>
      <ObjectivesAccordion
        triggerCloseOnArrow={false}
        bodyPadding="0"
        titleNode={
          <HorizontalListTruncateStartBlock
            noPadding
            startItems={[
              <Text truncate type="headline" color="gray5" bold>
                {objective.nickname}
              </Text>,
            ]}
            endItems={[
              horizontalListProgressAndPorcentage(
                objective.total_balance,
                objective.target_value,
                objective.percentage
              ),
            ]}
          />
        }
      >
        {table(
          objective.total_balance,
          objective.remaining_value,
          objective.target_value
        )}
        <Button
          data-gtm-type="click"
          data-gtm-clicktype="link"
          data-gtm-subname={objective.nickname}
          data-gtm-name="gerenciar"
          outline
          css={`
            width: 100%;
            margin: 7px 0;
          `}
          onClick={() => {
            setLoadingObjectiveButton(objective.id)
            dispatch(
              GetObjectiveManagementDataRequest({
                id: objective.id,
                onSuccess: () =>
                  history.push(`/objetivos/gerenciar/${objective.id}`),
                onError: () => history.push('/'),
                addToast,
              })
            )
          }}
          loading={isLoading && loadingObjectiveButton === objective.id}
          disabled={isLoading && loadingObjectiveButton === objective.id}
        >
          GERENCIAR
        </Button>
        <ObjectiveDivisor />
      </ObjectivesAccordion>
    </>
  )
}
