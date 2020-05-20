import styled from 'styled-components'

export const RiskCaptionWrapper = styled.div`
  display: flex;
`

export const ColorBox = styled.div`
  background-color: ${props => props.backgroundColor};
  display: inline-block;
  height: 10px;
  margin: 0;
  opacity: 0.3;
  width: 100%;

  &.active {
    opacity: 1;
  }
`

export const ItemColor = styled.div`
  text-align: center;
  width: 100%;
`
