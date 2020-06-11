import styled from 'styled-components'
import ConquistaIcon from 'components/IconExporter'

export const PanelTabs = styled.div``

export const PanelTab = styled.div``

export const PanelList = styled.div`
  border: 1px solid ${props => props.theme.colors.blue4};
  border-radius: 4px;
  display: flex;
  margin-bottom: 21px;
`

export const SingleTab = styled.div`
  color: ${props => props.theme.colors.blue4};
  cursor: pointer;
  font-family: ${props => props.theme.fontTypes.captionUppercase};
  padding: 12px;
  text-align: center;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;

  &:not(:first-of-type) {
    border-left: 1px solid ${props => props.theme.colors.blue4};
  }

  &:first-child {
    border-radius: 2px 0 0 2px;
  }

  &:last-child {
    border-radius: 0 2px 2px 0;
  }

  &.active {
    color: ${props => props.theme.colors.white};
    background-image: linear-gradient(
      135deg,
      ${props => props.theme.colors.blue5},
      ${props => props.theme.colors.blue4}
    );
    && svg {
      fill: ${props => props.theme.colors.white};
    }
  }
`

export const Icon = styled(ConquistaIcon).attrs(props => ({
  name: props.name,
  color: props.color,
}))`
  width: 21px;
  height: 21px;
`
