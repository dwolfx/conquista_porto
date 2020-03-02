import React from 'react'
import PropTypes from 'prop-types'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'
import 'styled-components/macro'

import Text from 'components/Text'
import HorizontalList from 'components/HorizontalList'
import MiniLinearProgressBar from 'components/MiniLinearProgressBar'
import Button from 'components/Button'

import { formatMoney } from 'helpers'

import { GetObjectiveManagementDataRequest } from 'store/modules/ObjectiveManagement/action'

import {
  ObjectivesTableContainer,
  ObjectivesTableBox,
  ObjectivesAccordion,
  ObjectiveDivisor,
} from './styles'

export default function ObjectiveListContent({ objectives }) {
  const dispatch = useDispatch()
  const history = useHistory()
  const { isLoading } = useSelector(state => state.objectiveManagement)
  const horizontalListText = (text, type, color) => (
    <div css={`
      width: 35px;
    `}>
      <Text type={type} color={color} textAlign="right">
        {text}
      </Text>
    </div>
  )

  const horizontalListProgressBar = (actual, max) => (
    <div
      css={`
        width: 56px;
      `}
    >
      <MiniLinearProgressBar atual={actual} max={max} />
    </div>
  )

  const table = (current, remaining, total) => (
    <ObjectivesTableContainer>
      <ObjectivesTableBox>
        <Text type="captionUppercase" color="gray4">
          ALCANÇADO
        </Text>
        <Text type="headline" color="gray6">
          {formatMoney(current)}
        </Text>
      </ObjectivesTableBox>
      <ObjectivesTableBox>
        <Text type="captionUppercase" color="gray4">
          FALTAM
        </Text>
        <Text type="headline" color="gray6">
          {formatMoney(remaining)}
        </Text>
      </ObjectivesTableBox>
      <ObjectivesTableBox>
        <Text type="captionUppercase" color="gray4">
          META
        </Text>
        <Text type="headline" color="gray6">
          {formatMoney(total)}
        </Text>
      </ObjectivesTableBox>
    </ObjectivesTableContainer>
  )

  return (
    <>
      {objectives &&
        objectives.map(objective => (
          <ObjectivesAccordion
            key={objective.id}
            bodyPadding="0"
            titleNode={
              <HorizontalList
                noPadding
                startItems={[
                  horizontalListText(
                    `#${objective.nickname}`,
                    'headline',
                    'gray5'
                  ),
                ]}
                endItems={[
                  horizontalListProgressBar(
                    objective.total_balance,
                    objective.target_value
                  ),
                  horizontalListText(
                    `${objective.percentage}%`,
                    'captionUppercase',
                    'gray4'
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
                dispatch(
                  GetObjectiveManagementDataRequest({
                    id: objective.id,
                    history,
                    path: `/objetivos/gerenciar/${objective.id}`,
                  })
                )
              }}
              loading={isLoading}
            >
              GERENCIAR
            </Button>
            <ObjectiveDivisor />
          </ObjectivesAccordion>
        ))}
    </>
  )
}

ObjectiveListContent.propTypes = {
  objectives: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
      nickname: PropTypes.string,
      percentage: PropTypes.number,
      remaining_value: PropTypes.number,
      target_value: PropTypes.number,
      total_balance: PropTypes.number,
    })
  ).isRequired,
}
