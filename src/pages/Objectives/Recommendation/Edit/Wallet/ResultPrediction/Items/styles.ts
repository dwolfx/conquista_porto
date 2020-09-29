import styled from 'styled-components'
import HorizontalList from 'components/HorizontalList'
import { mediaQueries } from 'styles/theme'

const tabletAndBiggerSmartphones = `${mediaQueries.smUp} and ${mediaQueries.md}`

export const Label = styled.div`
  ${props => props.theme.fontTypes.captionUppercase}
  color: ${props => props.theme.colors.gray5};
`

export const Value = styled.div<any>`
  ${props => props.theme.fontTypes.body}
  color: ${({ hightlight, theme }) =>
    hightlight ? theme.colors.magenta2 : theme.colors.gray6};
`

export const Items = styled.div`
  display: flex;
  flex-direction: column;

  @media ${tabletAndBiggerSmartphones} {
    flex-direction: row;
  }
`

export const Item = styled(HorizontalList)`
  flex-direction: row;
  height: 35px;
  @media ${tabletAndBiggerSmartphones} {
    flex-direction: column;
  }
`
