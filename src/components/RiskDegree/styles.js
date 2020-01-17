import styled from 'styled-components'

export const RiskCaptionWrapper = styled.div`
  display: flex;
  line-height: 10px;
  height: 20px;
  margin-top: 34px;

  label {
    font-size: 12px;
    font-weight: 400;
    margin-top: 10px;

    &:first-of-type {
      margin-right: 0.25rem;
    }
    &:last-of-type {
      margin-left: 0.25rem;
    }
  }
`

export const ColorBox = styled.div`
  background-color: ${props => props.backgroundColor};
  display: inline-block;
  margin: 0 0.25rem;
  margin-top: ${props => props.marginTop};
  opacity: 0.1;
  width: 24px;

  &.active {
    opacity: 1;
  }
`
