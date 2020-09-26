import styled from 'styled-components'
import { rgba } from 'helpers'

export const Container = styled.div`
  height: 100%;
  position: fixed;
  width: 100%;
  z-index: 7;
`

export const Overlay = styled.div`
  background-color: ${({ theme }) => rgba(theme.colors.gray6, 0.63)};
  height: 100%;
  position: absolute;
  width: 100%;
`

interface IBackdropContainer {
  position: 'bottom' | 'top'
}

export const BackdropContainer = styled.div<IBackdropContainer>`
  background-color: ${({ theme }) => theme.colors.white};
  border-radius: ${({ position }) =>
    position === 'bottom' ? '8px 8px 0 0' : '0 0 8px 8px'};
  position: absolute;
  padding: ${({ theme }) => theme.spacing(2)}px 0;
  width: 100%;

  ${({ position }) => ({
    [position]: 0,
  })};
`
