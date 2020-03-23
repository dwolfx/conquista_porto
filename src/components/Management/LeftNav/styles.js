import styled from 'styled-components'

export const Container = styled.nav`
  display: flex;
  flex-direction: column;

  max-height: 1870px;
  overflow-y: auto;
  width: 17%;
  padding-right: 30px;

  @media (max-width: 1000px) {
    width: 100%;
    flex-direction: row;
    padding-left: 30px;
  }
`
