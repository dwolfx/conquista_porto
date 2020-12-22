import styled from 'styled-components'
import SelectComponent from 'components/Inputs/Select'
import ButtonComponent from 'components/Button'

export const SelectWrapper = styled.div`
  width: 100%;
`
export const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 0;
`

export const Select = styled(SelectComponent)`
  margin: ${({ theme }) => `0 0 ${theme.spacing(4)}`}px;
`

export const Button = styled(ButtonComponent)`
  width: 100%;
`
