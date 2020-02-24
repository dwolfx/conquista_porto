import styled, { css } from 'styled-components'
import Icon from 'components/IconExporter'

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
  ${props => props.theme.fontTypes.headline};
`

export const InputWrapper = styled.div`
  ${inputDefaultStyle}
  ${props => props.error && inputErrorStyle}
  position: relative;
`

export const InputLabel = styled.div`
  color: ${props => props.theme.colors.gray5};
  padding-left: 14px;
  padding-top: 7px;
  ${props => props.theme.fontTypes.captionUppercase};
`

export const InputAddon = styled.div`
  align-items: center;
  color: ${props => props.theme.colors.gray4};
  display: flex;
  font: inherit;
  height: 100%;
`

export const ErrorMessage = styled.span`
  bottom: -28px;
  color: ${props => props.theme.colors.magenta2};
  display: flex;
  left: 14px;
  position: absolute;
  ${props => props.theme.fontTypes.body};
`

export const ErrorIcon = styled(Icon)`
  fill: ${props => props.theme.colors.magenta2};
  margin-right: 7px;
`

export const Input = styled.input`
  background-color: inherit;
  border: none;
  color: inherit;
  font: inherit;
  padding: 0 7px;
  width: inherit;

  &:-webkit-autofill {
    box-shadow: none;
    -webkit-box-shadow: 0 0 0 30px ${props => props.theme.colors.gray1} inset;
  }

  ::-webkit-input-placeholder {
    color: ${props => props.theme.colors.gray4};
    ${props => props.theme.fontTypes.headline};
  }
`
