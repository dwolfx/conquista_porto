import styled from 'styled-components'

export const BackgroundBar = styled.div`
  height: 7px;
  width: 100%;
  background-color: ${props => props.theme.colors.gray2};
  border-radius: 6px;
`

export const ProgressBar = styled.div`
  height: 100%;
  width: ${props => props.progress}%;
  background-color: ${props =>
    props.color ? props.color : props.theme.colors.green4};
  border-radius: 6px;
`
