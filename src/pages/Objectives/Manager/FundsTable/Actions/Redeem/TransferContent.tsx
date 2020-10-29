import React, { useContext, useEffect, useMemo, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { ThemeContext } from 'styled-components'
import 'styled-components/macro'

import HorizontalList from 'components/HorizontalList'
import MoneyInput from 'components/Inputs/Money'
import SelectInput from 'components/Inputs/Select'
import { TOptions } from 'components/Inputs/Select/types'
import Text from 'components/Text'

import { Currency, BRLCurrency } from 'helpers/money'
import useMedia from 'hooks/useMedia'

import { GetObjectiveDataRequest } from 'store/modules/Objective/action'

import { ITransferContent, IState, TError, TTransferObject } from './types'
import * as s from './styles'
import { VerticalList } from 'pages/Objectives/Recommendation/SuggestedPlanDetail/styles'

enum goalTypeIcons {
  'TRAVEL' = 'plane',
  'RETIRE' = 'time',
  'CAR' = 'car2',
  'COURSE' = 'student',
  'EVENT' = 'drink',
  'HOUSE' = 'homewithwindow',
  'MONEY' = 'money',
}

export default function({
  value,
  setValue,
  fundInfo,
  setButtonIsDisabled,
}: ITransferContent) {
  const theme = useContext(ThemeContext)
  const isMobile = useMedia('sm')
  const dispatch = useDispatch()

  const [error, setError] = useState<TError>(undefined)
  const [objectiveSelected, setObjectiveSelected] = useState<TTransferObject>(
    value
  )

  const {
    objectives: objectiveList,
    isLoadingList,
    objectiveDetails,
  } = useSelector((state: IState) => ({
    ...state.objective,
    objectiveDetails: state.objectiveManagement.data,
  }))

  useEffect(() => {
    if (!objectiveList) {
      dispatch(GetObjectiveDataRequest())
    }
  }, [objectiveList, isLoadingList, dispatch])

  const itemsDropdown: TOptions[] = useMemo(
    () =>
      objectiveList
        ? [...objectiveList]
            .filter(item => item.id !== objectiveDetails.id)
            .map(item => ({
              name: item.nickname,
              id: item.id,
              icon: goalTypeIcons[item.goal_type],
              onClick: () => {
                if (
                  objectiveSelected.value === 0 ||
                  (objectiveSelected.value || 0) > fundInfo.invested
                ) {
                  setButtonIsDisabled(true)
                } else {
                  setButtonIsDisabled(false)
                }

                setObjectiveSelected(currentValues => ({
                  ...currentValues,
                  id: item.id,
                  name: item.nickname,
                }))
                setValue(currentValues => ({
                  ...currentValues,
                  id: item.id,
                  name: item.nickname,
                }))
              },
            }))
        : [],
    [
      objectiveList,
      objectiveDetails,
      setValue,
      fundInfo,
      objectiveSelected,
      setButtonIsDisabled,
    ]
  )

  return (
    <>
      {isMobile ? (
        <VerticalList
          elements={[
            <Text type="headline" color="gray5">
              Valor no objetivo
            </Text>,
            <Text type="headline" color="gray6" bold>
              {Currency.parse(fundInfo.invested, true)}
            </Text>,
          ]}
          css={`
            padding: 0;
          `}
        />
      ) : (
        <HorizontalList
          startItems={[
            <Text type="headline" color="gray5">
              Valor no objetivo
            </Text>,
          ]}
          endItems={[
            <Text type="headline" color="gray6" bold>
              {Currency.parse(fundInfo.invested, true)}
            </Text>,
          ]}
          noPadding
        />
      )}

      <s.Divisor />

      <Text
        type="headline"
        color="gray6"
        css={`
          margin-bottom: ${theme.spacing(3)}px;
        `}
      >
        Para qual objetivo você deseja transferir?
      </Text>

      <SelectInput selected={objectiveSelected} options={itemsDropdown} />

      <Text
        type="headline"
        color="gray6"
        css={`
          margin: ${theme.spacing(3)}px 0;
        `}
      >
        Qual valor você deseja transferir?
      </Text>

      <MoneyInput
        error={error}
        value={Currency.parse(objectiveSelected.value || 0)}
        onChange={({ target }: React.ChangeEvent<HTMLInputElement>) => {
          const targetValue = new BRLCurrency(target.value).toNumber()

          if (targetValue > fundInfo.invested) {
            setError({
              icon: 'alertrounded',
              message: 'Valor acima do disponível',
            })
          } else {
            setError(undefined)
          }

          if (
            targetValue === 0 ||
            (targetValue || 0) > fundInfo.invested ||
            !objectiveSelected?.name
          ) {
            setButtonIsDisabled(true)
          } else {
            setButtonIsDisabled(false)
          }

          setObjectiveSelected(currentSelected => ({
            ...currentSelected,
            value: targetValue,
          }))
        }}
        onBlur={() => setValue(objectiveSelected)}
      />
    </>
  )
}
