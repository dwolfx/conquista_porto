import styled from 'styled-components'

export const Container = styled.div`
  width: 100%;
  height: ${props => (props.height ? props.height : '49px')};
  display: flex;
  align-items: center;
  justify-content: flex-start;
  margin: ${props => props.margin && props.margin};
  cursor: pointer;
`

export const StartBox = styled.div`
  width: 63px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
`

export const EndBox = styled(StartBox)``

export const TextWrapper = styled.div`
  width: 100%;
  margin-left: ${props => (props.hasStartIcon ? '0' : '84px')};
  margin-right: ${props => (props.hasEndIcon ? '0' : '21px')};
  display: flex;
  align-items: center;
  justify-content: space-between;
`
