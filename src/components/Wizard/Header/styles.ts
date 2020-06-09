import styled from 'styled-components'

import CloseIcon from 'assets/icons/close.svg'

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
  width: 30px;
`

export const CloseButton = styled.a`
  border-radius: 50%;
  cursor: pointer;
  height: ${props => props.theme.spacing(4)}px;
  position: relative;
  width: ${props => props.theme.spacing(4)}px;

  &:after {
    content: '';
    background-color: ${props => props.theme.colors.black};
    height: ${props => props.theme.spacing(3)}px;
    left: calc(50% - 12px);
    mask-image: url(${CloseIcon});
    position: absolute;
    top: calc(50% - 12px);
    width: ${props => props.theme.spacing(3)}px;
  }
`

export const Content = styled.div`
  flex: 1;
  text-align: center;

  img {
    width: ${props => props.theme.spacing(20)}px;
  }
`
