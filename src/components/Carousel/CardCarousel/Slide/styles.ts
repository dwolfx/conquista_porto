import styled, { css } from 'styled-components'

import Card from 'components/Card'
import { CardBody } from 'components/Card/styles'

export const Slide = styled(Card)<{ selected: boolean }>`
  border: 1px solid ${({ theme }) => theme.colors.gray3};
  background-color: white;
  border-radius: 4px;
  cursor: pointer;
  width: 238px;
  margin-right: ${({ theme }) => theme.spacing(2)}px;
  padding: ${({ theme }) => theme.spacing(2)}px;
  height: 112px;

  ${({ selected }) =>
    selected
      ? css`
          box-shadow: ${({ theme }) => theme.shadows.blue1};
          border: 1px solid ${({ theme }) => theme.colors.blue2};
        `
      : css`
          box-shadow: none;
          border: 1px solid ${({ theme }) => theme.shadows.gray3};
        `};

  &:hover {
    border: 1px solid ${({ theme }) => theme.colors.blue3};
  }

  ${CardBody} {
    height: 100%;
    justify-content: space-between;
  }
`
