import styled from 'styled-components'

import Icon from 'components/IconExporter'

export const Container = styled.div`
  background-color: ${props => props.theme.colors.white};
  align-items: center;
  border-bottom: 1px solid ${props => props.theme.colors.gray3};
  flex-direction: row;
  display: flex;
  padding: ${props => props.theme.spacing(4)}px;
`

export const IconWrapper = styled.div`
  cursor: pointer;
  position: absolute;
  width: 30px;
`

export const CloseButton = styled(Icon)`
  cursor: pointer;
  position: absolute;
  right: ${({ theme }) => theme.spacing(4)}px;
`

export const Content = styled.div`
  flex: 1;
  text-align: center;

  img {
    width: ${props => props.theme.spacing(20)}px;
  }
`
