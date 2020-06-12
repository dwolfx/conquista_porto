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

  @media ${({ theme }) => theme.mediaQueries.lg} {
    margin-left: ${({ theme }) => theme.spacing(4)}px;
  }

  @media ${({ theme }) => theme.mediaQueries.xs} {
    margin: 0 ${({ theme }) => theme.spacing(3)}px
      ${({ theme }) => theme.spacing(4)}px;
  }
`

export const Button = styled(ButtonComponent)`
  margin-right: ${({ theme }) => theme.spacing(2)}px;

  @media ${({ theme }) => theme.mediaQueries.xs} {
    margin: 0 ${({ theme }) => theme.spacing(2)}px;
    &:last-child {
      margin-bottom: ${({ theme }) => theme.spacing(1)}px;
    }
  }
`

export const ButtonsWrapper = styled.div`
  display: flex;
  width: 100%;
  justify-content: flex-end;

  @media ${({ theme }) => theme.mediaQueries.xs} {
    flex-direction: column-reverse;
  }
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

  @media ${({ theme }) => theme.mediaQueries.md} {
    position: relative;
    height: 52vh;
  }

  @media ${({ theme }) => theme.mediaQueries.xs} {
    height: 100%;
    border-radius: 0;
    padding: 10px 0 0;
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

  @media ${({ theme }) => theme.mediaQueries.xs} {
    margin-top: 11px;
  }
`

export const InfoTextError = styled(TextComponent).attrs(() => ({
  bold: true,
}))`
  color: ${({ theme }) => theme.colors.gray5};
  margin: 0 0 ${({ theme }) => theme.spacing(3)}px
    ${({ theme }) => theme.spacing(15)}px;

  @media ${({ theme }) => theme.mediaQueries.lg} {
    margin-left: ${({ theme }) => theme.spacing(11)}px;
  }

  @media ${({ theme }) => theme.mediaQueries.xs} {
    margin-left: ${({ theme }) => theme.spacing(10)}px;
  }
`

export const InfoTextSuccess = styled(TextComponent).attrs(() => ({
  bold: true,
}))`
  color: ${({ theme }) => theme.colors.gray5};
  margin: 0 0 ${({ theme }) => theme.spacing(3)}px
    ${({ theme }) => theme.spacing(15)}px;

  @media ${({ theme }) => theme.mediaQueries.lg} {
    margin-left: ${({ theme }) => theme.spacing(4)}px;
  }

  @media ${({ theme }) => theme.mediaQueries.xs} {
    margin-right: ${({ theme }) => theme.spacing(3)}px;
    margin-left: ${({ theme }) => theme.spacing(10)}px;
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

  @media ${({ theme }) => theme.mediaQueries.lg} {
    margin-left: ${({ theme }) => theme.spacing(4)}px;
  }

  @media ${({ theme }) => theme.mediaQueries.xs} {
    margin: 0 ${({ theme }) => theme.spacing(3)}px
      ${({ theme }) => theme.spacing(3)}px;
    padding-bottom: 0;
  }
`

export const SubTitle = styled(TextComponent).attrs(() => ({
  type: 'headline',
  bold: true,
}))`
  color: ${({ theme }) => theme.colors.gray6};
  margin-left: ${({ theme }) => theme.spacing(15)}px;
  margin-bottom: ${({ theme }) => theme.spacing(2)}px;

  @media ${({ theme }) => theme.mediaQueries.lg} {
    margin-left: ${({ theme }) => theme.spacing(4)}px;
  }

  @media ${({ theme }) => theme.mediaQueries.xs} {
    margin-left: ${({ theme }) => theme.spacing(3)}px;
  }
`

export const TableBox = styled.div`
  min-width: 33%;

  @media ${({ theme }) => theme.mediaQueries.xs} {
    min-width: 100%;
  }
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

  @media ${({ theme }) => theme.mediaQueries.lg} {
    margin-left: ${({ theme }) => theme.spacing(4)}px;
  }

  @media ${({ theme }) => theme.mediaQueries.xs} {
    margin-left: ${({ theme }) => theme.spacing(3)}px;
  }
`

export const FixedBottom = styled.div`
  position: fixed;
  bottom: 0;
  padding: ${({ theme }) => theme.spacing(2)}px 0;
  width: 100%;
  background-color: ${({ theme }) => theme.colors.white};
  border-top: 1px solid ${({ theme }) => theme.colors.gray3};
  z-index: 1;
`
