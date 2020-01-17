import styled from 'styled-components'

export const BoxColor = styled.div`
  display: inline-block;
  background-color: ${props => props.riskColor};
  border-radius: 2px;
  margin-right: 7px;
  height: 15px;
  width: 15px;
`
