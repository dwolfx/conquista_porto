import styled, { css } from 'styled-components'

export const Container = styled.div`
  width: 100%;
  height: 100%;
`

export const MenuContainer = styled.div`
  position: sticky;
  z-index: 9;
  top: 165px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  width: 94px;
  height: 430px;
  border-radius: 14px;
  background-color: ${props => props.theme.colors.blue4};
  padding-left: 14px;
`

export const Option = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 56px;
  border-top-left-radius: 28px;
  border-bottom-left-radius: 28px;
  background-color: ${props =>
    props.isSelected ? props.theme.colors.white : 'transparent'};
  margin-bottom: 35px;
  transition: all 0.2s ease-in-out 0.1s;

  &:last-child {
    margin-bottom: 0px;
  }

  svg {
    width: 28px;
    height: 28px;
    flex-shrink: 0;
    fill: ${props => (props.isSelected ? '#000' : '#fff')};
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
          margin-left: 14px;
        }

        svg {
          fill: #000;
        }
      }
    `}
`

export const OptionName = styled.p`
  display: none;
`
