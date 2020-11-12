import styled from 'styled-components'

import { Container, Col, Row } from 'styled-bootstrap-grid'
import Text from 'components/Text'
import VerticalList from 'components/VerticalList'
import Button from 'components/Button'
import Popover from 'components/Popover'

export const Header = styled.div`
  width: 100%;
  background-color: ${({ theme }) => theme.colors.white};
  height: 79px;
  position: fixed;
  top: 0;
  z-index: 1;
`

export const HeaderGridContainer = styled(Container)`
  @media ${({ theme }) => theme.mediaQueries.mdUp} {
    padding: 0px;
    margin: ${({ theme }) => `${theme.spacing(0)}px ${theme.spacing(4)}px`};
  }
`

export const HaderGridRow = styled(Row)``

export const HaderGridCol = styled(Col)`
  padding: 0px;
  @media ${props => props.theme.mediaQueries.mdUp} {
    padding: 0px ${({ theme }) => theme.spacing(1)}px;
  }
`

export const HeaderContent = styled.div`
  display: flex;
  align-items: center;
`

export const LogoWrapper = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: ${({ theme }) => theme.spacing(2)}px 0px;
`

export const SubHeader = styled.div`
  background-color: ${props => props.theme.colors.grayblue1};
  height: 56px;
  position: relative;
  margin-top: 79px;
`

export const GridContainer = styled(Container)`
  @media ${({ theme }) => theme.mediaQueries.mdUp} {
    padding: 0px;
  }
`
export const GridRow = styled(Row)`
  margin: 0;
`

export const GridCol = styled(Col)`
  height: 56px;
  display: flex;
  align-items: center;
  padding: 0px;
`

export const Wrapper = styled.div`
  margin-top: ${({ theme }) => theme.spacing(3)}px;

  @media ${({ theme }) => theme.mediaQueries.sm} {
    margin-top: ${({ theme }) => theme.spacing(4)}px;
  }
`

export const StickyContent = styled.div`
  @media ${({ theme }) => theme.mediaQueries.mdUp} {
    position: absolute;
    top: 0;
    height: 100%;
  }
  @media ${({ theme }) => theme.mediaQueries.smUp} {
    margin-bottom: ${({ theme }) => `${theme.spacing(3)}px`};
  }
`

export const StyledVerticalList = styled(VerticalList)`
  @media ${({ theme }) => theme.mediaQueries.sm} {
    padding: ${({ theme }) => `${theme.spacing(1)}px ${theme.spacing(4)}px`};
  }
  @media ${({ theme }) => theme.mediaQueries.mdUp} {
    position: sticky;
    top: 100px;
  }
`

export const ProposalTitle = styled(Text)`
  padding-bottom: 14px;
`

export const StyledCol = styled(Col)`
  @media ${({ theme }) => theme.mediaQueries.sm} {
    margin-top: ${({ theme }) => `${theme.spacing(4)}px`};
  }
  @media ${({ theme }) => theme.mediaQueries.xs} {
    margin: ${({ theme }) =>
      `${theme.spacing(2)}px ${theme.spacing(1)}px ${theme.spacing(1)}px`};
  }
`

export const CheckboxWrapper = styled.div`
  display: flex;
  align-items: center;
  padding: ${({ theme }) =>
    `${theme.spacing(2)}px ${theme.spacing(21)}px ${theme.spacing(
      2
    )}px ${theme.spacing(6)}px`};

  @media ${({ theme }) => theme.mediaQueries.sm} {
    padding: ${({ theme }) => `${theme.spacing(3)}px`};
  }
`

export const StyledText = styled(Text)`
  margin-left: ${({ theme }) => theme.spacing(2)}px;
  cursor: pointer;
  user-select: none;

  @media ${({ theme }) => theme.mediaQueries.sm} {
    margin-left: 0;
  }
`

export const Footer = styled.div`
  width: 100%;
  border-top: 1px solid ${({ theme }) => theme.colors.gray3};
  margin-top: ${({ theme }) => theme.spacing(2)}px;
  background-color: ${({ theme }) => theme.colors.white};
  padding: ${({ theme }) => `${theme.spacing(2)}px ${theme.spacing(6)}px`};

  display: flex;
  justify-content: flex-end;

  @media ${({ theme }) => theme.mediaQueries.sm} {
    padding: ${({ theme }) => `${theme.spacing(2)}px`};
    justify-content: flex-start;

    button {
      width: 100%;
    }
  }
`

export const Tooltip = styled(Popover)`
  background-color: ${props => props.theme.colors.white};
`

export const TooltipText = styled(Text)`
  width: 213px;
`

export const AcceptButton = styled(Button)`
  margin-left: ${({ theme }) => theme.spacing(2)}px;
`
