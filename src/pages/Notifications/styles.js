import styled from 'styled-components'
import ConquistaIcon from 'components/IconExporter'
import ComponentText from 'components/Text'

export const NotificationsBody = styled.section`
  margin: 0 auto;
  max-width: 1200px;
  width: 100%;

  @media ${props => props.theme.mediaQueries.mdUp} {
    width: 984px;
    padding: 30px 0;
  }

  @media ${props => props.theme.mediaQueries.lgUp} {
    width: 1200px;
  }
`
export const BreadcrumbContainer = styled.div`
  padding: 30px;
  text-align: center;

  @media ${props => props.theme.mediaQueries.mdUp} {
    padding: 0;
    text-align: left;
  }
`
export const PageTitle = styled(ComponentText)`
  width: 100%;
  padding: 30px;
  text-align: center;
`
export const NotificationsSection = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;

  @media ${props => props.theme.mediaQueries.mdUp} {
    margin-top: 22px;
    flex-direction: row;
    align-items: flex-start;
  }
`
export const NotificationsArticle = styled.article`
  display: flex;
  flex-direction: column;
  background-color: ${props => props.theme.colors.white};

  @media ${props => props.theme.mediaQueries.mdUp} {
    width: 83%;
  }
`
export const NotificationsMessages = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 0;

  @media ${props => props.theme.mediaQueries.mdUp} {
    padding: 0 60px 60px;
  }
`
export const LeftNav = styled.nav`
  display: flex;
  width: 100%;
  justify-content: center;
  flex-direction: row;
  padding-left: 30px;
  padding-right: 30px;
  overflow-y: auto;
  max-height: 778px;

  @media ${props => props.theme.mediaQueries.mdUp} {
    flex-direction: column;
    width: 17%;
    padding-left: 0;
  }

  @media ${props => props.theme.mediaQueries.xs} {
    justify-content: flex-start;
  }
`
export const GearBtnLink = styled.div`
  border: 2px solid ${props => props.theme.colors.gray4};
  background-color: ${props => props.theme.colors.gray2};
  padding: 8px;
  margin-bottom: 30px;
  padding: 14px;
  cursor: pointer;
  width: 150px;
  height: 130px;
  min-width: 130px;
  max-height: 130px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-evenly;

  :hover {
    box-shadow: 0px 2px 7px 1px rgba(0, 0, 0, 0.3);
    transition: all ease 0.2s;
  }

  @media ${props => props.theme.mediaQueries.mdUp} {
    width: 100%;
  }
`
export const Text = styled(ComponentText)`
  text-align: left;
  text-transform: ${props => (props.upperCase ? 'uppercase' : 'none')};
  color: ${props => props.fontColor || props.theme.colors.black};
  padding-bottom: ${props => props.paddingBottom || '0px'};
`
export const ManageableItem = styled.div`
  background: white;
  width: 150px;
  min-width: 130px;
  max-height: 130px;
  list-style-type: none;
  margin-bottom: 30px;
  position: relative;
  padding: 14px;
  cursor: pointer;
  -moz-transition: all 0.2s ease 0s;
  -o-transition: all 0.2s ease 0s;
  -webkit-transition: all 0.2s ease 0s;
  transition: all 0.2s ease 0s;
  text-decoration: none;
  filter: drop-shadow(0 2px 8px rgba(0, 0, 0, 0.15));
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-left: 22px;

  ::after {
    content: '';
    display: ${props => !props.active && 'none'};
    position: absolute;
    left: calc(50% - 11px);
    top: 100%;
    border-top: 12px solid white;
    border-bottom: 11px solid transparent;
    border-left: 11px solid transparent;
    border-right: 11px solid transparent;

    @media ${props => props.theme.mediaQueries.mdUp} {
      top: calc(50% - 11px);
      left: 100%;
      border-top: 11px solid transparent;
      border-bottom: 11px solid transparent;
      border-left: 12px solid ${props => props.theme.colors.white};
      border-right: none;
    }
  }

  @media ${props => props.theme.mediaQueries.mdUp} {
    width: 100%;
    margin-left: 0;
  }
`
export const Icon = styled(ConquistaIcon)`
  padding: 30px 0 15px;
  fill: ${props => props.theme.colors.blue4};
  width: 25px;
`
export const GearIcon = styled(ConquistaIcon).attrs({ name: 'gear' })`
  fill: ${props => props.theme.colors.gray4};
  width: 48px;
`
