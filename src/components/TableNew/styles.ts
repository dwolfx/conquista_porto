import styled, { css } from 'styled-components'

import ArrowSortable from 'assets/icons/arrow-sortable.svg'

interface IWrapper {
  lineHeight?: string
  isThead?: boolean
  isTbody?: boolean
  isBold?: boolean
}

export const WrapperContent = styled.div<IWrapper>`
  line-height: ${props => (props.lineHeight ? props.lineHeight : '36px')};
  white-space: pre-wrap;

  ${props =>
    props.isThead &&
    css`
      height: 100%;
      display: flex;
      flex-direction: column;
      justify-content: center;
    `}

  ${props =>
    props.isBold &&
    css`
      font-weight: 600;
      color: ${props.theme.colors.gray6};
    `}
`

export const InfoTableContent = styled.div`
  margin: auto;
  width: 428px;
  height: 100%;
  display: flex;
  align-items: center;
  flex-direction: column;
  height: 100%;
  justify-content: center;
  padding: 0 35px;
  white-space: pre-line;
  text-align: center;
`

export const TableWrapper = styled.div`
  border: 1px solid ${props => props.theme.colors.gray2};
  border-radius: 4px;
  position: relative;
  overflow: hidden;
  white-space: nowrap;
  height: auto;
  width: 100%;
`

export const Table = styled.div`
  border-collapse: collapse;
  overflow: auto;
  width: 100%;

  &.sticky {
    .body {
      height: auto;
      position: relative;
      width: fit-content;
      z-index: 0;
    }

    [data-sticky-td] {
      position: sticky;
    }
  }
`

export const Thead = styled.div`
  position: sticky;
  top: 0;
  width: 100%;
  z-index: 1;
`
export const TheadTr = styled.div`
  display: flex;
  padding: 0 0 0 ${props => props.theme.spacing(1)}px;
  height: 56px;
  background-color: ${props => props.theme.colors.gray1};
`

interface ITheadTh {
  canSort: boolean
  minWidth?: string | number
  width?: string | number
}

export const TheadTh = styled.div<ITheadTh>`
  background-color: inherit;
  cursor: ${props => (props.canSort ? 'pointer' : 'default')};
  display: inline-block;
  font-size: 11px;
  letter-spacing: 1px;
  line-height: 15px;
  position: relative;
  height: 100%;
  margin-left: ${props => props.theme.spacing(3)}px;
  padding-right: 14px;
  min-width: ${props => {
    if (props.minWidth) {
      return typeof props.minWidth === 'string'
        ? props.minWidth
        : `${props.minWidth}px`
    }

    return 0
  }};
  width: ${props => {
    if (props.width) {
      return typeof props.width === 'string' ? props.width : `${props.width}px`
    }

    return 'auto'
  }};

  &:last-child {
    margin-left: 0;
    padding-right: ${props => props.theme.spacing(3)}px;
  }
`

interface ITheadContent {
  justifyHeader: string
  isTbody: boolean
}

export const TheadContent = styled.div<ITheadContent>`
  align-items: center;
  display: flex;
  height: inherit;
  justify-content: ${props => props.justifyHeader || 'center'};
  white-space: pre-wrap;
  ${props =>
    props.isTbody &&
    css`
      height: 99px;
      padding: 30px 0;
    `};
`

const getArrowPosition = (isSortedDesc: boolean) =>
  isSortedDesc ? 'right -8px' : 'right 8px'

const getArrowTop = (isSortedDesc: boolean) => (isSortedDesc ? '23px' : '16px')

export const TheadThWithColumns = styled(TheadTh)`
  padding: 12px 0 0;

  ${WrapperContent} {
    border-top: 1px solid ${props => props.theme.colors.gray3};
    display: flex;
    margin-top: ${props => props.theme.spacing(1)}px;

    span::after {
      top: 45px;
      right: initial;
    }
  }
`

interface ITheadText {
  isSorted: boolean
  isSortedDesc: boolean
}

export const TheadText = styled.span<ITheadText>`
  user-select: none;

  &::after {
    content: '';
    background-image: url(${ArrowSortable});
    background-repeat: no-repeat;
    background-position: ${props =>
      props.isSorted ? getArrowPosition(props.isSortedDesc) : 'right center'};
    position: absolute;
    margin-left: 10px;
    top: ${props =>
      props.isSorted ? getArrowTop(props.isSortedDesc) : '19px'};
    width: 10px;
    height: 17px;
  }
`

interface ITheadColumn {
  width: string
}

export const TheadColumn = styled.div<ITheadColumn>`
  display: inline-block;
  width: ${props => props.width};
`

export const Tbody = styled.div`
  border: 1px solid ${props => props.theme.colors.gray2};
  display: block;
  height: 100%;

  @media ${props => props.theme.mediaQueries.lg} {
    border-right: 0;
  }
  @media ${props => props.theme.mediaQueries.md} {
    border-right: 0;
  }
`

export const TbodyTr = styled.div`
  align-items: center;
  background-color: ${props => props.theme.colors.white};
  border-bottom: 1px solid ${props => props.theme.colors.gray2};
  color: ${props => props.theme.colors.gray5};
  display: flex;
  font-weight: normal;
  cursor: pointer;
  padding: 3px 0 3px 3px;
  width: 100%;

  &:hover {
    background-color: ${props => props.theme.colors.gray1};
  }
`

interface ITbodyTd {
  align: string
  minWidth?: string | number | undefined
  width?: string | number | undefined
}

export const TbodyTd = styled.div<ITbodyTd>`
  background-color: inherit;
  display: flex;
  font-size: 14px;
  justify-content: ${props => props.align || 'center'};
  padding: 0;
  margin-left: ${props => props.theme.spacing(3)}px;
  min-width: ${props => {
    if (props.minWidth) {
      return typeof props.minWidth === 'string'
        ? props.minWidth
        : `${props.minWidth}px`
    }

    return 0
  }};
  width: ${props => {
    if (props.width) {
      return typeof props.width === 'string' ? props.width : `${props.width}px`
    }

    return 'auto'
  }};

  &:last-child {
    /* margin-right: ${props => props.theme.spacing(2)}px; */
    padding-right: ${props => props.theme.spacing(1)}px;
    padding-left: ${props => props.theme.spacing(2)}px;
  }
  &:first-child {
    margin-left: 0px;
  }
`

interface IStickyDivisor {
  position: number
  side: 'right' | 'left'
}

export const StickyDivisor = styled.div<IStickyDivisor>`
  border-left: 1px solid ${props => props.theme.colors.gray6};
  height: 100%;
  opacity: 0.14;
  position: absolute;
  width: 2px;
  z-index: 2;
  ${props =>
    props.side === 'left'
      ? `left: ${props.position}px`
      : `right: ${props.position}px`};

  &:before {
    content: '';
    background-color: ${props => props.theme.colors.gray6};
    filter: blur(2px);
    height: 100%;
    position: absolute;
    top: 0;
    width: 2px;
    ${props => (props.side === 'right' ? `left: -4px` : `right: -1px`)};
  }
`
