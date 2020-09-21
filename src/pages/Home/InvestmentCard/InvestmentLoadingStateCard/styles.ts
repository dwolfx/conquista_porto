import styled from 'styled-components'

import CardComponent from 'components/Card'

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
  text-align: center;
  padding: 0 ${({ theme }) => theme.spacing(5)}px;
`
