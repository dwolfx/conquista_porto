import styled from 'styled-components'

export const Container = styled.section`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: auto;
  background-color: #115fa5;
  color: #fff;
`
export const Title = styled.h5`
  width: 100%;
  text-align: center;
  font-size: 11px;
  font-weight: 600;
  height: 51px;
  letter-spacing: 1.5px;
  line-height: 21px;
  text-transform: uppercase;
  padding: 15px;
`
export const Wrapper = styled.div`
  display: flex;
  width: 100%;
  height: auto;
  padding: 15px 30px 30px 30px;
  border-bottom: 1px solid #fff;
  justify-content: space-between;
  @media (max-width: 900px) {
    flex-direction: column;
  }
  @media (max-width: 767px) {
    flex-direction: row;
  }
  @media (max-width: 660px) {
    flex-direction: column;
  }
`
export const ResponsiveLine = styled.div`
  display: flex;
  width: 100%;
  @media (max-width: 900px) {
    justify-content: space-between;
  }
`
export const ArticleItem = styled.div`
  width: 100%;
  justify-content: center;
  align-items: center;
  @media (max-width: 900px) {
    width: 160px;
  }
`
export const SubTitleWrapper = styled.div`
  font-size: 14px;
  font-weight: 300;
  line-height: 18.9px;
`
export const ValueWrapper = styled.div`
  font-size: 18px;
  font-weight: 300;
  line-height: 28px;
`
