import styled from 'styled-components'

import Button from 'components/Button'
import Icon from 'components/IconExporter'

export const IconButoon = styled(Icon)`
  margin-right: ${({ theme }) => theme.spacing(1)}px;
`

export const ButtonBlock = styled(Button)`
  width: 100%;
`
