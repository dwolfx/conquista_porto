import styled, { css } from 'styled-components'

import { rgba } from 'helpers'

interface IContainer {
  showMenu: boolean
}
export const Container = styled.div<IContainer>`
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;

  @media ${props => props.theme.mediaQueries.lg} {
    position: fixed;
    width: 560px;
    height: 63px;
    z-index: 2;
    top: auto;
    bottom: 0;
    left: auto;
    right: 50%;
    transform: translateX(50%);
    flex-direction: row;
    align-items: center;
    margin-bottom: ${({ theme }) => `${theme.spacing(4)}px`};
    visibility: ${props => props.showMenu ? 'visible' : 'hidden'};
    opacity: ${props => props.showMenu ? '1' : '0'};
    transition: visibility 1s ease, opacity .5s ease;
  }

  @media ${props => props.theme.mediaQueries.md} {
    width: 490px;
  }

  @media ${props => props.theme.mediaQueries.xs} {
    width: 332px;
  }
`

export const MenuContainer = styled.div`
  position: fixed;
  z-index: 1;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  width: 94px;
  height: 518px;
  border-radius: 14px;
  background-color: ${props => props.theme.colors.blue4};
  padding-left: ${({ theme }) => `${theme.spacing(2)}px;`}
  margin-right: ${({ theme }) => `${theme.spacing(1)}px;`}

  @media ${props => props.theme.mediaQueries.lg} {
    height: 100%;
    width: 100%;
    top: 0;
    left: 0;
    flex-direction: row;
    padding: ${({ theme }) => `0 ${theme.spacing(18)}px;`}
    margin: 0;
  }
`
interface IOption {
  isSelected: boolean
}
export const Option = styled.div<IOption>`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 56px;
  border-top-left-radius: 28px;
  border-bottom-left-radius: 28px;
  background-color: ${props =>
    props.isSelected ? props.theme.colors.gray1 : 'transparent'};
  margin-bottom:  ${({ theme }) => `${theme.spacing(5)}px;`}
  transition: all 0.2s ease-in-out;

  &:last-child {
    margin-bottom: 0;
  }

  svg {
    width: 21px;
    height: 21px;
    flex-shrink: 0;
    fill: ${props =>
      props.isSelected ? props.theme.colors.black : props.theme.colors.white};
  }

  div {
    display: flex;

    p {
      display: none;
    }
  }

  ${props =>
    !props.isSelected &&
    css`
      &:hover:not(:active) {
        width: fit-content;
        padding: 0px 31%;
        border-radius: 28px;
        border: ${`1px solid ${props.theme.colors.blue2}`};
        background-color: ${props.theme.colors.white};

        p {
          display: block;
          margin-left: ${({ theme }) => `${theme.spacing(2)}px;`}
        }

        svg {
          fill: ${props.theme.colors.black};
        }
      }
    `}

  @media ${props => props.theme.mediaQueries.lg} {
    margin-bottom: 0;
    padding: ${({ theme }) => `${theme.spacing(3)}px ${theme.spacing(2)}px;`}
    background-color: transparent;
    width: auto;
    height: 100%;
    margin-right: ${({ theme }) => `${theme.spacing(11)}px;`}

    &:last-of-type {
      margin: 0;
    }

    svg {
      fill: ${props =>
        props.isSelected
          ? props.theme.colors.white
          : rgba(props.theme.colors.white, 0.5)};
    }

    ${props =>
      !props.isSelected &&
      css`
        &:hover:not(:active) {
          padding: ${({ theme }) => `${theme.spacing(3)}px ${theme.spacing(2)}px;`}
          border-radius: 0;
          background-color: transparent;
          border: none;

          svg {
            fill: ${rgba(props.theme.colors.white, 0.5)};
          }
          p {
            display: none;
          }
        }
      `}
  }

  @media ${props => props.theme.mediaQueries.xs} {
    margin-right: ${({ theme }) => `${theme.spacing(6)}px;`};
    &:last-of-type {
      margin: 0;
    }
  }
`

export const OptionName = styled.p`
  display: none;
`
