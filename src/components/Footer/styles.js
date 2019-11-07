import styled from 'styled-components'
import { ReactComponent as mail } from '../../assets/icons/mail.svg'
import { ReactComponent as phone } from '../../assets/icons/phone.svg'
import { ReactComponent as headset } from '../../assets/icons/call-center.svg'
import { ReactComponent as arrowRight } from '../../assets/icons/arrow-right.svg'

export const Container = styled.footer`
  width: 100%;
  background-color: #fff;
  padding: 30px;
  display: flex;
  margin: 0 auto;
  max-width: 1200px;

  svg {
    width: 18px;
    height: 18px;
    flex-shrink: 0;
    align-self: flex-start;
    fill: #33beff;
    margin-right: 15px;
    margin-top: 4px;
  }

  @media (max-width: 989px) {
    .responsiveContainer {
      flex-direction: column;
    }

    .responsiveBlock2 {
      margin-left: 0px;
    }

    .responsiveMainBlock1,
    .responsiveMainBlock2 {
      width: 100%;
    }

    .responsiveMainBlock2 {
      margin-left: 0px;
    }
  }

  @media (max-width: 765px) {
    .responsiveMainBlock1 {
      flex-direction: column;
    }

    .responsiveBlock1,
    .responsiveBlock2 {
      width: 100%;
    }
  }
`

export const Wrapper = styled.div`
  width: ${props => (props.width ? `${props.width}%` : '100%')};
  display: flex;
  flex-direction: ${props => (props.direction ? props.direction : 'column')};
  align-items: ${props => (props.align ? props.align : 'flex-start')};
  justify-content: ${props => (props.justify ? props.justify : 'flex-start')};
  margin: ${props => (props.margin ? props.margin : '0px 0px  15px 0px')};
  cursor: ${props => (props.pointer ? 'pointer' : 'default')};
`

export const Line = styled.div`
  width: ${props => (props.width ? `${props.width}%` : '100%')};
  height: 1px;
  background-color: #d2d2d2;
  margin: 20px 0px;

  @media (max-width: 989px) {
    width: 100%;
  }
`

export const ResponsiveLine = styled.div`
  width: 100%;
  height: 1px;
  background-color: #d2d2d2;
  margin: 20px 0px;

  @media (min-width: 989px) {
    display: none;
  }
`

export const Text = styled.p`
  font-size: ${props => (props.size ? `${props.size}px` : '12px')};
  font-weight: ${props => (props.weight ? props.weight : 'normal')};
  line-height: ${props => (props.lineHeight ? props.lineHeight : '24px')};
  color: ${props => (props.color ? props.color : '#000')};
  letter-spacing: ${props => (props.spacing ? `${props.spacing}px` : 'normal')};
  margin: ${props => (props.margin ? props.margin : '0px')};
`

export const Image = styled.div`
  width: 220px;
  height: 57px;
  background-color: black;
  margin-bottom: 60px;
`

export const ArrowRight = styled(arrowRight)`
  && {
    width: 9px;
    height: 9px;
    align-self: center;
    margin: 0px 5px;
  }
`

export const Mail = styled(mail)``

export const Phone = styled(phone)``

export const Headset = styled(headset)``
