import styled from 'styled-components'
import { Container } from 'styled-bootstrap-grid'

import ConquistaBetaIcon from 'assets/images/logoConquistaBeta.png'
import ConquistaIcon from 'components/IconExporter'
import NotificationBellComponent from 'components/NotificationBell'
import AvatarComponent from 'components/Avatar'
import Tag from 'components/Tag'

export const BgWrapper = styled.div`
  background-color: ${props => props.theme.colors.gray1};
  width: 100vw;
  position: sticky;
  top: 0;
  z-index: 10;
  border-bottom: ${props =>
    props.isScrolled ? `1px solid ${props.theme.colors.gray2}` : 'none'};
`

export const GridContainer = styled(Container)`
  width: 100%;
  height: 72px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 14px;
`

export const LeftBlock = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
`

export const RightBlock = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;

  && > div:not(:last-child) {
    margin-right: 14px;
  }
`

export const Icon = styled(ConquistaIcon).attrs({
  name: props => props.name,
})`
  width: 21px;
  height: 21px;
  margin: 0 7px;
  flex-shrink: 0;
`

export const ConquistaBeta = styled.img.attrs({
  src: ConquistaBetaIcon,
})`
  width: 144px;
  height: 51px;
  margin-top: 20px;
  margin-right: 28px;
  cursor: pointer;
`

export const Profile = styled.div`
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  justify-content: center;
  cursor: pointer;

  svg {
    align-self: center;
  }
`

export const Name = styled.p`
  ${props => props.theme.fontTypes.headline};
  color: ${props => props.theme.colors.gray6};
`

export const Points = styled.p`
  ${props => props.theme.fontTypes.caption};
  color: ${props => props.theme.colors.blue4};
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

export const MenuTag = styled(Tag)`
  cursor: pointer;
`

export const NotificationBell = styled(NotificationBellComponent)`
  cursor: pointer;
`

export const Avatar = styled(AvatarComponent)`
  cursor: pointer;
`
