import styled, { css } from 'styled-components'
import { Col, Row } from 'styled-bootstrap-grid'

import Icon from 'components/IconExporter'

export const HeaderContent = styled.div`
  display: flex;
  align-items: center;
`

export const LogoWrapper = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
`

export const CloseIcon = styled(Icon).attrs(() => ({
  name: 'close',
}))`
  cursor: pointer;
  transition: all ease 0.3s;
  position: absolute;
  right: 12px;

  &:hover {
    fill: ${props => props.theme.colors.blue4};
  }
`

export const PreviousIcon = styled(Icon).attrs(() => ({
  name: 'arrowleft',
}))`
  cursor: pointer;
  transition: all ease 0.3s;
  position: absolute;

  &:hover {
    fill: ${props => props.theme.colors.blue4};
  }
`

export const StepBar = styled.div<{ step: number }>`
  background-color: ${props => props.theme.colors.grayblue1};
  height: 56px;
  position: relative;

  ${({ step }) =>
    step === 4 &&
    css`
      &:after {
        background-color: inherit;
        content: '';
        height: 154px;
        left: 0;
        position: absolute;
        width: 100%;
      }
    `}
`

export const GridRowStepBar = styled(Row)`
  margin: 0;
  padding: 0 ${({ theme }) => theme.spacing(2)}px;
`

export const ColStepBar = styled(Col)`
  height: 56px;
  display: flex;
  align-items: center;
  padding: 0;
`

export const WhiteContent = styled.div`
  background: ${({ theme }) => theme.colors.white};
  min-height: calc(100% - 56px);
  display: flex;
  align-items: center;
`
