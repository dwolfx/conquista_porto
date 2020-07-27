import styled from 'styled-components'
import ModalNew from 'components/Modal/ModalNew'
import { ModalContainer } from 'components/Modal/stylesNew'
import { TextStyle } from 'components/Text/styles'

export const ModalStyled = styled(ModalNew)`
  ${ModalContainer} {
    @media ${props => props.theme.mediaQueries.smUp} {
      width: 634px;
    }
  }
`

export const Container = styled.div`
  background: ${({ theme }) => theme.colors.gray1};
  border-radius: ${({ theme }) => theme.spacing(1)}px;
  padding: ${({ theme }) => theme.spacing(3)}px;
  ${TextStyle} {
    margin-bottom: ${({ theme }) => theme.spacing(3)}px;
    &:last-child {
      margin-bottom: 0;
    }
  }
`
