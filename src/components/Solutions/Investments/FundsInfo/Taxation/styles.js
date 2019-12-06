import styled from 'styled-components'

export const Container = styled.div`
  width: 295px;
  background-color: #f9f9f9;
  @media (max-width: 900px) {
    width: 154px;
  }
  @media (max-width: 489px) {
    width: 100%;
  }
`
export const LineWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 15px 30px 15px 60px;
  @media (max-width: 900px) {
    padding: 10px 15px 10px 15px;
  }
  @media (max-width: 489px) {
    justify-content: center;
  }
`
export const DetailItem = styled.div`
  display: flex;
  flex-direction: column;
  height: 46px;
  @media (max-width: 489px) {
    text-align: center;
    justify-content: center;
  }
`
export const Title = styled.h4`
  text-align: left;
  font-size: 11px;
  font-weight: 600;
  letter-spacing: 1.5px;
  line-height: 21px;
  text-transform: uppercase;
  height: 36px;
  padding: 0px 30px 15px 60px;
  @media (max-width: 900px) {
    padding: 0px 20px 15px 20px;
  }
  @media (max-width: 489px) {
    text-align: center;
  }
`
export const SubTitle = styled.h5`
  font-size: 14px;
  font-weight: 300;
  line-height: 24px;
`
export const Text = styled.p`
  font-size: 18px;
  font-weight: 300;
  line-height: 28px;
`
