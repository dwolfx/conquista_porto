import styled from 'styled-components'

export const Row = styled.div`
  display: flex;
  justify-content: ${props => (props.justify ? props.justify : 'flex-start')};
  margin: 30px 0;
  width: 100%;
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
