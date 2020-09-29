import styled from 'styled-components'
import Loading from 'components/Loading'
import Card from 'components/Card'
import { CardBody, CardIconInfo } from 'components/Card/styles'
import HorizontalList from 'components/HorizontalList'
import { mediaQueries } from 'styles/theme'

const tabletAndBiggerSmartphones = `${mediaQueries.smUp} and ${mediaQueries.md}`

export const LoadingStyled = styled(Loading)`
  flex: 1;
  padding: ${({ theme }) => theme.spacing(2)}px
    ${({ theme }) => theme.spacing(3)}px;
  max-width: 414px;
  margin: 0 auto;
`

export const CardStyled = styled(Card)`
  margin-bottom: ${({ theme }) => theme.spacing(2)}px;

  @media ${({ theme }) => theme.mediaQueries.lgUp} {
    margin-bottom: 0;
  }

  ${CardBody} {
    text-align: center;
    margin-top: ${({ theme }) => theme.spacing(2)}px;
  }
  ${CardIconInfo} span {
    display: flex;
  }
`

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

export const InformationPopoverContainer = styled.div`
  width: 282px;
`
