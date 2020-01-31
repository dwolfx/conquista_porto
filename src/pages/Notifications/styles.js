import styled from 'styled-components'
import ComponentText from 'components/Text'

import { Container } from 'styled-bootstrap-grid'
export const PageTitle = styled(ComponentText)`
  width: 100%;
  padding: 30px;
  text-align: center;
`
export const GridContainer = styled(Container)`
  padding: 30px 0;
`
export const NotificationsArticle = styled.article`
  display: flex;
  flex-direction: column;
  background-color: ${props => props.theme.colors.white};
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

export const ModalContent = styled.div`
  margin: 30px;
`
