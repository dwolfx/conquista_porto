import styled from 'styled-components'

interface IContainerProps {
  noSpacing?: boolean
}
export const Container = styled.div<IContainerProps>`
  width: 100%;
  height: auto;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: space-between;
  padding: ${({ theme, noSpacing }) =>
    noSpacing ? '0' : `${theme.spacing(1)}px ${theme.spacing(2)}px`};
`

export const ListElements = styled.div<{ marginBetweenElements?: number }>`
  display: flex;
  flex-direction: column;
  width: 100%;
  && > * {
    margin-bottom: ${({ marginBetweenElements }) => marginBetweenElements}px;
  }
  && :last-child {
    margin-bottom: 0px;
  }
`
