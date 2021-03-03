import styled from 'styled-components'
import {
  Row as RowComponent,
  Col as ColComponent,
  Container as ContainerComponent,
} from 'styled-bootstrap-grid'

import CardCmp from 'components/Card'
import TextCmp from 'components/Text'
import Button from 'components/Button'

export const Section = styled.div`
  padding-bottom: ${({ theme }) => theme.spacing(9)}px;
`

export const Row = styled(RowComponent)`
  margin: ${({ theme }) => theme.spacing(3)}px 0;
  align-items: start;
  justify-content: center;
  position: relative;

  @media ${props => props.theme.mediaQueries.lgUp} {
    justify-content: start;
  }

  @media ${props => props.theme.mediaQueries.sm} {
    justify-content: center;
  }
`

export const Col = styled(ColComponent)`
  &:first-child {
    @media ${props => props.theme.mediaQueries.lgUp} {
      margin-left: ${({ theme }) => theme.spacing(3)}px;
      h4 {
        margin-top: ${({ theme }) => theme.spacing(2)}px;
      }
    }
    @media ${props => props.theme.mediaQueries.smUp} {
      h4,
      h5 {
        margin-left: ${({ theme }) => theme.spacing(1)}px;
      }
    }
  }
  &:last-child {
    @media ${props => props.theme.mediaQueries.lgUp} {
      margin-left: ${({ theme }) => theme.spacing(1)}px;
    }
  }
`

export const ContentWrapper = styled(ContainerComponent)`
  display: flex;
  justify-content: center;
  flex-direction: row;
  margin: 0 auto;

  @media ${props => props.theme.mediaQueries.sm} {
    height: 100%;
    padding: 0 ${({ theme }) => theme.spacing(3)}px;
  }
`

export const ContentWrapperFooter = styled(ContainerComponent)`
  display: flex;
  justify-content: flex-end;
  flex-direction: row;
  margin: 0 auto;

  @media ${props => props.theme.mediaQueries.sm} {
    height: 100%;
    padding: 0 ${({ theme }) => theme.spacing(3)}px;
  }
`

export const ContentInfo = styled.div`
  padding: ${({ theme }) => theme.spacing(2)}px;
`
export const ContentInfoText = styled.div`
  padding: ${({ theme }) => theme.spacing(2)}px;
`

export const Card = styled(CardCmp)`
  display: flex;
  align-items: stretch;
  padding: ${({ theme }) => theme.spacing(5)}px;

  @media ${props => props.theme.mediaQueries.lgUp} {
    align-items: center;
  }

  @media ${props => props.theme.mediaQueries.xs} {
    padding: 0;
  }
`
export const CardContentWrapper = styled.div`
  @media ${props => props.theme.mediaQueries.xs} {
    padding: 0 ${({ theme }) => theme.spacing(2)}px;
  }

  &:first-child {
    @media ${props => props.theme.mediaQueries.mdUp} {
      margin-bottom: ${({ theme }) => theme.spacing(4)}px;
    }
  }
`

export const TitleText = styled(TextCmp)`
  margin-bottom: ${({ theme }) => theme.spacing(2)}px;

  @media ${props => props.theme.mediaQueries.xs} {
    &:first-child {
      padding-top: ${({ theme }) => theme.spacing(3)}px;
    }
    &:last-child {
      padding-top: ${({ theme }) => theme.spacing(1)}px;
    }
  }
`

export const Table = styled.table`
  display: table;
  border-collapse: separate;
  border-spacing: 0;
  width: 840px;

  @media ${props => props.theme.mediaQueries.lg} {
    margin-bottom: ${({ theme }) => theme.spacing(7)}px;
    width: 100%;
  }

  tr td:first-child,
  th td:first-child {
    border-left: 1px solid ${props => props.theme.colors.gray3};
    border-right: 0px;
  }
  tr td:last-child,
  th td:last-child {
    border-left: 0px;
  }
`

export const Thead = styled.thead`
  border-bottom: 1px solid ${props => props.theme.colors.gray3};
  max-height: 56px;
`
export const THeadTr = styled.tr`
  height: 56px;
  border-bottom: 1px solid ${props => props.theme.colors.gray3};
`
export const Tr = styled.tr`
  height: 79px;
  border-bottom: 1px solid ${props => props.theme.colors.gray3};

  //Last Row
  &:last-child {
    border-bottom: none;

    td:first-child {
      border-bottom-left-radius: 8px;
    }
    td:last-child {
      border-bottom-right-radius: 8px;
    }
  }

  // Last Column
  & > td:last-child,
  th:last-child {
    // Horizontal Tablet
    @media ${props => props.theme.mediaQueries.mdUp} {
      p {
        margin-right: ${({ theme }) => `${theme.spacing(2)}px`};

        // Desktop
        @media ${props => props.theme.mediaQueries.lgUp} {
          margin-right: ${({ theme }) => `${theme.spacing(12)}px`};
        }
      }
    }
  }
`

export const Th = styled.th`
  text-align: start;
  background-color: ${({ theme }) => theme.colors.gray1};
  width: auto;
  padding-right: 0;
  padding-left: ${({ theme }) => theme.spacing(3)}px;
  border: 1px solid ${props => props.theme.colors.gray3};

  &:first-child {
    border-right: 0;
    border-top-left-radius: 8px;
  }

  &:last-child {
    border-left: 0;
    padding-left: 0px;
    border-top-right-radius: 8px;
    @media ${props => props.theme.mediaQueries.sm} {
      text-align: center;
    }
  }

  @media ${props => props.theme.mediaQueries.lgUp} {
    width: 182px;
    padding-right: ${({ theme }) => theme.spacing(18)}px;
  }
`

export const Td = styled.td<{ center?: boolean }>`
  border-right: 1px solid ${props => props.theme.colors.gray3};
  border-bottom: 1px solid ${props => props.theme.colors.gray3};

  & > * {
    margin: 0 0 ${({ theme }) => theme.spacing(1)}px
      ${({ theme }) => theme.spacing(3)}px;

    ${({ theme, center }) =>
      center
        ? `
      @media ${theme.mediaQueries.xs} {
        &:last-child {
          margin: 0;
        }
      }
    `
        : ''}
  }
`

export const Tbody = styled.tbody``

export const Text = styled(TextCmp)``

export const DescriptionText = styled(TextCmp)`
  margin: 0 0 ${({ theme }) => theme.spacing(3)}px
    ${({ theme }) => theme.spacing(3)}px;
`

export const NameText = styled(TextCmp)`
  display: grid;
`

export const StatusText = styled(TextCmp).attrs(() => ({
  type: 'caption',
  bold: true,
}))`
  margin-left: ${({ theme }) => theme.spacing(1)}px;
`

export const StatusWrapper = styled.div`
  display: flex;
  align-items: center;
  margin-left: 0;

  @media ${props => props.theme.mediaQueries.sm} {
    justify-content: center;
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
