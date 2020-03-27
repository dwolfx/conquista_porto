import styled, { keyframes } from 'styled-components'

const fadeIn = keyframes`
  from { opacity: 0; };
    to { opacity: 1; };
`

export const Container = styled.article`
  background-color: white;
  padding-top: 22px;
  width: 83%;
  height: fit-content;

  display: ${props => (props.isSelected ? 'block' : 'none')};
  animation: ${props => (props.isSelected ? fadeIn : '')} 1s linear;

  @media (max-width: 1000px) {
    width: 100%;
  }
`
