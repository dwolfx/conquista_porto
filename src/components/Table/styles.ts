import styled, { css } from 'styled-components'

import Text from 'components/Text'

interface IWrapper {
  lineHeight?: string
  isThead?: boolean
  isTbody?: boolean
  isBold?: boolean
}

export const WrapperContent = styled.div<IWrapper>`
  line-height: ${props => (props.lineHeight ? props.lineHeight : '36px')};
  padding: ${({ theme }) => `${theme.spacing(1)}px 0`};
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
  width: 458px;
  height: 100%;
  display: flex;
  align-items: center;
  flex-direction: column;
  height: 100%;
  justify-content: center;
  padding: ${({ theme }) => `${theme.spacing(3)}px ${theme.spacing(5)}px`};
  white-space: pre-line;
  text-align: center;
`

export const TableWrapper = styled.div`
  border: 1px solid ${({ theme }) => theme.colors.gray2};
  border-radius: 4px;
  position: relative;
  overflow: hidden;
  white-space: nowrap;
  height: auto;
  width: 100%;
`

export const Table = styled.div`
  border-collapse: collapse;
  height: 100%;
  overflow: auto;
  width: 100%;

  &.sticky {
    .body {
      height: auto;
      min-width: 100%;
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
  height: 56px;
  background-color: ${({ theme }) => theme.colors.gray1};
  border-top-left-radius: 4px;
  border-top-right-radius: 4px;
  border: 1px solid ${({ theme }) => theme.colors.gray3};
`

interface ITheadTh {
  canSort?: boolean
  minWidth?: string | number
  width?: string | number
}

export const TheadTh = styled.div<ITheadTh>`
  background-color: inherit;
  cursor: ${({ canSort }) => (canSort ? 'pointer' : 'default')};
  display: inline-block;
  position: relative;
  height: 100%;
  padding-left: ${({ theme }) => theme.spacing(3)}px;
  padding-right: ${({ theme }) => theme.spacing(1)}px;
  min-width: ${({ minWidth, theme }) => {
    if (minWidth) {
      return typeof minWidth === 'string'
        ? `calc(${minWidth} + ${theme.spacing(4)}px)`
        : `${minWidth + theme.spacing(4)}px`
    }

    return 0
  }};
  width: ${({ width, theme }) => {
    if (width) {
      return typeof width === 'string'
        ? `calc(${width} + ${theme.spacing(4)}px)`
        : `${width + theme.spacing(4)}px`
    }

    return 'auto'
  }};
`

interface ITheadContent {
  justifyHeader?: string
  isTbody?: boolean
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

export const TheadThWithColumns = styled(TheadTh)`
  padding: 12px 0 0;

  ${WrapperContent} {
    border-top: 1px solid ${({ theme }) => theme.colors.gray3};
    display: flex;
    margin-top: ${({ theme }) => theme.spacing(1)}px;

    span::after {
      top: 45px;
      right: initial;
    }
  }
`

interface ITheadIcon {
  isSorted: boolean
  isSortedDesc: boolean
}

export const TheadText = styled(Text)`
  user-select: none;
  text-transform: uppercase;
`

export const IconContainer = styled.div<ITheadIcon>`
  align-items: center;
  display: flex;
  height: ${({ isSorted }) => (isSorted ? '10px' : '21px')};
  margin-left: ${({ theme }) => theme.spacing(1)}px;
  overflow: hidden;
  position: relative;
  width: 21px;

  svg {
    position: absolute;
    top: ${({ isSortedDesc, isSorted }) =>
      isSortedDesc && isSorted ? '-10px' : '0'};
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
  border: 1px solid ${({ theme }) => theme.colors.gray3};
  height: calc(100% - 56px);
  display: block;

  @media ${({ theme }) => theme.mediaQueries.lg} {
    border-right: 0;
  }
  @media ${({ theme }) => theme.mediaQueries.md} {
    border-right: 0;
  }
`

interface ITbodyTr {
  hasClickOnRow: boolean
}

export const TbodyTr = styled.div<ITbodyTr>`
  align-items: center;
  background-color: ${({ theme }) => theme.colors.white};
  border-bottom: 1px solid ${({ theme }) => theme.colors.gray3};
  color: ${({ theme }) => theme.colors.gray5};
  display: flex;
  font-weight: normal;
  cursor: ${({ hasClickOnRow }) => (hasClickOnRow ? 'pointer' : 'default')};
  padding: 0;
  position: relative;
  width: 100%;

  &:hover {
    background-color: ${({ theme, hasClickOnRow }) =>
      hasClickOnRow ? theme.colors.gray1 : 'transparent'};
  }
  &:last-of-type {
    border-bottom: unset;
  }
`

interface ITbodyTd {
  align: string
  minWidth?: string | number
  width?: string | number
  inheritMarginFirstCell: boolean
}

export const TbodyTd = styled.div<ITbodyTd>`
  background-color: inherit;
  display: flex;
  font-size: 14px;
  justify-content: ${props => props.align || 'center'};
  margin-left: ${({ theme }) => theme.spacing(3)}px;
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
    /* margin-right: ${({ theme }) => theme.spacing(2)}px; */
    padding-right: ${({ theme }) => theme.spacing(1)}px;
    padding-left: ${({ theme }) => theme.spacing(1)}px;
  }
  &:first-child {
    margin-left: ${({ inheritMarginFirstCell }) =>
      inheritMarginFirstCell ? '21px' : 0};
  }
`

interface IStickyDivisor {
  position: string
  side: 'right' | 'left'
}

export const StickyDivisor = styled.div<IStickyDivisor>`
  border-left: 1px solid ${({ theme }) => theme.colors.gray6};
  height: 100%;
  opacity: 0.14;
  position: absolute;
  width: 2px;
  z-index: 2;
  ${props =>
    props.side === 'left'
      ? `left: ${props.position}`
      : `right: ${props.position}`};

  &:before {
    content: '';
    background-color: ${({ theme }) => theme.colors.gray6};
    filter: blur(2px);
    height: 100%;
    position: absolute;
    top: 0;
    width: 2px;
    ${props => (props.side === 'right' ? `left: -4px` : `right: -1px`)};
  }
`
