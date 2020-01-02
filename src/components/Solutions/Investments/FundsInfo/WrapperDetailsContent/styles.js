import styled from 'styled-components'

export const Container = styled.div`
  width: 598px;
  background-color: ${props => props.theme.colors.gray1};
  @media (max-width: 900px) {
    width: 332px;
    word-wrap: break-word;
  }
  @media (max-width: 767px) {
    width: 100%;
  }
`
export const LineWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 15px 30px 15px 30px;
  @media (max-width: 489px) {
    flex-direction: column;
    justify-content: center;
    text-align: center;
    padding: 0;
  }
`
export const DetailItem = styled.div`
  display: flex;
  width: 50%;
  flex-direction: column;
  height: 46px;
  @media (max-width: 489px) {
    width: 100%;
  }
`
export const Title = styled.h4`
  text-align: center;
  font-size: 11px;
  font-weight: 600;
  letter-spacing: 1.5px;
  line-height: 21px;
  text-transform: uppercase;
  height: 36px;
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
