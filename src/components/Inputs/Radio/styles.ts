import styled from 'styled-components'

export const RadioTitle = styled.p`
  color: ${props => props.theme.colors.gray6};
  font-size: 14px;
  font-weight: 400;
  letter-spacing: 0;
  line-height: 24px;
  margin-right: 30px;
  word-break: break-word;
`

export const RadioInput = styled.input.attrs(() => ({ type: 'radio' }))`
  height: 20px;
  margin-right: 10px;
  position: relative;
  width: 20px;

  &:before {
    content: '';
    position: absolute;
    width: 100%;
    height: 100%;
    display: block;
    top: 0;
    left: 0;
    background-color: ${props => props.theme.colors.white};
    border-radius: 50%;
    border: 1px solid ${props => props.theme.colors.gray4};
  }
  &:after {
    content: '';
    width: 10px;
    height: 10px;
    display: block;
    position: absolute;
    top: calc(50% - 5px);
    left: calc(50% - 5px);
    border-radius: 50%;
    background-color: transparent;
  }
  &:checked {
    &:after {
      background-color: ${props => props.theme.colors.blue4};
    }
  }
`

interface ILabel {
  disabled: boolean | undefined
}

export const RadioLabel = styled.label<ILabel>`
  align-items: center;
  color: ${props =>
    props.disabled ? props.theme.colors.gray5 : props.theme.colors.black};
  cursor: pointer;
  display: flex;
  font-size: 14px;
  font-style: ${props => (props.disabled ? 'italic' : 'normal')};
  margin: 8px 16px 8px 0;
  pointer-events: ${props => (props.disabled ? 'none' : 'all')};

  &:last-of-type {
    margin-right: 0;
  }
`

interface IWrapper {
  itemsAlign: 'flex-start' | 'center' | 'flex-end'
  itemsDirection: 'row' | 'column' | 'row-reverse' | 'column-reverse'
  paddingLeft: number
  paddingRight: number
  marginLeft: number
  marginRight: number
  width: number | string
}

export const RadioWrapper = styled.div<IWrapper>`
  align-items: ${props => props.itemsAlign};
  display: flex;
  flex-direction: ${props => props.itemsDirection};
  padding-left: ${props => `${props.paddingLeft}px`};
  padding-right: ${props => `${props.paddingRight}px`};
  margin-left: ${props => `${props.marginLeft}px`};
  margin-right: ${props => `${props.marginRight}px`};
  width: ${props =>
    typeof props.width === 'string' ? props.width : `${props.width}%`};
  justify-content: center;

  @media ${props => props.theme.mediaQueries.xs} {
    flex-direction: column;
    margin: 15px 0;
  }
`
