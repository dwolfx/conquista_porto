import styled from 'styled-components'

import Button from 'components/Button'
import Icon from 'components/IconExporter'

export const IconButoon = styled(Icon)`
  margin-right: ${props => props.theme.spacing(1)}px;
`

export const ButtonBlock = styled(Button)`
  width: 100%;
`

export const ButtonWrapper = styled.div`
  display: flex;
  justify-content: flex-end;
`

export const ButtonModal = styled(Button)`
  margin-top: ${props => props.theme.spacing(5)}px;
`