import styled from 'styled-components'

import PercentualInfosCmp from 'components/Objective/PercentualInfo'
import Text from 'components/Text'
import LayerCmp from 'components/Layer'
import { LayerHeader } from 'components/Layer/styles'

export const FundoWrapper = styled.div`
  display: flex;
  flex-direction: column;
  line-height: 22px;
  padding: ${({ theme }) =>
    `${theme.spacing(1)}px ${theme.spacing(2)}px ${theme.spacing(
      1
    )}px ${theme.spacing(3)}px`};
  width: 100%;
`

export const FundoOutterWrapper = styled.div`
  display: flex;
  flex-direction: row;
`

export const FundoNameWrapper = styled(Text)`
  text-align: left;
  max-width: 220px;
  font-weight: normal;
  white-space: pre-wrap;
`

export const CardBody = styled.div`
  padding: ${({ theme }) => `${theme.spacing(3)}px ${theme.spacing(2)}px 0`};
`

export const PercentualInfos = styled(PercentualInfosCmp)`
  margin-bottom: ${({ theme }) => theme.spacing(2)}px;
`
