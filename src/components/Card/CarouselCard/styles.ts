import styled, { css } from 'styled-components'
import Slider from 'react-slick'

import IconComponent from 'components/IconExporter'
import CardComponent from 'components/Card'

import { CardBody } from 'components/Card/styles'
import { IChangePageButton } from './types'

export const Card = styled(CardComponent)`
  height: 100%;

  ${CardBody} {
    align-items: center;
  }
`

export const Carousel = styled(Slider)`
  width: 100%;
  height: calc(100% - 21px);

  .slick-list {
    height: 100%;
  }

  ul.slick-dots {
    position: static;
    display: flex !important;
    align-items: center;
    justify-content: center;
    margin: ${({ theme }) => `${theme.spacing(1)}px 0`};
  }
  .slick-dots {
    li {
      margin: 0;
      margin-right: ${({ theme }) => `${theme.spacing(1)}px`};
      width: ${({ theme }) => `${theme.spacing(1)}px`};
      height: ${({ theme }) => `${theme.spacing(1)}px`};
    }
    li:last-child {
      margin-right: 0;
    }
    li.slick-active button::before {
      color: ${({ theme }) => theme.colors.blue4};
    }
    li button {
      width: ${({ theme }) => `${theme.spacing(1)}px`};
      height: ${({ theme }) => `${theme.spacing(1)}px`};
      padding: 0;
    }
    li button:before {
      font-size: ${({ theme }) => `${theme.spacing(1)}px`};
      line-height: ${({ theme }) => `${theme.spacing(1)}px`};
      width: ${({ theme }) => `${theme.spacing(1)}px`};
      height: ${({ theme }) => `${theme.spacing(1)}px`};
    }
    li button:hover::before {
      color: ${({ theme }) => theme.colors.blue4};
    }
  }
`

export const ChangePageButton = styled.button<IChangePageButton>`
  display: flex;
  background-color: ${({ theme }) => theme.colors.gray2};
  width: 28px;
  height: 28px;
  align-items: center;
  justify-content: center;
  border: none;
  border-radius: 50%;

  &:active {
    background-color: ${({ theme }) => theme.colors.gray1};
  }
  & + & {
    margin-left: ${({ theme }) => `${theme.spacing(2)}px`};
    svg {
      margin-left: 3px;
      margin-right: 0;
    }
  }
  svg {
    margin-right: 2px;
  }
  svg polyline {
    stroke-width: ${({ theme }) => `${theme.spacing(1)}px`};
    height: 12px;
    stroke: ${props => props.theme.colors.gray6};
  }

  ${({ disabled }) =>
    disabled &&
    css`
      cursor: not-allowed;
      pointer-events: none;
      background-color: ${({ theme }) => theme.colors.gray1};

      svg polyline {
        stroke: ${props => props.theme.colors.gray4};
      }
    `}
`

export const ForwardIcon = styled(IconComponent)`
  height: 12px;
  width: 12px;
`

export const BackwardIcon = styled(IconComponent)`
  height: 12px;
  width: 12px;
`

export const ButtonWrapper = styled.div`
  display: flex;
`

export const Chip = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`
