import styled, { css } from 'styled-components'

const inputDefaultStyle = css`
  border-bottom: 1px solid ${props => props.theme.colors.gray3};
  height: 56px;
  width: ${props => `${props.width}%`};
  align-items: center;
  display: flex;
  padding: 0 7px;
  #prefix {
    padding-left: 7px;
  }
  #suffix {
    padding-right: 7px;
  }
  :focus-within {
    border-bottom: 2px solid ${props => props.theme.colors.blue4};
    #prefix,
    #suffix {
      color: ${props => props.theme.colors.gray6};
    }
  }
`

const inputErrorStyle = css`
  border-bottom: 2px solid ${props => props.theme.colors.magenta2};
  color: ${props => props.theme.colors.magenta2};
  :focus-within {
    border-bottom: 2px solid ${props => props.theme.colors.magenta2};
  }
`

export const InputGroupWrapper = styled.div`
  background-color: ${props => props.theme.colors.gray1};
  border-radius: 8px 8px 0px 0px;
`

export const InputWrapper = styled.div`
  ${inputDefaultStyle}
  ${props => props.error && inputErrorStyle}
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
`

export const Input = styled.input`
  background-color: inherit;
  border: none;
  color: inherit;
  font-family: ${props => props.theme.fontTypes.headline};
  height: inherit;
  padding: 0 7px;
  width: inherit;
`
