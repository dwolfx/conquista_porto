import styled from 'styled-components'
import ArrowLeft from 'assets/icons/arrow-left.svg'

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

export const ModalContent = styled.div`
  width: 100%;
  padding: 28px 35px;
  display: flex;
`

export const ModalContentCol1 = styled.div`
  background-color: ${props => props.theme.colors.white};
  border: 1px solid ${props => props.theme.colors.gray2};
  box-sizing: border-box;
  border-radius: 8px;
  width: 310px;
  height: 436px;
  flex: 1;
  margin-right: 21px;
`

export const ModalContentCol2 = styled.div`
  background-color: ${props => props.theme.colors.white};
  border: 1px solid ${props => props.theme.colors.gray2};
  box-sizing: border-box;
  border-radius: 8px;
  width: 958px;
  height: 436px;
  flex: 3;
`
