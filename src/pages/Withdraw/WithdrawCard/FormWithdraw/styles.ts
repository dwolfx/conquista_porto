import styled from 'styled-components'

import TextComponet from 'components/Text'

export const InputWrapper = styled.div`
  width: 50%;
  padding: ${({ theme }) =>
    `${theme.spacing(2)}px ${theme.spacing(2)}px ${theme.spacing(1)}px`};

  @media ${({ theme }) => theme.mediaQueries.xs} {
    width: 100%;
  }
`

export const LabelText = styled(TextComponet)`
  margin-bottom: ${({ theme }) => theme.spacing(2)}px;
`
