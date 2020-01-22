import styled from 'styled-components'

export const InputGroupContainer = styled.div`
  display: flex;
  width: 100%;
  align-items: center;
`

export const InputGroupAddon = styled.div`
  height: 42px;
  border-bottom: ${props => `1px solid ${props.theme.colors.gray3}`};
`

export const InputGroupText = styled.div`
  border: none;
  padding: 10px;
`
