import styled from 'styled-components'

import CloseIcon from 'assets/icons/close.svg'

export const Container = styled.div`
  align-items: center;
  border-bottom: 1px solid rgba(210, 210, 210, 0.4);
  flex-direction: row;
  display: flex;
  padding: 30px;
`

export const IconWrapper = styled.div`
  cursor: pointer;
  width: 30px;
`

export const CloseButton = styled.a`
  border-radius: 50%;
  cursor: pointer;
  height: 32px;
  position: relative;
  width: 32px;

  &:after {
    content: '';
    background-color: ${props => props.theme.colors.black};
    height: 24px;
    left: calc(50% - 12px);
    mask-image: url(${CloseIcon});
    position: absolute;
    top: calc(50% - 12px);
    width: 24px;
  }
`

export const Content = styled.div`
  flex: 1;
  text-align: center;

  img {
    width: 140px;
  }
`
