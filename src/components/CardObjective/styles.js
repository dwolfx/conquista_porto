import styled from 'styled-components'

export const CardWrapper = styled.div`
  align-items: center;
  background-color: ${props => props.theme.colors.white};
  border: 1px solid ${props => props.theme.colors.gray2};
  border-radius: 8px;
  display: flex;
  flex-direction: column;
  margin: 7px;
  max-width: 278px;
  padding: 30px 20px;
`

export const CardIcon = styled.div`
  width: 56px;
`

export const CardTitle = styled.div`
  align-items: center;
  display: flex;
  flex: 1 1 auto;
  font-size: 22px;
  font-weight: 300;
  margin: 30px 0;
  text-align: center;
`
