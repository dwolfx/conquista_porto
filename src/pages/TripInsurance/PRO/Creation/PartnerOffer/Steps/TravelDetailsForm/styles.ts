import styled from 'styled-components'
import { Container as ContainerComp } from 'styled-bootstrap-grid'

import Button from 'components/Button'
import ButtonLink from 'components/Button/Link'
import Card from 'components/Card'
import DivisorComp from 'components/Divisor'
import RadioComp from 'components/Inputs/Radio/New'
import SelectComp from 'components/Inputs/Select'
import InputNumberComp from 'components/Inputs/Number'
import Text from 'components/Text'
import { InputNumberContainer } from 'components/Inputs/Number/styles'
import IconCmp from 'components/IconExporter'

export const QuestionWrapper = styled.div`
  margin-bottom: ${({ theme }) => theme.spacing(6)}px;
  display: flex;
  &:last-child {
    margin: 0;
  }
`

export const PageWrapper = styled.div`
  height: 100vh;
  overflow: auto;
`

export const Container = styled(ContainerComp)`
  height: 100vh;
  margin-top: ${({ theme }) => theme.spacing(3)}px;
`

export const RadioWrapper = styled.div`
  display: flex;
  margin-top: ${({ theme }) => theme.spacing(2)}px;
`

export const InputWrapper = styled.div`
  width: 658px;
`

export const InformationWrapper = styled.div`
  width: 140px;
`

export const Radio = styled(RadioComp)`
  margin-right: ${({ theme }) => theme.spacing(2)}px;
  padding: ${({ theme }) => `${theme.spacing(2)}px 0`};

  &:last-child {
    margin: 0;
  }
`

export const InputNumber = styled(InputNumberComp)`
  width: auto;
  align-items: flex-start;
  margin-right: ${({ theme }) => theme.spacing(5)}px;

  ${InputNumberContainer} {
    margin-top: ${({ theme }) => theme.spacing(2)}px;
  }
`

export const SectionCard = styled(Card)`
  padding: ${({ theme }) =>
    `${theme.spacing(5)}px ${theme.spacing(5)}px ${theme.spacing(2)}px`};
  border-radius: 0;
`

export const FirstSectionCard = styled(Card)`
  padding: ${({ theme }) => `${theme.spacing(5)}px`};
  border-radius: 7px 7px 0px 0px;
`

export const LastSectionCard = styled(Card)`
  padding: ${({ theme }) =>
    `${theme.spacing(5)}px ${theme.spacing(5)}px ${theme.spacing(
      5
    )}px ${theme.spacing(7)}px`};
  border-radius: 0px 0px 7px 7px;
`

export const BadgeNotification = styled.span`
  padding: 4px;
  border-radius: 50%;
  background-color: ${({ theme }) => theme.colors.magenta2};
  margin-left: 3px;
  margin-bottom: 6px;
`

export const NavWrapper = styled.div`
  padding: ${({ theme }) =>
    `${theme.spacing(3)}px ${theme.spacing(2)}px ${theme.spacing(2)}px`};
  width: 100%;
  position: sticky;
  top: 0;
`

export const NavTitleWrapper = styled.div`
  padding: ${({ theme }) => `${theme.spacing(1)}px 0`};
  margin-bottom: ${({ theme }) => theme.spacing(1)}px;
`

export const TagsWrapper = styled.div`
  width: 60%;
`

export const Divisor = styled(DivisorComp)<{ vertical?: boolean }>`
  margin: ${({ theme }) => `${theme.spacing(1)}px 0`};
  ${({ theme, vertical }) => {
    if (vertical) {
      return `margin: 11px ${theme.spacing(10)}px;`
    }
  }}
`

export const Tag = styled.div<{ active: boolean }>`
  display: flex;
  height: 22px;
  align-items: center;
  margin: ${({ theme }) => `${theme.spacing(1)}px 0`};
  padding-left: ${({ theme }) => theme.spacing(3)}px;

  ${({ active, theme }) =>
    active
      ? `
    border-left: 2px solid ${theme.colors.blue4};
  `
      : ''}

  &:hover {
    background-color: #ebebeb;
  }
`

export const TagText = styled(Text).attrs(() => ({
  type: 'caption',
  color: 'gray6',
  bold: true,
}))`
  cursor: pointer;
`

export const SectionTitleWrapper = styled.div`
  height: 29px;
  padding-left: ${({ theme }) => theme.spacing(2)}px;
  display: flex;
  align-items: flex-start;
`

export const SectionTitle = styled(Text).attrs(() => ({
  type: 'subheading',
  color: 'gray5',
  bold: true,
}))``

export const Select = styled(SelectComp)`
  margin-bottom: ${({ theme }) => theme.spacing(4)}px;

  &:last-child {
    margin: 0;
  }
`

export const ComissionSelect = styled(SelectComp)`
  width: 100%;
  margin-bottom: ${({ theme }) => theme.spacing(2)}px;
`

export const CleanButton = styled(ButtonLink).attrs(() => ({ noIcon: true }))`
  margin-left: ${({ theme }) => theme.spacing(6)}px;
`

export const FindProposalButton = styled(Button).attrs(() => ({
  color: 'primary',
}))`
  width: 658px;
`

export const CommissionHelpButton = styled(ButtonLink).attrs(() => ({
  noIcon: true,
}))`
  justify-content: flex-end;
`

export const SectionContentWrapper = styled.div<{ flexDirection?: string }>`
  max-width: 658px;
  display: flex;
  flex-direction: ${({ flexDirection }) =>
    flexDirection ? flexDirection : 'row'};
  padding: ${({ theme }) => theme.spacing(2)}px;
`

const TextContainer = styled(Text)`
  margin: ${({ theme }) => `${theme.spacing(6)}px auto`};
  width: 434px;
  text-align: center;
`

export const HintText = styled(TextContainer).attrs(() => ({
  type: 'headline',
  color: 'gray5',
}))``

export const ErrorText = styled(TextContainer).attrs(() => ({
  type: 'headline',
  color: 'magenta2',
}))``
