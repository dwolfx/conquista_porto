import styled, { css } from 'styled-components'

const inputDefaultStyle = css`
  background-color: transparent;
  border: none;
  border-bottom: 1px solid ${props => props.theme.colors.gray3};
  font-family: ${props => props.theme.fontTypes.headline};
  height: 48px;
  padding-left: ${props => {
    if (props.questionType === 'text') return '33px'
    if (props.questionType === 'number') return '40px'
    return '14px'
  }};
  width: ${props => `${props.width}%`};
  :focus {
    border-bottom: 2px solid ${props => props.theme.colors.blue4};
  }
`

const inputErrorStyle = css`
  border-bottom: 2px solid ${props => props.theme.colors.magenta2};
  color: ${props => props.theme.colors.magenta2};
  :focus {
    border-bottom: 2px solid ${props => props.theme.colors.magenta2};
  }
`

export const InputGroupWrapper = styled.div`
  background-color: ${props => props.theme.colors.gray1};
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
    padding-right: 14px;
    right: 0;
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
  padding-left: 14px;
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
  ${inputDefaultStyle}
  ${props => props.error && inputErrorStyle}
`
