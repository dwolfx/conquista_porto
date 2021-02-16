import React, { useState, useEffect } from 'react'

import { useDispatch, useSelector } from 'react-redux'

import { GetStatesRequest } from 'store/modules/ConsortiumBuilding/States/action'

import { TOptions } from 'components/Inputs/Select/types'

import StepBar from 'components/StepBar'
import { texts } from 'pages/ConsortiumBuilding/commons/Texts'
import useFormFluxManagement from 'hooks/FluxManagement/useFormFluxManagement'
import { capitalize } from 'helpers'
import { StepComponentProps } from 'hooks/FluxManagement/types'
import useStackFluxManagement from 'hooks/FluxManagement/useStackFluxManagement'
import * as s from './styles'
import * as t from './types'
import { IFormConsortiumBuilding, Steps } from '../types'

const ChooseState: React.FC = () => {
  const dispatch = useDispatch()
  const { updateForm } = useFormFluxManagement<IFormConsortiumBuilding>()
  const { instantiate } = useStackFluxManagement<StepComponentProps>()

  const [selectedState, setSelectedState] = useState<t.ISelected>({
    id: 0,
    name: '',
  })

  const { creation, page, buttons } = texts()

  const [states, setStates] = useState<TOptions[]>([])
  const [uf, setUf] = React.useState<string>('')

  const handleClick = () => {
    updateForm({
      tipoPessoa: 1,
      tipoBusca: 3,
      codigoProduto: 1,
      codigoCanal: 7,
      uf,
    })
    instantiate(Steps.contemplatedStep)
  }

  const isDisabledButton: boolean = !(
    !!uf &&
    !!selectedState &&
    !!selectedState.name
  )

  const { consortiumBuildingStatesData } = useSelector((state: any) => ({
    consortiumBuildingStatesData: state.consortiumBuildingStates.data,
  }))

  useEffect(() => {
    if (!consortiumBuildingStatesData) {
      dispatch(GetStatesRequest())
    } else {
      const statesOptions = consortiumBuildingStatesData.uf.map(
        (state: t.IState, index: number) => ({
          id: index + 1,
          text: state.nome
            .split(' ')
            .map(value =>
              value.length > 2 ? capitalize(value) : value.toLowerCase()
            )
            .join(' '),
          onClick: () => {
            setSelectedState({
              id: index + 1,
              name: state.nome
                .split(' ')
                .map(value =>
                  value.length > 2 ? capitalize(value) : value.toLowerCase()
                )
                .join(' '),
            })
            setUf(state.sigla)
          },
        })
      )
      setStates(statesOptions)
    }
  }, [consortiumBuildingStatesData, dispatch])

  return (
    <>
      <StepBar
        title={creation.title}
        type={page}
        actualStep={creation.steps.state.actualStep}
        totalNumberOfSteps={creation.stepMax}
      />
      <s.Wrapper>
        <s.StyledContainer>
          <s.StyledRow alignItems="center" justifyContent="center">
            <s.Col xs={12} sm={6} md={4} lg={4}>
              <s.FlexContainer>
                <s.Text type="headline" color="gray6" textAlign="center">
                  {creation.steps.state.title}
                </s.Text>
              </s.FlexContainer>
              <s.Select
                options={states}
                selected={selectedState}
                label=""
                optionBoxSize={300}
              />
              <s.StyledButton
                data-gtm-name="proximo"
                data-gtm-type="click"
                data-gtm-clicktype="button"
                disabled={isDisabledButton}
                onClick={handleClick}
              >
                {buttons.next}
              </s.StyledButton>
            </s.Col>
          </s.StyledRow>
        </s.StyledContainer>
      </s.Wrapper>
    </>
  )
}
export default ChooseState
