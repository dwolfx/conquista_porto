import styled from 'styled-components'

export const Container = styled.div`
  width: 100%;
  height: auto;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: space-between;
  padding: 7px 14px;
  background-color: pink;
`

export const ListElements = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  && > * {
    margin-bottom: 7px;
  }
  && :last-child {
    margin-bottom: 0px;
  }
`
