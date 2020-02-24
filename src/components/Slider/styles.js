import styled, { css } from 'styled-components'

import Popover from 'components/Popover'

const ThumbContainerStyle = css`
  height: 24px;
  position: absolute;
  top: calc(50% - 12px);
  width: 24px;
  z-index: 1;
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

export const SliderContainer = styled.div`
  display: flex;
  margin: 14px;
  position: relative;
  width: calc(100% - 28px);

  ${ThumbPopover}, ${ThumbContainer} {
    left: ${props => `calc(${props.value}% - 12px)`};
  }
  ${Rail} {
    &:before {
      width: ${props => `calc(${props.value}% - 12px)`};
    }
  }
`
