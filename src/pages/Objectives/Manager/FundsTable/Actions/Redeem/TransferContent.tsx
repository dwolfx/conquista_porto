import React, { useContext, useEffect, useMemo, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { ThemeContext } from 'styled-components'
import 'styled-components/macro'

import Dropdown, { IItemsProps } from 'components/Dropdown'
import HorizontalList from 'components/HorizontalList'
import Icon from 'components/IconExporter'
import MoneyInput from 'components/Inputs/Money'
import Text from 'components/Text'
import TextInput from 'components/NewInput'

import { Currency, BRLCurrency } from 'helpers/money'

import { GetObjectiveDataRequest } from 'store/modules/Objective/action'

import { ITransferContent, IState, TError } from './types'
import * as s from './styles'

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
  const dispatch = useDispatch()
  const inputRef = useRef() as React.RefObject<HTMLDivElement>

  const [error, setError] = useState<TError>(undefined)
  const [objectiveSelected, setObjectiveSelected] = useState<{
    name?: string
    id?: number
    value?: number
  }>(value)

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

  const itemsDropdown: IItemsProps[] = useMemo(
    () =>
      objectiveList
        ? [...objectiveList]
            .filter(item => item.id !== objectiveDetails.id)
            .map(item => ({
              text: item.nickname,
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
      <HorizontalList
        startItems={[
          <Text type="headline" color="gray5">
            Valor no objetivo
          </Text>,
        ]}
        endItems={[
          <Text type="headline" color="gray6" bold>
            {Currency.parse(1500, true)}
          </Text>,
        ]}
        noPadding
      />

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

      <Dropdown
        items={itemsDropdown}
        zIndex={14}
        containerPadding="0"
        customWidth={`${inputRef.current?.clientWidth}px`}
      >
        <div ref={inputRef}>
          <TextInput
            value={objectiveSelected?.name || 'Selecione'}
            placeholder="Selecione"
            suffix={
              <Icon name="arrowdown" color="gray6" width={21} height={21} />
            }
            readOnly
          />
        </div>
      </Dropdown>

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
