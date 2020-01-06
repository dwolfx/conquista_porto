import styled from 'styled-components'
import logoSeguroViagem from 'assets/images/logoSeguroViagem.png'
import logoConquistaBeta from 'assets/images/logoConquistaBeta.png'
import { Container, Row, Col } from 'styled-bootstrap-grid'

export const GridContainer = styled(Container)`
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`
export const GridRow = styled(Row)``
export const GridCol = styled(Col)`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`

export const Background = styled.div`
  width: 100%;
  height: 100vh;
  background-color: ${props => props.theme.colors.gray1};
`

export const LogoConquista = styled.img.attrs({
  src: logoConquistaBeta,
})`
  margin-bottom: 53px;
`

export const LogoPorto = styled.img.attrs({
  src: logoSeguroViagem,
})`
  margin: 53px 0px;
`

export const Card = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  background-color: ${props => props.theme.colors.white};
  border: ${props => `1px solid ${props.theme.colors.gray2}`};
  padding: 21px;
`

export const Text = styled.p`
  ${props => props.theme.fontTypes.body}
  font-weight: body;
  text-align: center;
`

export const Line = styled.div`
  width: 100%;
  height: 1px;
  background-color: ${props => props.theme.colors.gray2}
  margin-bottom: 17px;
`
