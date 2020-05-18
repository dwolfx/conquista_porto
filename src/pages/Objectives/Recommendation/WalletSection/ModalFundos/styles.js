import styled from 'styled-components'
import Button from 'components/Button'
import Text from 'components/Text'
import ConquistaIcon from 'components/IconExporter'
import DivisorComponent from 'components/Divisor'

export const WrapperContent = styled.div`
  width: 644px;

  @media ${props => props.theme.mediaQueries.sm} {
    width: auto;
  }
`

export const PanelFooter = styled.div``

export const PanelBody = styled.div``

export const ControllerTabs = styled.div`
  border-radius: 7px;
  border: 1px solid ${props => props.theme.colors.blue4};
  display: flex;
  margin-bottom: 40px;
`

export const ButtonTab = styled(Button)`
  border: none;
  border-radius: 0;
  width: 100%;

  &:first-child {
    border-radius: 7px 0 0 7px;
  }

  &:last-child {
    border-radius: 0 7px 7px 0;
  }

  &:not(:first-of-type) {
    border-left: 1px solid ${props => props.theme.colors.blue4};
  }

  &.active,
  &.active &:hover {
    background: ${props =>
      ` linear-gradient(to left, ${props.theme.colors.blue5} 20%, ${props.theme.colors.blue4});`};
    color: ${props => props.theme.colors.white};
    cursor: none;

    &::after {
      display: none;
    }
  }
`

export const SingleItem = styled.div`
  border-bottom: ${props =>
    props.borderBottom ? `1px solid ${props.theme.colors.gray2}` : 'none'};
  margin-bottom: 42px;

  &:last-child {
    margin-bottom: 0;
  }
`

export const ListInfos = styled.ul`
  margin: 0 0 0 28px;
  padding: 0;
`

export const ListItems = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;

  @media ${props => props.theme.mediaQueries.sm} {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: flex-start;
  }
`

export const ListFiles = styled(ListItems)``

export const Information = styled(Text)`
  margin-bottom: 15px;
`

export const ItemInfo = styled.li`
  ${props => props.theme.fontTypes.body};
`

export const Item = styled.div`
  margin-bottom: 28px;
`

export const SubTitle = styled.div`
  align-items: center;
  display: flex;
  margin-bottom: 25px;
`

export const SubTitle5 = styled(Text)`
  ${props => props.theme.fontTypes.captionUppercase};
  color: ${props => props.theme.colors.gray4};
  margin-bottom: 4px;
`

export const Notification = styled.div`
  background-color: ${props => props.theme.colors.gray2};
  border-radius: 7px;
  padding: 18px;
  text-align: center;

  @media ${props => props.theme.mediaQueries.sm} {
    padding: 21px 14px;
  }
`

export const Caption = styled(Text)`
  ${props => props.theme.fontTypes.caption};
  background-color: ${props => props.theme.colors.gray2};
  color: ${props => props.theme.colors.gray6};
  margin: 0 auto;
  max-width: 455px;
  text-transform: uppercase;
`
export const Icon = styled(ConquistaIcon).attrs(props => ({
  name: props.name,
  color: props.color,
}))`
  width: 21px;
  height: 21px;
`

export const Divisor = styled(DivisorComponent)`
  margin: 28px 0;
`
