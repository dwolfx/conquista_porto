import styled from 'styled-components'

import Text from 'components/Text'
import IconExporter from 'components/IconExporter'

export const WarningWrapper = styled.div`
  display: flex;
  flex-direction: row;
  padding: ${({ theme }) =>
    `${theme.spacing(2)}px 0px ${theme.spacing(2)}px ${theme.spacing(2)}px`};
  margin-top: ${({ theme }) => theme.spacing(4)}px;
  border: 1px solid #e72176;
  box-sizing: border-box;
  box-shadow: 0px 4px 8px rgba(231, 33, 118, 0.14);
  border-radius: 8px;
  transform: rotate(0.25deg);

  @media ${({ theme }) => theme.mediaQueries.smUp} {
    margin-top: ${({ theme }) => theme.spacing(2)}px;
    max-width: 410px;
  }
`

export const WarningText = styled(Text)`
  max-width: 199px;
  @media ${({ theme }) => theme.mediaQueries.smUp} {
    max-width: 347px;
  }
`

export const Icon = styled(IconExporter)`
  margin-right: ${({ theme }) => theme.spacing(2)}px;
  height: 21px;
  width: 21px;
`