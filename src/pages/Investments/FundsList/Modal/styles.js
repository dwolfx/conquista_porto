import styled from 'styled-components'
import ArrowLeft from 'assets/icons/arrow-left.svg'
import { Col, Row } from 'styled-bootstrap-grid'

export const HeaderColTitle = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
`
export const PrevButton = styled.div`
  background-color: ${props => props.theme.colors.gray4};
  cursor: pointer;
  height: 24px;
  mask-image: url(${ArrowLeft});
  transition: all ease 0.3s;
  width: 24px;

  &:hover {
    background-color: ${props => props.theme.colors.blue4};
  }
`

export const StepBar = styled.div`
  background-color: ${props => props.theme.colors.grayblue1};
  padding: 28px 21px;
`

export const GridCol = styled(Col)`
  padding-left: 7px;
  padding-right: 14px;
`

export const GridRow = styled(Row)`
  width: 100%;
  margin-left: 28px;
  margin-right: 21px;
`

export const ModalContent = styled.div`
  width: 100%;
  padding: 28px 0px 21px;
  display: flex;
  height: 76vh;
`

export const ModalCard = styled.div`
  background-color: ${props => props.theme.colors.white};
  border: 1px solid ${props => props.theme.colors.gray2};
  box-sizing: border-box;
  border-radius: 8px;
  width: 100%;
  height: 100%;
`

export const FooterInfo = styled.div`
  width: 100%;
  padding-right: 35px;
  padding-left: 35px;
`
