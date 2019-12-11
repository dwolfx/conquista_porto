import styled from 'styled-components'
import Select from 'components/Inputs/Select'
import BreadcrumbCmp from 'components/Breadcrumb'
import RiskDegreeComponent from 'components/RiskDegree'
import {
  SelectWrapper,
  SelectFieldWrapper,
  SelectField,
} from 'components/Inputs/Select/styles'

const containerWidth = '1200px'

export const Section = styled.section`
  background-color: ${props => props.theme.colors.backgroundColor};
  flex: 1 0 auto;
`

export const TopWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  margin: 2rem auto 1rem;
  max-width: ${containerWidth};
  padding: 0 0.5rem;

  @media ${props => props.theme.mediaQueries.xs} {
    margin-top: 1rem;
    flex-direction: column;
  }
`

export const SelectRiskClassification = styled(Select)``

export const SelectRow = styled.div`
  display: flex;
  flex: 1 0 auto;

  ${SelectWrapper} {
    margin: 1rem 0 0 auto;
    flex: 1 0 auto;
    max-width: 370px;

    @media ${props => props.theme.mediaQueries.xs} {
      flex: unset;
    }

    @media ${props => props.theme.mediaQueries.sm} {
      &:not(:last-of-type) {
        margin-right: 0.5rem;
      }
    }
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
  max-width: 195px;

  @media ${props => props.theme.mediaQueries.sm} {
    margin-bottom: 0.5rem;
  }

  @media ${props => props.theme.mediaQueries.xs} {
    padding-bottom: 0.5rem;
    border-bottom: 1px solid ${props => props.theme.colors.gray.light};
    max-width: none;
  }
`

export const ContentWrapper = styled.div`
  margin: 1rem auto;
  max-width: ${containerWidth};

  @media ${props => props.theme.mediaQueries.sm} {
    padding: 0 0.5rem;
  }
`

export const FooterWrapper = styled.div`
  margin: 1rem auto;
  max-width: ${containerWidth};

  @media ${props => props.theme.mediaQueries.xs} {
    padding: 0 0.5rem;
  }

  p {
    font-size: 12px;
    font-weight: 300;
    line-height: 22px;
  }

  a {
    color: ${props => props.theme.colors.linkBlue};
    font-weight: bold;
    text-transform: uppercase;
  }

  img {
    margin-top: 2rem;
  }
`

export const ImgAnbima = styled.img`
  @media ${props => props.theme.mediaQueries.sm} {
    padding: 0 1rem;
    max-width: 100%;
  }
`

export const BreadcrumbWrapper = styled.div``

export const RiskDegree = styled(RiskDegreeComponent)`
  margin-left: 1rem;
  @media ${props => props.theme.mediaQueries.xs} {
    display: none;
  }
`
