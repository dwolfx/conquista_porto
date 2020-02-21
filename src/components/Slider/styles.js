import styled, { css } from 'styled-components'

import Popover from 'components/Popover'

// export const SliderInput = styled.input.attrs(() => ({
//   type: 'range',
// }))`
//   -webkit-appearance: none;
//   -moz-appearance: none;
//   width: 100%;
//   position: relative;

//   &::before {
//     content: '';
//     background-color: ${props => props.theme.colors.blue4};
//     /* border-radius: 7px; */
//     cursor: pointer;
//     height: 100%;
//     left: 0;
//     position: absolute;
//     top: 0%;
//     width: ${props => `${props.value}%`};
//     z-index: 1;
//   }
//   &::-webkit-slider-thumb {
//     -webkit-appearance: none;
//     background-color: ${props => props.theme.colors.white};
//     border: 2px solid ${props => props.theme.colors.blue4};
//     border-radius: 50%;
//     height: 24px;
//     margin-top: -8px;
//     width: 24px;
//     z-index: 1;
//     position: relative;
//   }
//   &::-moz-range-thumb {
//     -moz-appearance: none;
//     background-color: ${props => props.theme.colors.white};
//     border: 2px solid ${props => props.theme.colors.blue4};
//     border-radius: 50%;
//     height: 24px;
//     margin-top: -8px;
//     width: 24px;
//     z-index: 1;
//     position: relative;
//   }
//   &::-webkit-slider-runnable-track {
//     -webkit-appearance: none;
//     background-color: ${props => props.theme.colors.gray3};
//     /* border-radius: 7px; */
//     cursor: pointer;
//     height: 7px;
//     width: 100%;
//   }
//   &::-moz-range-track {
//     -moz-appearance: none;
//     background-color: ${props => props.theme.colors.gray3};
//     /* border-radius: 7px; */
//     cursor: pointer;
//     height: 7px;
//     width: 100%;
//   }
// `

export const SliderContainer = styled.div`
  width: 100%;
  display: flex;
  position: relative;
  padding: 52px 24px 14px;
`

const ThumbContainerStyle = css`
  height: 24px;
  margin-top: -14px;
  width: 24px;
  z-index: 1;
  position: absolute;
`

export const ThumbPopover = styled(Popover)`
  ${ThumbContainerStyle}
`

export const ThumbContainer = styled.div`
  ${ThumbContainerStyle}
`

export const Thumb = styled.div`
  background-color: ${props => props.theme.colors.white};
  border: 2px solid ${props => props.theme.colors.blue4};
  border-radius: 50%;
  cursor: pointer;
  height: 24px;
  width: 24px;
  z-index: 1;
  position: absolute;
`

export const Rail = styled.div`
  background-color: ${props => props.theme.colors.gray3};
  cursor: pointer;
  height: 7px;
  width: 100%;
  position: relative;

  &:before {
    content: '';
    background-color: ${props => props.theme.colors.blue4};
    cursor: pointer;
    height: 100%;
    left: 0;
    position: absolute;
    top: 0%;
    width: calc(0% - 12px);
    z-index: 1;
  }
`

export const SliderWrapper = styled.div`
  position: relative;
  width: 100%;

  ${ThumbPopover}, ${ThumbContainer} {
    left: ${props => `calc(${props.value}% - 12px)`};
  }
  ${Rail} {
    &:before {
      width: ${props => `calc(${props.value}% - 12px)`};
    }
  }
`
