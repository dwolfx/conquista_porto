import styled from 'styled-components'

export const InputGroupWrapper = styled.div`
  background-color: ${props => props.theme.colors.gray1};
  border-bottom: ${props => `1px solid ${props.theme.colors.gray3}`};
  border-radius: 8px 8px 0px 0px;
`

export const InputWrapper = styled.div`
  align-items: center;
  display: flex;
  position: relative;
  #prefix {
    left: 0;
    padding-left: 14px;
  }
  #suffix {
    right: 0;
    padding-right: 14px;
  }
  :focus-within {
    #prefix,
    #suffix {
      color: ${props => props.theme.colors.gray6};
    }
  }
`

export const InputLabel = styled.div`
  color: ${props => props.theme.colors.gray5};
  font-family: ${props => props.theme.fontTypes.captionUppercase};
  padding-top: 7px;
`

export const InputAddon = styled.div`
  align-items: center;
  color: ${props => props.theme.colors.gray4};
  display: flex;
  font-family: ${props => props.theme.fontTypes.headline};
  height: 100%;
  position: absolute;
`

export const Input = styled.input`
  background-color: transparent;
  border: none;
  font-family: ${props => props.theme.fontTypes.headline};
  height: 48px;
  padding-left: ${props => {
    if (props.questionType === 'text') {
      return '33px'
    }
    if (props.questionType === 'number') {
      return '40px'
    }
    return '14px'
  }};
  width: ${props => `${props.width}%`};
  :focus {
    border-bottom: ${props => `2px solid ${props.theme.colors.blue4}`};
  }
`

export const InputAddonText = styled.div``
