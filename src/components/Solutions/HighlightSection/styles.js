import styled from 'styled-components'

export const Container = styled.section`
  padding-top: 28px;
  padding-bottom: 28px;
  background-color: ${props =>
    props.backgroundColor ? props.backgroundColor : 'white'};
`

export const Content = styled.div`
  text-align: center;

  @media (min-width: 1206px) {
    width: 1200px;
    margin: 0 auto;
  }
`

export const Title = styled.h1`
  padding-bottom: 30px;
  text-align: center;
  font-size: 34px;
  letter-spacing: 0.5px;
  line-height: 44px;
  font-weight: 300;
  color: ${props => (props.textColor ? props.textColor : 'white')};
`

export const Text = styled.p`
  color: white;
  text-align: center;
  font-size: 18px;
`
