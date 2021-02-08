import React, { useState, useEffect } from 'react'

import { useDispatch, useSelector } from 'react-redux'

import { GetStatesRequest } from 'store/modules/ConsortiumBuilding/States/action'

import { TOptions } from 'components/Inputs/Select/types'

import StepBar from 'components/StepBar'
import { texts } from 'pages/ConsortiumBuilding/commons/Texts'
import * as s from './styles'
import * as t from './types'

const ChooseState: React.FC = () => {
  const dispatch = useDispatch()
  const [selectedState, setSelectedState] = useState<t.ISelected>({
    id: 0,
    name: 'Selecione',
  })

  const { creation, page, buttons } = texts()

  const [states, setStates] = useState<TOptions[]>([])

  const handleClick = () => {}

  const { consortiumBuildingStatesData } = useSelector((state: any) => ({
    consortiumBuildingStatesData: state.consortiumBuildingStates.data,
  }))

  useEffect(() => {
    if (!consortiumBuildingStatesData) {
      dispatch(GetStatesRequest())
    } else {
      const statesOptions = consortiumBuildingStatesData.uf.map(
        (state: any, index: number) => ({
          id: index + 1,
          text: state.nome,
          onClick: () => setSelectedState({ id: index + 1, name: state.nome }),
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
                onClick={() => handleClick()}
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
