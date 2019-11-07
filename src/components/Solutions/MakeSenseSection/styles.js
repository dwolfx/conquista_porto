import styled from 'styled-components'

export const Container = styled.section`
  padding-top: 28px;
  padding-bottom: 28px;
  background-color: ${props =>
    props.backgroundColor ? props.backgroundColor : 'white'};
`

export const Title = styled.div`
  text-align: center;
  font-size: 18px;
  line-height: 28px;
  font-weight: 300;
`

export const ItemsContainer = styled.div`
  display: flex;
  margin-top: 22px;
  width: 1200px;
  margin: 22px auto 0 auto;
  justify-content: space-evenly;

  @media (max-width: 1200px) {
    width: 800px;
  }

  @media (max-width: 768px) {
    flex-direction: column;
    width: unset;
  }
`

export const Item = styled.div`
  width: 240px;
  display: flex;
  flex-direction: column;
  align-items: center;

  @media (max-width: 768px) {
    flex-direction: row;
    align-items: center;
    padding: 0 8px;
    width: initial;
    margin-bottom: 22px;
  }
`

export const Circle = styled.div`
  background-color: #33beff;
  width: 72px;
  height: 72px;
  border-radius: 100%;

  display: flex;
  justify-content: center;
  align-items: center;

  @media (max-width: 768px) {
    width: 52px;
    height: 52px;
  }
`

export const ItemDescription = styled.p`
  font-size: 14px;
  line-height: 19px;
  font-weight: 300;
  text-align: ${props => props.align};
  color: #1c1c1c;
  margin-top: 12px;

  @media (max-width: 768px) {
    margin-top: unset;
    padding-left: 12px;
    text-align: unset;
    flex: 2;
  }
`
