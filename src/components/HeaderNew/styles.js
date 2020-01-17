import styled from 'styled-components'
import { Container } from 'styled-bootstrap-grid'
import ConquistaIcon from 'components/IconExporter'
import ConquistaBetaIcon from 'assets/images/logoConquistaBeta.png'

export const GridContainer = styled(Container)`
  background-color: ${props => props.theme.colors.gray1};
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

  && div:not(:last-child) {
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
  margin-top: 20px;
  margin-right: 28px;
`

export const Profile = styled.div`
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  justify-content: center;

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
