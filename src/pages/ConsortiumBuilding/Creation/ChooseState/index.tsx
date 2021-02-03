import React, { useState } from 'react'

import { TOptions } from 'components/Inputs/Select/types'

import * as s from './styles'
import * as t from './types'

const ChooseState: React.FC = () => {
  const [selectedState] = useState<t.ISelected>({
    id: 0,
    name: 'Selecione',
  })

  const [states] = useState<TOptions[]>([])

  const handleClick = () => {}

  return (
    <s.Wrapper>
      <s.StyledContainer>
        <s.StyledRow alignItems="center" justifyContent="center">
          <s.Col xs={12} sm={6} md={4} lg={4}>
            <s.FlexContainer>
              <s.Text type="headline" color="gray6" textAlign="center">
                Em qual estado você reside?
              </s.Text>
            </s.FlexContainer>
            <s.Select
              options={states}
              selected={selectedState}
              label="Destino"
            />
            <s.StyledButton
              data-gtm-name="proximo"
              data-gtm-type="click"
              data-gtm-clicktype="button"
              onClick={() => handleClick()}
            >
              Próximo
            </s.StyledButton>
          </s.Col>
        </s.StyledRow>
      </s.StyledContainer>
    </s.Wrapper>
  )
}
export default ChooseState
