import styled from 'styled-components'
import Text from 'components/Text'

export const SubTitle = styled.div`
  align-items: center;
  display: flex;
  margin-bottom: 25px;
`

export const Title = styled(Text)`
  ${props => props.theme.fontTypes.subheading};
  margin-left: 14px;
  text-transform: uppercase;
`
