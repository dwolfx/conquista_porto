import styled from 'styled-components'
import { IModalTextWrapper } from '../types'

export const ModalTextWrapper = styled.div<IModalTextWrapper>`
  margin: ${props =>
    props.margin ? props.margin : `0 0 ${props.theme.spacing(4)}px 0`};
`

export const ContainerBox = styled.div`
  padding: ${({ theme }) => `${theme.spacing(4)}px ${theme.spacing(3)}px`};
  margin-bottom: ${({ theme }) => theme.spacing(4)}px;
  background-color: ${props => props.theme.colors.gray1};
  border-radius: 8px;
`

export const ContainerAccountInfo = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  flex-wrap: wrap;
`

export const TableBox = styled.div`
  min-width: 33%;
  margin-bottom: ${({ theme }) => theme.spacing(2)}px;
`
