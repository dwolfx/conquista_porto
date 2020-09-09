import styled, { css } from 'styled-components'

import IconButton from 'components/Button/Icon'
import Card from 'components/Card'
import { CardBody } from 'components/Card/styles'

import * as t from '../types'

export const ButtonVertical = styled(IconButton)`
  border-radius: 4px;
  margin-right: 14px;
  width: 49px !important;
  height: 112px;
`

export const ContentContainer = styled.div`
  margin-bottom: 14px;
  display: flex;
`

export const Chip = styled(Card)<t.IChipProps>`
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
