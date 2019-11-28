import styled, { css } from 'styled-components'

const borderRight = css`
  border-right: 2px solid #d2d2d2;
`
export const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 900px;
  height: auto;
  border-radius: 8px;
`
export const ModalTitle = styled.div`
  display: flex;
  width: 900px;
  height: auto;
  padding: 30px;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid #c7c7c7;
`
export const Icon = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  padding-right: 20px;

  svg {
    fill: #33beff;
    height: 25px;
  }
`
export const Wrapper = styled.div`
  display: flex;
  flex-direction: ${props => (props.direction ? props.direction : 'row')};
  width: ${props => (props.width ? props.width : 'auto')};
  align-items: center;
  justify-content: ${props => (props.justify ? props.justify : 'center')};
  ${props => props.borderRight && borderRight};
`
export const IconCircle = styled.div`
  display: flex;
  width: 35px;
  height: 35px;
  background-color: #fe5c00;
  border-radius: 50%;
  align-items: center;
  justify-content: center;

  svg {
    fill: #fff;
    height: 28px;
    width: 28px;
  }
`
export const FundsDetailsSection = styled.section`
  display: flex;
  width: 100%;
  padding-top: 30px;
  background-color: #f9f9f9;
`
export const Title = styled.h1`
  display: flex;
  height: 44px;
  justify-content: center;
  align-items: center;
  color: #33beff;
  font-size: 22px;
  font-weight: 300;
  letter-spacing: 0.5px;
`
export const SubTitle = styled.h2`
  display: flex;
  justify-content: center;
  align-items: center;
  color: #000;
  font-size: 22px;
  font-weight: 300;
  letter-spacing: 0.5px;
  padding: 30px;
`
export const Notification = styled.p`
  font-size: 10px;
  font-weight: 400;
  height: 22px;
  letter-spacing: 1.5px;
  line-height: 22px;
  text-align: center;
  text-transform: uppercase;
  padding: 15px 30px 52px 30px;
`
