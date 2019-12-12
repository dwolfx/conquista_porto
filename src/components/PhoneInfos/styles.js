import styled from 'styled-components'

export const Row = styled.div`
  display: flex;
  justify-content: ${props => (props.justify ? props.justify : 'flex-start')};
  margin: 30px 0;
  width: 100%;

  @media ${props => props.theme.mediaQueries.xs} {
    flex-direction: column;
  }
`

export const RemoveButton = styled.button`
  background-color: transparent;
  border: none;
  outline: none;
  cursor: pointer;
`

export const Wrapper = styled.div`
  width: 100%;
`

export const ButtonAdd = styled.button`
  color: ${props => props.theme.colors.blue4};
  display: flex;
  align-items: center;
  background-color: transparent;
  border: none;
  outline: none;
  cursor: pointer;

  svg {
    margin-right: 8px;
  }
`
