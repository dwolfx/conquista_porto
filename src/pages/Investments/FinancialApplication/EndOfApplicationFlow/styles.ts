import styled from 'styled-components'

import ButtonComponent from 'components/Button'
import CardComponent from 'components/Card'
import ConquistaIcon from 'components/IconExporter'
import TextComponent from 'components/Text'

export interface IProps {
  onCloseLayer: () => void
}

export const AccountInfoText = styled(TextComponent).attrs(() => ({
  type: 'headline',
  bold: true,
}))`
  color: ${({ theme }) => theme.colors.gray5};
`

export const AccountInfoTitle = styled(TextComponent).attrs(() => ({
  type: 'captionUppercase',
  bold: true,
}))`
  color: ${({ theme }) => theme.colors.gray4};
`

export const AccountWrapper = styled.div`
  display: flex;
  background-color: ${({ theme }) => theme.colors.gray1};
  border-radius: 8px;
  margin: 0 ${({ theme }) => theme.spacing(8)}px
    ${({ theme }) => theme.spacing(4)}px ${({ theme }) => theme.spacing(15)}px;
  padding: ${({ theme }) => theme.spacing(3)}px
    ${({ theme }) => theme.spacing(1)}px;

  @media ${props => props.theme.mediaQueries.lg} {
    margin-left: ${({ theme }) => theme.spacing(4)}px;
  }
`

export const Button = styled(ButtonComponent)`
  margin-right: ${({ theme }) => theme.spacing(2)}px;
`

export const ButtonsWrapper = styled.div`
  display: flex;
  width: 100%;
  justify-content: flex-end;
`

export const Icon = styled(ConquistaIcon)`
  width: ${({ theme }) => theme.spacing(4)}px;
  height: ${({ theme }) => theme.spacing(4)}px;
  margin-right: ${({ theme }) => theme.spacing(3)}px;
`

export const Card = styled(CardComponent)`
  height: 100%;
  width: 100%;
  position: absolute;

  @media ${props => props.theme.mediaQueries.md} {
    position: relative;
    height: 52vh;
  }
`

export const ContainerAccountInfo = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  flex-wrap: wrap;
`

export const ContentWrapper = styled.div`
  width: 100%;
  height: 100%;
  background-color: ${({ theme }) => theme.colors.white};
  overflow: auto;
  margin-top: 46px;
`

export const InfoTextError = styled(TextComponent).attrs(() => ({
  bold: true,
}))`
  color: ${({ theme }) => theme.colors.gray5};
  margin: 0 0 ${({ theme }) => theme.spacing(3)}px
    ${({ theme }) => theme.spacing(15)}px;

  @media ${props => props.theme.mediaQueries.lg} {
    margin-left: ${({ theme }) => theme.spacing(11)}px;
  }
`

export const InfoTextSuccess = styled(TextComponent).attrs(() => ({
  bold: true,
}))`
  color: ${({ theme }) => theme.colors.gray5};
  margin: 0 0 ${({ theme }) => theme.spacing(3)}px
    ${({ theme }) => theme.spacing(15)}px;

  @media ${props => props.theme.mediaQueries.lg} {
    margin-left: ${({ theme }) => theme.spacing(4)}px;
  }
`

export const RulesAndConditionsText = styled(TextComponent).attrs(() => ({
  type: 'headline',
}))`
  color: ${({ theme }) => theme.colors.gray5};
  margin-bottom: ${({ theme }) => theme.spacing(3)}px;
`

export const RulesAndConditionsWrapper = styled.div`
  display: flex;
  flex-direction: column;
  background-color: ${({ theme }) => theme.colors.gray1};
  border-radius: 8px;
  margin: 0 ${({ theme }) => theme.spacing(8)}px
    ${({ theme }) => theme.spacing(8)}px ${({ theme }) => theme.spacing(15)}px;
  padding: ${({ theme }) => theme.spacing(4)}px
    ${({ theme }) => theme.spacing(3)}px ${({ theme }) => theme.spacing(1)}px;

  @media ${props => props.theme.mediaQueries.lg} {
    margin-left: ${({ theme }) => theme.spacing(4)}px;
  }
`

export const SubTitle = styled(TextComponent).attrs(() => ({
  type: 'headline',
  bold: true,
}))`
  color: ${({ theme }) => theme.colors.gray6};
  margin-left: ${({ theme }) => theme.spacing(15)}px;
  margin-bottom: ${({ theme }) => theme.spacing(2)}px;

  @media ${props => props.theme.mediaQueries.lg} {
    margin-left: ${({ theme }) => theme.spacing(4)}px;
  }
`

export const TableBox = styled.div`
  min-width: 33%;
`

export const Title = styled(TextComponent).attrs(() => ({
  type: 'headline',
  bold: true,
}))`
  color: ${({ theme }) => theme.colors.gray6};
`

export const TitleWrapper = styled.div`
  display: flex;
  align-items: center;
  margin: 0 0 11px ${({ theme }) => theme.spacing(8)}px;

  @media ${props => props.theme.mediaQueries.lg} {
    margin-left: ${({ theme }) => theme.spacing(4)}px;
  }
`
