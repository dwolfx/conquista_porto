import styled from 'styled-components'
import Text from 'components/Text'
import ButtonComponent from 'components/Button'

export const SidebarWrapper = styled.div`
  padding-top: ${({ theme }) => `${theme.spacing(3)}px`};
`

export const ContentWrapper = styled.div`
  background-color: ${props => props.theme.colors.gray1};
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100%;
  margin: 0;
  overflow: auto;
  z-index: 12;
`

export const Title = styled(Text).attrs(() => ({
  bold: true,
  color: 'gray6',
  type: 'heading4',
}))`
  margin-bottom: ${({ theme }) => `${theme.spacing(4)}px`};
`

export const SubTitle = styled(Text).attrs(() => ({
  color: 'gray5',
  type: 'subheading'
}))`
  text-transform: uppercase;
  margin-bottom: ${({ theme }) => `${theme.spacing(3)}px`};
`

export const SendButton = styled(ButtonComponent).attrs(() => ({
  color: 'secondary',
  loadingColor: 'white'
}))`
  width: 180px;
  background-color: ${props => props.theme.colors.green4};
  @media ${({ theme }) => theme.mediaQueries.xs} {
    width: 100%;
  }
`
