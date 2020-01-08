import styled from 'styled-components'
import BreadcrumbCmp from 'components/Breadcrumb'
import RiskDegreeComponent from 'components/RiskDegree'
import {
  SelectWrapper,
  SelectFieldWrapper,
  SelectField,
} from 'components/Inputs/Select/styles'
import { Container, Row, Col } from 'styled-bootstrap-grid'

export const GridContainer = styled(Container)`
  background-color: ${props => props.theme.colors.gray1};
  flex: 1 0 auto;
`

export const TopWrapper = styled(Row)`
  margin-top: 2rem;
  margin-bottom: 1rem;

  @media ${props => props.theme.mediaQueries.xs} {
    margin-top: 1rem;
  }

  ${SelectWrapper} {
    margin-top: 1rem;
    width: 100%;
  }

  ${SelectFieldWrapper} {
    background-color: ${props => props.theme.colors.white};
    height: 32px;
    margin-top: 0.5rem;
    &:after {
      right: 12px;
    }

    &:before {
      right: 8px;
    }
  }

  ${SelectField} {
    border-bottom: none;
    height: 32px;
    padding-left: 0.5rem;
  }
`

export const Breadcrumb = styled(BreadcrumbCmp)`
  flex: 1 0 auto;

  @media ${props => props.theme.mediaQueries.sm} {
    margin-bottom: 0.5rem;
  }

  @media ${props => props.theme.mediaQueries.md} {
    padding-bottom: 0.5rem;
    border-bottom: 1px solid ${props => props.theme.colors.gray3};
  }
`

export const ContentWrapper = styled(Row)``

export const BreadcrumbWrapper = styled.div``

export const RiskDegree = styled(RiskDegreeComponent)`
  margin-left: auto;
  max-width: 300px;
`

export const DropdownWrapper = styled(Col)`
  z-index: 1;
`
