import styled from 'styled-components'

export const PanelTabs = styled.div`
  background-color: 'blue';
`

export const PanelList = styled.div`
  border: 1px solid ${props => props.theme.colors.blue4};
  border-radius: 7px;
  display: flex;
  margin-bottom: 40px;
`

export const PanelTab = styled.div`
  background-color: 'red';
`

export const SingleTab = styled.div`
  color: ${props => props.theme.colors.blue4};
  cursor: pointer;
  font-family: ${props => props.theme.fontTypes.captionUppercase};
  padding: 12px;
  text-align: center;
  width: 100%;

  &:not(:first-of-type) {
    border-left: 1px solid ${props => props.theme.colors.blue4};
  }

  &:first-child {
    border-radius: 7px 0 0 7px;
  }

  &:last-child {
    border-radius: 0 7px 7px 0;
  }

  &.active {
    color: ${props => props.theme.colors.white};
    background-image: linear-gradient(
      135deg,
      ${props => props.theme.colors.blue5},
      ${props => props.theme.colors.blue4}
    );
  }
`
