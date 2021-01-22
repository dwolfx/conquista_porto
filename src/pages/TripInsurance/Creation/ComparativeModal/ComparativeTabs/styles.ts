import styled, { css } from 'styled-components'

import DivisorComponent from 'components/Divisor'
import { Tabs, TabList } from 'components/Tab/NewTab'
import Text from 'components/Text'

export const StyledTabs = styled(Tabs)`
  display: flex;
  justify-content: center;
  flex-direction: column;
`

export const OverflowWrapper = styled.div<{ travelPlansLength: number }>`
  height: 68px;

  ${({ travelPlansLength }) =>
    travelPlansLength <= 2
      ? css`
          position: relative;
          display: flex;
          justify-content: center;
          align-items: center;
        `
      : css`
          overflow-x: auto;
          width: 100%;
          position: absolute;
          top: 69px;
          left: 0;
          right: 0;
          ::-webkit-scrollbar {
            display: none; //Safari, Chrome, Firefox, IE
          }
          scrollbar-width: none; //Firefox for Android
        `}
`

export const StickyContent = styled.div<{ travelPlansLength: number }>`
  display: flex;
  justify-content: center;
  position: absolute;
  background-color: ${({ theme }) => theme.colors.white};
  width: auto;

  ${({ travelPlansLength }) =>
    travelPlansLength > 2 &&
    css`
      padding: ${({ theme }) => `0 ${theme.spacing(2)}px`};
    `}
`

export const StyledTabList = styled(TabList)`
  width: 100%;
  position: sticky;
  margin-top: ${({ theme }) => theme.spacing(3)}px;
  margin-bottom: 0px;
  white-space: nowrap;

  & > div {
    padding: ${({ theme }) => `${theme.spacing(2)}px ${theme.spacing(3)}px`};
  }
`

export const PlansData = styled.div<{ travelPlansLength: number }>`
  ${({ travelPlansLength }) =>
    travelPlansLength <= 2
      ? css`
          margin-top: ${({ theme }) => theme.spacing(2)}px;
        `
      : css`
          margin-top: ${({ theme }) => theme.spacing(12)}px;
        `}

  overflow: auto;
  height: calc(100vh - 215px);
`

export const LabelText = styled(Text).attrs(() => ({
  bold: true,
  color: 'gray5',
}))``

export const ValueText = styled(Text).attrs(() => ({
  bold: true,
  color: 'gray6',
}))``

export const Divisor = styled(DivisorComponent)`
  margin: ${({ theme }) => `${theme.spacing(1)}px 0`};
`
