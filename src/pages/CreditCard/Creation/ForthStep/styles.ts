import styled from 'styled-components'
import {
  Container as ContainerComponent,
  Col as ColComponent,
  Row as RowComponent,
} from 'styled-bootstrap-grid'

import ButtonComponent from 'components/Button'
import ButtonLinkComponent from 'components/Button/Link'
import CardComponent from 'components/Card'
import CEPInputComponent from 'components/Inputs/CEPInput'
import NewInput from 'components/NewInput'
import Text from 'components/Text'

import { CardBody } from 'components/Card/styles'

export const ContentWrapper = styled.div`
  position: absolute;
  top: 56px;
  width: 100%;
  padding: ${({ theme }) => `0 ${theme.spacing(6)}px`};

  @media ${({ theme }) => theme.mediaQueries.md} {
    padding: 0;
  }
`

export const Row = styled(RowComponent)`
  height: 311px;
  margin: ${({ theme }) => `${theme.spacing(2)}px 0`}; 

  @media ${({ theme }) => theme.mediaQueries.xs} {
    height: auto;
  }
`

export const FullHeightRow = styled(RowComponent)`
  height: calc(90vh - 142px);
  margin: ${({ theme }) => `${theme.spacing(2)}px 0`};

  @media ${({ theme }) => theme.mediaQueries.xs} {
    height: calc(90vh - 155px);
    ;
  }
`

export const RadioCard = styled(CardComponent)<{ checked: boolean }>`
  margin-bottom: ${({ theme }) => theme.spacing(2)}px;
  border-color: ${({ checked, theme }) => checked ? theme.colors.blue4 : theme.colors.gray3};
  &:last-child {
    margin: 0
  }
`

export const RadioCardWrapper = styled.div`
  margin: ${({ theme }) => `${theme.spacing(6)}px ${theme.spacing(2)}px ${theme.spacing(4)}px`};

  @media ${({ theme }) => theme.mediaQueries.xs} {
    margin: ${({ theme }) => `${theme.spacing(4)}px ${theme.spacing(2)}px`};
  }
`

export const TextTitle = styled(Text).attrs(() => ({
  type: 'headline',
  bold: true,
  color: 'gray6'
}))``

export const SectionTitle = styled(Text).attrs(() => ({
  type: 'headline',
  color: 'gray6'
}))`
  margin-bottom: ${({ theme }) => theme.spacing(2)}px;
`

export const AddressRow = styled(RowComponent)`
  margin: ${({ theme }) => `0 0 ${theme.spacing(12)}px`};
  height: auto;
`
export const FormContainer = styled(ContainerComponent)`
  padding: ${({ theme }) => `${theme.spacing(6)}px ${theme.spacing(4)}px`};

  @media ${({ theme }) => theme.mediaQueries.xs} {
    padding: ${({ theme }) => `${theme.spacing(6)}px ${theme.spacing(2)}px`};
  }
`

export const FormCol = styled(ColComponent)`
  margin-bottom: ${({ theme }) => theme.spacing(2)}px;

  @media ${({ theme }) => theme.mediaQueries.xs} {
    margin-bottom: ${({ theme }) => theme.spacing(4)}px;
  }
`

export const Card = styled(CardComponent)`
  height: 100%;

  ${CardBody} {
    overflow: visible;
  }
`

export const CenterContentCard = styled(CardComponent)`
  height: 100%;
  align-items: center;
  justify-content: center;

  ${CardBody} {
    overflow: visible;
    align-items: center;
    justify-content: center;

    @media ${({ theme }) => theme.mediaQueries.xs} {
      padding: ${({ theme }) => theme.spacing(2)}px;
    }
  }
`
export const SelectWrapper = styled.div`
  margin: ${({ theme }) => `${theme.spacing(6)}px ${theme.spacing(4)}px 0`};

  @media ${({ theme }) => theme.mediaQueries.xs} {
    margin: ${({ theme }) => `${theme.spacing(2)}px 0`};
  }
`

export const ButtonPrimary = styled(ButtonComponent).attrs(() => ({
  color: 'primary'
}))`
  @media ${({ theme }) => theme.mediaQueries.xs} {
    width: 100%;
  }
`

export const ButtonNext = styled(ButtonComponent).attrs(() => ({
  color: 'secondary'
}))`
  @media ${({ theme }) => theme.mediaQueries.xs} {
    width: 100%;
  }
`

export const ButtonLink = styled(ButtonLinkComponent).attrs(() => ({
  noIcon: true,
  color: 'primary',
  role: 'button'
}))``

export const Footer = styled.div`
  position: fixed;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  padding: 0 42px;
  bottom: 0;
  left: 0;
  width: 100vw;
  height: 63px;
  background-color: white;
  
  @media ${({ theme }) => theme.mediaQueries.xs} {
    padding: ${({ theme }) => `0 ${theme.spacing(2)}px`};
  }
`

export const CenterContentCardWrapper = styled.div`
  display: flex;
  width: 458px;

  @media ${({ theme }) => theme.mediaQueries.xs} {
    width: 100%;
  }
`

export const TextTitleNoOffer = styled(Text).attrs(() => ({
  type: 'headline',
  bold: true,
  color: 'gray6',
}))`
  margin-bottom: ${({ theme }) => theme.spacing(2)}px;
`

export const TextBodyNoOffer = styled(Text).attrs(() => ({
  type: 'body',
  bold: true,
  color: 'gray5'
}))``

export const IconWrapper = styled.div`
  margin: ${({ theme }) => `0 ${theme.spacing(3)}px`};
`

export const FormInput = styled(NewInput)<{ hasError: boolean }>`
  ${({ theme, hasError }) => `margin-bottom: ${hasError && theme.spacing(5)}px;`}
`

export const CEPInput = styled(CEPInputComponent)<{ hasError: boolean }>`
  ${({ theme, hasError }) => `margin-bottom: ${hasError && theme.spacing(5)}px;`}
`
