import styled from 'styled-components'

export const ProgressBarWrapper = styled.div`
  background-color: ${props => props.theme.colors.gray2};
  border-radius: 6px;
  height: 7px;
`

export const Progress = styled.div`
  background-color: ${props => props.theme.colors.green4};
  border-radius: inherit;
  height: 100%;
  width: ${props => `${props.progress}%`};
`
