import styled from 'styled-components'

import breakpoints from 'styles/breakpoints'

export const Row = styled.div`
  display: flex;
  justify-content: ${props => (props.justify ? props.justify : 'flex-start')};
  margin: 30px 0;
  width: 100%;

  @media ${breakpoints.mobile} {
    flex-direction: column;
    margin: 15px 0;
  }
`
export const RemoveButton = styled.button`
  background-color: transparent;
  border: none;
  outline: none;
  cursor: pointer;
`

export const Wrapper = styled.div`
  width: 100%;
`

export const ButtonAdd = styled.button`
  color: #30c5ff;
  display: flex;
  align-items: center;
  background-color: transparent;
  border: none;
  outline: none;
  cursor: pointer;

  svg {
    margin-right: 8px;
  }
`

export const ObsText = styled.small`
  font-weight: 300;
  color: #1c1c1c;
  letter-spacing: 0;
  line-height: 18px;
  word-break: break-word;
  font-size: 11px;
  width: 100%;
`
