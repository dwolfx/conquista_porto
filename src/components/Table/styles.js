import styled, { css } from 'styled-components'
import ConquistaIcon from '../IconExporter'

export const Table = styled.table`
  text-transform: uppercase;
  border: 1px solid ${props => props.theme.colors.gray3};
  border-collapse: collapse;
  font-size: 11px;
  width: 100%;
`

export const TheadTr = styled.tr`
  background-color: ${props => props.theme.colors.gray3};
`

export const TheadTh = styled.th.attrs(() => ({ width: '300px' }))`
  border: 1px solid ${props => props.theme.colors.gray3};
  color: ${props => props.theme.colors.gray6};
  text-transform: uppercase;
  padding-top: 20px;
  padding-bottom: ${props => (props.hasFilter ? 0 : '20px')};
`

export const TbodyTr = styled.tr`
  background-color: ${props => props.theme.colors.white};
  &:nth-of-type(even) {
    background-color: ${props => props.theme.colors.gray1};
  }
`

export const TbodyTd = styled.td`
  border: 1px solid ${props => props.theme.colors.gray3};
  text-align: center;
  padding: 20px;
`
export const InputFilter = styled.input`
  background-color: transparent;
  border: none;
  border-bottom: 1px solid ${props => props.theme.colors.gray3};
  height: 100%;
  width: 100%;
`

export const InputFilterWrapper = styled.div`
  background-color: ${props => props.theme.colors.gray1};
  height: 60px;
  margin-top: 20px;
  padding: 11px;
`

export const Tfoot = styled.tfoot`
  background-color: ${props => props.theme.colors.gray3};
  text-transform: none;
`

export const TfootTd = styled.td`
  text-align: ${props => (props.textAlign ? props.textAlign : `left`)};
  padding: 2px;
  padding-left: ${props =>
    props.paddingLeft ? `${props.paddingLeft}px` : `2px`};
`

export const PaginationButton = styled.button`
  background-color: transparent;
  border: none;
  border-radius: 2px;
  color: ${props => props.theme.colors.black};
  cursor: pointer;
  margin: 1px;
  margin-left: ${props => (props.marginLeft ? `${props.marginLeft}px` : '1px')};
  margin-right: ${props => (props.marginRight ? `${props.marginRight}px` : 0)};
  padding: ${props => (props.padding ? props.padding : 0)};
  height: 37px;
  min-width: 37px;
  visibility: ${props => (props.visibility ? props.visibility : 'visible')};
  &.active {
    background-color: ${props => props.theme.colors.white};
    color: ${props => props.theme.colors.blue4};
  }

  &:hover {
    background-color: ${props => props.theme.colors.white};
  }

  &:disabled polyline {
    stroke: ${props => props.theme.colors.gray5};
  }

  &:disabled:hover {
    background-color: ${props => props.theme.colors.gray2};
  }
`

const defaultIconStyle = css`
  height: 10px;
  polyline {
    stroke-width: 9px;
    stroke: ${props => props.theme.colors.black};
  }
`

export const ForwardIcon = styled(ConquistaIcon).attrs(() => ({
  name: 'forward',
}))`
  height: 10px;
  margin-left: ${props => (props.marginLeft ? `${props.marginLeft}px` : 0)};
  width: ${props => (props.width ? props.width : `10px`)};
  polyline {
    stroke-width: 9px;
    stroke: ${props => props.theme.colors.black};
  }
`

export const BackwardIcon = styled(ConquistaIcon).attrs(() => ({
  name: 'backward',
}))`
  ${defaultIconStyle}
  width: 10px;
`
