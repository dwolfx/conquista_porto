import styled from 'styled-components'

const lightBlue = '#38b6f0'
const lightGray = '#e6e6e6'

export const TableWrapper = styled.div`
  padding-top: 1em;
`

export const TableTabs = styled.div`
  display: flex;
`

export const TableTab = styled.div`
  background-image: linear-gradient(to bottom, #ffffff 0%, #f0f0f0 100%);
  border: 1px solid ${lightGray};
  border-radius: 6px 6px 0 0;
  cursor: pointer;
  height: 3rem;
  font-size: 10px;
  font-weight: 700;
  flex: 1 1 0;
  letter-spacing: 2px;
  letter-spacing: 1.5px;
  margin-top: 0.75rem;
  padding-top: 1.75em;
  text-align: center;
  text-transform: uppercase;
  vertical-align: middle;

  &.active {
    background-image: linear-gradient(to bottom, #ffffff 0%, #f7f7f7 100%);
    height: 3.75rem;
    margin-top: 0;
    padding-top: 2em;
    border-bottom: 4px solid ${lightBlue};
  }
`
