import { Col, Container, Row } from 'styled-bootstrap-grid'
import styled from 'styled-components'
import TextLiteral from 'components/Text'
import DivisorCmp from 'components/Divisor'
import TextArea from 'components/TextArea'
import Checkbox from 'components/Inputs/Checkbox'
import Button from 'components/Button'

export const ContentContainer = styled(Container)`
  display: flex;
  flex-direction: column;
  padding: ${({ theme }) =>
    `${theme.spacing(3)}px ${theme.spacing(3)}px ${theme.spacing(10)}`}px;
  align-items: center;
  @media ${({ theme }) => theme.mediaQueries.lgUp} {
    flex-direction: row;
    align-items: flex-start;
  }
`
export const Column = styled(Col)`
  padding-bottom: ${({ theme }) => `${theme.spacing(3)}px`};
  @media ${({ theme }) => theme.mediaQueries.mdUp} {
    &:first-child {
      padding: 0
        ${({ theme }) => `${theme.spacing(18)}px ${theme.spacing(3)}px`};
    }
  }
`
export const ColumnSide = styled(Col)`
  margin-bottom: ${({ theme }) => theme.spacing(3)}px;
`

export const RowContent = styled(Row)``

export const TitleWrapper = styled.div`
  display: flex;
  flex-direction: column;
  @media ${({ theme }) => theme.mediaQueries.lgUp} {
    margin-right: 0;
  }
`
export const SideTitle = styled(TextLiteral)<{ spacing?: number }>`
  padding-left: 0;
`
export const TitleText = styled(TextLiteral)<{ spacing?: number }>`
  padding-left: ${({ theme }) => theme.spacing(4)}px;
  padding-bottom: ${({ theme, spacing }) => theme.spacing(spacing ?? 0)}px;
  @media ${({ theme }) => theme.mediaQueries.md} {
    padding-left: 0;
  }
  @media ${({ theme }) => theme.mediaQueries.sm} {
    padding: 0 0 ${({ theme, spacing }) => theme.spacing(spacing ?? 0)}px 0;
    &:last-child {
      margin-bottom: ${({ theme }) => theme.spacing(4)}px;
    }
  }
`
export const Text = styled(TextLiteral)<{ spacing?: number }>`
  padding-top: ${({ theme }) => theme.spacing(2)}px;
  padding-left: ${({ theme, spacing }) => theme.spacing(spacing ?? 0)}px;
`
export const Title = styled(TextLiteral)<{ spacing?: number }>`
  color: ${({ theme }) => theme.colors.gray6};
  padding-bottom: ${({ theme }) => theme.spacing(2)}px;
  padding-left: ${({ theme, spacing }) => theme.spacing(spacing ?? 0)}px;
`
export const Div = styled.div<{ col: boolean; spacing?: number }>`
  display: flex;
  flex-flow: ${props => (props.col ? 'column' : 'row')};
  padding: 0 ${({ theme }) => theme.spacing(19)}px 0
    ${({ theme }) => theme.spacing(5)}px;
  color: ${({ theme }) => theme.colors.gray6};

  @media ${({ theme }) => theme.mediaQueries.md} {
    padding: 0;
  }
  @media ${({ theme }) => theme.mediaQueries.sm} {
    padding: 0 0 0 ${({ theme }) => theme.spacing(3)}px;
  }
`
export const DivLast = styled.div<{ col: boolean; spacing?: number }>`
  display: flex;
  flex-flow: ${props => (props.col ? 'column' : 'row')};
  padding: 0 ${({ theme }) => theme.spacing(19)}px
    ${({ theme }) => theme.spacing(19)}px ${({ theme }) => theme.spacing(5)}px;
  color: ${({ theme }) => theme.colors.gray6};
  padding-bottom: ${({ theme }) => theme.spacing(3)}px;
  @media ${({ theme }) => theme.mediaQueries.md} {
    padding: 0 0 ${({ theme }) => theme.spacing(2)}px 0;
  }
  @media ${({ theme }) => theme.mediaQueries.sm} {
    padding: 0 0 ${({ theme }) => theme.spacing(2)}px
      ${({ theme }) => theme.spacing(3)}px;
  }
`
export const DivTextArea = styled.div<{ col: boolean; spacing?: number }>`
  display: flex;
  flex-flow: ${props => (props.col ? 'column' : 'row')};
  padding: 0 ${({ theme }) => theme.spacing(19)}px 0
    ${({ theme }) => theme.spacing(5)}px;
  color: ${({ theme }) => theme.colors.gray6};

  @media ${({ theme }) => theme.mediaQueries.md} {
    padding: 0 0 ${({ theme }) => theme.spacing(4)}px 0;
  }
  @media ${({ theme }) => theme.mediaQueries.sm} {
    padding: 0 0 ${({ theme }) => theme.spacing(2)}px 0;
  }
`
export const DivLastComp = styled.div<{ col: boolean; spacing?: number }>`
  display: flex;
  flex-flow: ${props => (props.col ? 'column' : 'row')};
  padding: 0 ${({ theme }) => theme.spacing(19)}px
    ${({ theme }) => theme.spacing(4)}px ${({ theme }) => theme.spacing(5)}px;
  color: ${({ theme }) => theme.colors.gray6};
  @media ${({ theme }) => theme.mediaQueries.sm} {
    padding-left: 0;
  }
  @media ${({ theme }) => theme.mediaQueries.md} {
    padding: ${({ theme }) => theme.spacing(2)}px 0;
  }
`
export const DivWithoutSpace = styled.div<{ col: boolean; spacing?: number }>`
  display: flex;
  flex-flow: ${props => (props.col ? 'column' : 'row')};
  padding: 0 ${({ theme }) => theme.spacing(19)}px 0
    ${({ theme }) => theme.spacing(5)}px;
  padding-left: 0;
  color: ${({ theme }) => theme.colors.gray6};

  @media ${({ theme }) => theme.mediaQueries.md} {
    padding: ${({ theme }) => theme.spacing(2)}px;
  }
`

