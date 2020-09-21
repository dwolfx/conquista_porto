import styled from 'styled-components'

import CardComponent from 'components/Card'
import TextComponent from 'components/Text'

export const Card = styled(CardComponent)`
  height: calc(100% - 14px);
  margin-bottom: ${({ theme }) => `${theme.spacing(2)}px`};
`

export const ContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100%;
  padding: 0 ${({ theme }) => theme.spacing(4)}px;
`

export const ErrorText = styled(TextComponent)`
  margin-bottom: ${({ theme }) => theme.spacing(2)}px;
  text-align: center;
`
