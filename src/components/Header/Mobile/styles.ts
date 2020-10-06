import styled from 'styled-components'
import ConquistaBetaIcon from 'assets/images/logoConquistaBeta.png'
import NotificationBell from 'components/NotificationBell'
import IconConquista from 'components/IconExporter'

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  width: 100%;
  height: 100vh;
  overflow: hidden;
  position: sticky;
  top: 0;
  left: 0;
  z-index: 20;
  background-color: ${props => props.theme.colors.white};
`

export const Content = styled.div`
  width: 100%;
  height: 100%;
  overflow: hidden;
  display: flex;
  flex-direction: column;
`

export const ProfileContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: ${({theme}) => `${theme.spacing(2)}px 0`};
`

export const NotificationContainer = styled.div`
  display: flex;
  align-items: center;
  border-bottom: 1px solid ${props => props.theme.colors.gray2};
  padding: ${({theme}) => `${theme.spacing(2)}px ${theme.spacing(3)}px`};
`

export const NotificationBellIcon = styled(NotificationBell)``

export const ProductsContainer = styled.div`
  padding: ${({theme}) => `${theme.spacing(2)}px ${theme.spacing(3)}px`};
  overflow: auto;
`

export const Header = styled.div`
  width: 100%;
  padding: ${({theme}) => `${theme.spacing(1)}px ${theme.spacing(3)}px`};
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-bottom: 1px solid ${props => props.theme.colors.gray2};

  @media ${props => props.theme.mediaQueries.lg} {
    padding: 0 36px;
  }
  @media ${props => props.theme.mediaQueries.md} {
    padding: 0 30px;
  }
  @media ${props => props.theme.mediaQueries.sm} {
    padding: 0 14px;
  }
`

export const ConquistaBeta = styled.img.attrs(() => ({
  src: ConquistaBetaIcon,
}))`
  margin-top: 20px;
  cursor: pointer;

  @media ${props => props.theme.mediaQueries.lg} {
    margin-top: 21px;
  }
`

export const ResponsiveMenu = styled.div`
  width: 28px;
  height: 28px;
  background-color: ${props => props.theme.colors.blue4};
  border-radius: 2px;
  display: flex;
  align-items: center;
  justify-content: center;

  svg {
    fill: ${props => props.theme.colors.white};
  }
`

export const Icon = styled(IconConquista).attrs(props => ({
  name: props.name,
}))`
  width: 21px;
  height: 21px;
  fill: ${props => props.color && props.theme.colors[props.color]};
`

export const Footer = styled.div`
  width: 100%;
  height: 70px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: auto;
  border-top: 1px solid ${props => props.theme.colors.gray2};
`