export const OrderedList = styled.ol`
  color: ${({ theme }) => theme.colors.gray6};
  padding: 0 ${({ theme }) => theme.spacing(2)}px;
  @media ${({ theme }) => theme.mediaQueries.sm} {
    padding: 0 0 0 ${({ theme }) => theme.spacing(2)}px;
  }
`

export const ItemsList = styled.li`
  padding: ${({ theme }) => theme.spacing(1)}px
    ${({ theme }) => theme.spacing(1)}px;
  text-align: left;
  color: ${({ theme }) => theme.colors.gray6};
  font-size: ${props => props.theme.fontTypes.body};
  font-weight: 300;
  letter-spacing: 0;
  line-height: 24px;
  @media ${({ theme }) => theme.mediaQueries.sm} {
    padding: 0;
  }
`
export const Divider = styled(DivisorCmp)`
  margin: ${({ theme }) => theme.spacing(4)}px 0;
`

export const CompTextArea = styled(TextArea)`
  max-width: 90px;
`

export const CompCheckBox = styled(Checkbox)``

export const CheckboxContainer = styled.div`
  margin-bottom: ${({ theme }) => theme.spacing(3)}px;
  padding-left: ${({ theme }) => theme.spacing(5)}px;
  display: flex;
  @media ${({ theme }) => theme.mediaQueries.md} {
    padding-left: 0;
  }
`

export const Link = styled.a`
  color: ${({ theme }) => theme.colors.blue4};
  text-decoration: underline;
`
export const ContentWrapperFooter = styled(Container)`
  display: flex;
  justify-content: flex-end;
  flex-direction: row;
  margin: 0 auto;
  @media ${props => props.theme.mediaQueries.sm} {
    height: 100%;
    padding: 0 ${({ theme }) => theme.spacing(3)}px;
  }
`

export const FooterContainer = styled.div`
  display: flex;
  flex-direction: row;
  background-color: ${({ theme }) => theme.colors.white};
  border-top: 1px solid ${({ theme }) => theme.colors.gray3};
  padding: ${({ theme }) => theme.spacing(2)}px;
  justify-content: flex-end;
  position: fixed;
  width: 100%;
  bottom: 0;
  z-index: 2;
`

export const NextButton = styled(Button)`
  width: 100%;
  @media ${({ theme }) => theme.mediaQueries.smUp} {
    width: 133px;
  }
`
