import styled from 'styled-components'

import ConquistaIcon from 'components/IconExporter'
import TextComponent from 'components/Text'

export const TransactionsWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  width: 100%;
  padding: 28px;
`

export const TitleWrapper = styled.div`
  display: flex;
  align-items: center;
  height: 28px;
  margin-bottom: 21px;
`

export const MoneyIcon = styled(ConquistaIcon).attrs(() => ({
  name: 'money',
}))`
  width: 21px;
`

export const Title = styled(TextComponent)`
  ${props => props.theme.fontTypes.subheading};
  margin-left: 14px;
  text-transform: uppercase;
`

export const Ul = styled.ul`
  display: grid;
  width: 100%;
  grid-template-columns: repeat(3, 1fr);
  grid-gap: 24px;
  list-style: none;
  grid-gap: 0;

  & li:nth-last-child(-n + 3) {
    margin-bottom: 0;
  }
`

export const Li = styled.li`
  margin-bottom: 14px;
  position: relative;
`

export const LiTitle = styled(TextComponent)`
  ${props => props.theme.fontTypes.captionUppercase};
  color: ${props => props.theme.colors.gray4};
  margin-bottom: 7px;
`

export const LiValue = styled(TextComponent)`
  ${props => props.theme.fontTypes.headline};
  color: ${props => props.theme.colors.gray6};
`

export const GrayLine = styled.div`
  background-color: ${props => props.theme.colors.gray2};
  height: 1px;
  margin: 0 14px;
`
