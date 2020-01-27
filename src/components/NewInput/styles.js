import styled from 'styled-components'

export const InputGroupWrapper = styled.div`
  border-bottom: ${props => `1px solid ${props.theme.colors.gray3}`};
  border-radius: 8px 8px 0px 0px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 0 14px;
  position: relative;
`

export const InputWrapper = styled.div`
  align-items: center;
  display: flex;
`

export const InputLabel = styled.div`
  color: ${props => props.theme.colors.gray5};
  font-family: ${props => props.theme.fontTypes.captionUppercase};
  padding: 7px 14px 0 0;
`

export const Input = styled.input`
  background-color: transparent;
  border: none;
  font-family: ${props => props.theme.fontTypes.headline};
  height: 48px;
  padding: 10px 0;
  width: ${props => `${props.width}%`};
`

export const InputAddon = styled.div``

export const InputAddonText = styled.div`
  border: none;
  color: ${props => props.theme.colors.gray4};
  font-family: ${props => props.theme.fontTypes.headline};
`
