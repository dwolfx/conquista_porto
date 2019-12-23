import styled from 'styled-components'

export const Container = styled.div``

export const SectionBar = styled.section`
  background-color: #555861;
  padding: 20px 0;
`
export const TitleBar = styled.p`
  color: ${props => props.theme.colors.gray1};
  font-size: ${props => (props.fontSize ? `${props.fontSize}px` : '34px')};
  text-transform: ${props => (props.uppercase ? 'uppercase' : 'normal')};
`

export const Section = styled.section`
  background-color: ${props =>
    props.backgroundColor ? props.backgroundColor : 'transparent'};
  padding: 5rem 0;
`

export const Wrapper = styled.div`
  margin: 5rem auto;
`

export const Text = styled.p`
  font-size: ${props => (props.fontSize ? `${props.fontSize}px` : '18px')};
  font-weight: ${props => (props.fontWeight ? props.fontWeight : '300')};
  margin-bottom: ${props =>
    props.marginBottom ? `${props.marginBottom}px` : 0};
  margin-top: ${props => (props.marginTop ? `${props.marginTop}px` : 0)};
  padding: ${props => (props.padding ? props.padding : 0)};
  text-align: ${props => (props.align ? props.align : 'left')};
  text-transform: ${props => (props.uppercase ? 'uppercase' : 'normal')};
`
