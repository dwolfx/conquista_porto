import styled from 'styled-components'

export const InputWrapper = styled.div`
  width: ${props => `${props.width}%`};
  flex-direction: column;
`

export const InputLabel = styled.div`
  color: ${props => props.theme.colors.gray5};
  font-family: ${props => props.theme.fontTypes.subheading};
  letter-spacing: 0.02px;
  text-transform: uppercase;
`

export const InputText = styled.input`
  border: none;
  border-bottom: 1px solid;
  height: 48px;
  padding: 10px 0;
  width: 100%;
  background-color: transparent;
  font-family: ${props => props.theme.fontTypes.headline};

  border-color: ${props => props.theme.colors.gray3};
`
