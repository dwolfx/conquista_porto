import styled from 'styled-components'

export const Container = styled.div`
  width: 100%;
  height: 49px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0px 14px;
`

export const StartBlock = styled.div`
  display: flex;
  && > * {
    margin-right: 14px;
  }
`

export const EndBlock = styled.div`
  display: flex;
  && > * {
    margin-left: 14px;
  }
`
