import styled from 'styled-components'
import { mediaQueries } from 'styles/theme'
import TextCmp from 'components/Text'
import VerticalList from 'components/VerticalList'

const tabletAndBiggerSmartphones = `${mediaQueries.smUp} and ${mediaQueries.lg}`

export const Label = styled.div`
  ${props => props.theme.fontTypes.captionUppercase}
  color: ${props => props.theme.colors.gray5};
`

export const Text = styled(TextCmp)``

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

export const Item = styled(VerticalList)`
  flex-direction: row;
  @media ${tabletAndBiggerSmartphones} {
    flex-direction: column;
  }
`
