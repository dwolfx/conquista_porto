import styled from 'styled-components'
import ConquistaIcon from 'components/IconExporter'
import Text from 'components/Text'

export const Container = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: flex-start;
`

export const Icon = styled(ConquistaIcon)`
  width: 21px;
  height: 21px;
  margin: 0 7px;
`

export const StyledText = styled(Text).attrs(() => ({
  type: 'button',
}))``

export const Crumbcontainer = styled.div`
  cursor: ${props => props.cursorStyle};
`
