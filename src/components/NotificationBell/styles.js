import styled from 'styled-components'

export const NotificationWrapper = styled.div`
  border-radius: 50%;
  height: 24px;
  position: relative;
  width: 24px;

  &:after {
    content: '';
    background-color: ${props =>
      props.hasNotification ? props.theme.colors.blue4 : 'transparent'};
    border-radius: 50%;
    height: 8px;
    position: absolute;
    right: 0;
    width: 8px;
  }
  svg {
    fill: ${props => props.theme.colors.gray4};
  }
`
