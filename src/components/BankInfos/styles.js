import styled from 'styled-components'

export const RemoveButton = styled.button`
  background-color: transparent;
  border: none;
  outline: none;
  cursor: pointer;
`

export const Wrapper = styled.div`
  width: 100%;
`

export const Row = styled.div`
  display: flex;
  flex-direction: ${props => (props.direction ? props.direction : 'row')};
  justify-content: ${props => (props.justify ? props.justify : 'flex-start')};
  margin-bottom: ${props =>
    props.marginBottom ? `${props.marginBottom}px` : '30px'};
  margin-left: ${props => (props.marginLeft ? `${props.marginLeft}` : '0')};
  margin-right: ${props => (props.marginRight ? `${props.marginRight}` : '0')};
  margin-top: ${props => (props.marginTop ? `${props.marginTop}px` : '30px')};
  width: ${props => (props.width ? `${props.width}%` : '100%')};

  @media ${props => props.theme.mediaQueries.xs} {
    flex-direction: column;
    margin-bottom: 15px;
    margin-top: 15px;
    width: 100%;
  }
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
