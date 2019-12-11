import styled from 'styled-components'

export const Container = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  min-height: 100vh;
  background-color: #fff;
  z-index: 2;
`

export const Section = styled.section`
  background-color: ${props =>
    props.backgroundColor ? props.backgroundColor : 'transparent'};
  border: ${props => (props.border ? props.border : 'none')};
  padding: 30px 0 45px;
`

export const Wrapper = styled.div`
  align-items: ${props => (props.align ? props.align : 'flex-start')};
  display: flex;
  flex-direction: ${props => (props.direction ? props.direction : 'column')};
  justify-content: ${props => (props.justify ? props.justify : 'flex-start')};
  margin: 0 auto;
  width: 900px;

  @media ${props => props.mediaQueries.xs} {
    width: 100%;
    padding: 0 15px;
  }
`

export const SectionTitle = styled.h3`
  font-size: ${props => (props.fontSize ? `${props.fontSize}px` : '34px')};
  letter-spacing: 0.5px;
  line-height: 44px;
  margin-top: ${props => (props.marginTop ? `${props.marginTop}px` : 0)};
  margin-bottom: 15px;
  font-weight: 300;
`

export const SectionText = styled.p`
  font-size: ${props => (props.fontSize ? `${props.fontSize}px` : '18px')};
  font-weight: ${props => (props.fontWeight ? props.fontWeight : '300')};
  margin-bottom: ${props =>
    props.marginBottom ? `${props.marginBottom}px` : 0};
  margin-top: ${props => (props.marginTop ? `${props.marginTop}px` : 0)};
  padding: ${props => (props.padding ? props.padding : 0)};
  text-align: ${props => (props.align ? props.align : 'left')};
  text-transform: ${props => (props.uppercase ? 'uppercase' : 'normal')};
`

export const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-top: ${({ marginTop }) => (marginTop ? `${marginTop}px` : 0)};
  margin-bottom: ${({ marginBottom }) =>
    marginBottom ? `${marginBottom}px` : 0};
`

export const Row = styled.div`
  display: flex;
  flex-direction: ${props => (props.direction ? props.direction : 'row')};
  justify-content: ${props => (props.justify ? props.justify : 'flex-start')};
  margin-bottom: ${props =>
    props.marginBottom ? `${props.marginBottom}px` : '30px'};
  margin-top: ${props => (props.marginTop ? `${props.marginTop}px` : '30px')};
  width: 100%;

  @media ${props => props.mediaQueries.xs} {
    flex-direction: column;
  }
`
