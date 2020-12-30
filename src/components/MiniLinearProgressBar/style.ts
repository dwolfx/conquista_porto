import styled from 'styled-components'

export const BackgroundBar = styled.div`
  height: 7px;
  width: 100%;
  background-color: ${props => props.theme.colors.gray2};
  border-radius: 6px;
`
interface IProgressBar {
  progress?: number
}

export const ProgressBar = styled.div<IProgressBar>`
  height: 100%;
  max-width: ${({ progress }) => progress}%;
  background-color: ${({ color, theme }) => color || theme.colors.green4};
  border-radius: 6px;
`

export const ObjectivePercentageContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
`

export const LinearProgressBarContent = styled.div`
  margin-right: ${({ theme }) => theme.spacing(2)}px;
  flex: 1;
`
