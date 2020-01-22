import styled from 'styled-components'

export const InputGroupWrapper = styled.div`
  display: flex;
  align-items: flex-end;
`

export const InputAddon = styled.div`
  height: 42px;
  border-bottom: ${props => `1px solid ${props.theme.colors.gray3}`};
`

export const InputAddonText = styled.div`
  border: none;
  padding: 10px;
`
