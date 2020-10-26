import styled from 'styled-components'
import Icon from 'components/IconExporter'
import Text from 'components/Text'

export const CloseButton = styled(Icon)`
  fill: ${props => props.theme.colors.gray4};
  cursor: pointer;
  height: 28px;
  transition: all ease 0.3s;
  width: 28px;

  &:hover {
    fill: ${props => props.theme.colors.blue4};
  }
`

export const DrawerBody = styled.div`
  overflow-y: auto;
  height: 100%;
  padding: 28px 14px;

  @media ${props => props.theme.mediaQueries.sm} {
    padding: 0;
  }
`

export const DrawerFooter = styled.div`
  border-top: 1px solid ${props => props.theme.colors.gray3};
  height: 63px;
  display: flex;
  justify-content: center;
  padding: 0 14px;
  align-items: center;
  margin-top: auto;

  @media ${props => props.theme.mediaQueries.lg} {
    padding: 14px;
  }

  @media ${props => props.theme.mediaQueries.sm} {
    padding: 0;
  }
`

export const DrawerHeader = styled.div`
  border-bottom: 1px solid ${props => props.theme.colors.gray3};
  display: flex;
  justify-content: space-between;
  padding: 10px 14px 14px;

  @media ${props => props.theme.mediaQueries.xs} {
    padding: 0;
  }
`

export const DrawerTitle = styled(Text).attrs(() => ({
  type: 'headline',
  bold: true,
}))`
  color: ${props => props.theme.colors.gray6};
`

interface IDrawerContentProps {
  isOpen: boolean
  positionDrawer: string
  size?: 'md' | 'sm' | 'lg'
}

export const DrawerContent = styled.div<IDrawerContentProps>`
  background-color: ${props => props.theme.colors.white};
  box-shadow: ${props => props.theme.shadows.gray4};
  display: flex;
  flex-direction: column;
  height: 100%;
  width: 100%;
  overflow: hidden;
  padding: 10px 14px 0 14px;
  position: fixed;
  transition: all ease 0.5s;
  max-width: ${({ size }) => {
    switch (size) {
      case 'sm':
        return '392px'
      case 'md':
        return '418px'
      default:
        return '658px'
    }
  }};
  top: 0;
  ${props => ({
    [props.positionDrawer]: props.isOpen ? '0' : 'calc(-100% - 7px)',
  })}

  @media ${props => props.theme.mediaQueries.lg} {
    max-width: 484px;
    margin: 0;
  }

  @media ${props => props.theme.mediaQueries.xs} {
    min-width: 100vw;
    padding: 0;
  }
`

export const DrawerWrapper = styled.div`
  width: 100%;
  height: 100%;
  z-index: 13;
`

interface IDrawerOverlayProps {
  isOpen: boolean
}
export const DrawerOverlay = styled.div<IDrawerOverlayProps>`
  background-color: rgba(39, 39, 39, 0.63);
  height: 100%;
  position: fixed;
  transition: all ease 0.3s;
  width: 100%;
  visibility: ${props => (props.isOpen ? 'visible' : 'hidden')};
  opacity: ${props => (props.isOpen ? '1' : '0')};
  left: 0;
  top: 0;
`
