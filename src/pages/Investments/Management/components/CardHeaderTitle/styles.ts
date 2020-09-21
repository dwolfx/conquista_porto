import styled from 'styled-components'

export const CardHeaderTitleWrapper = styled.div`
  display: flex;
  cursor: pointer;
`

export const CardHeaderIcon = styled.div`
  display: flex;
  justify-content: center;
  width: 21px;

  svg {
    width: 21px;
    height: 21px;
  }

  margin-left: ${({ theme }) => theme.spacing(2)}px;
`
