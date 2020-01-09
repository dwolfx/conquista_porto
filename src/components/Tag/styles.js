import styled from 'styled-components'

export const Container = styled.div`
  height: 28px;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0 14px;
  background-color: ${props => props.theme.colors.white};
  border-radius: 4px;
  border: 1px solid
    ${props => {
      if (props.color === 'gray') {
        return props.theme.colors.gray3
      }

      if (props.color === 'blue') {
        return props.theme.colors.blue4
      }

      if (props.color === 'green') {
        return props.theme.colors.green3
      }

      return null
    }};

  p {
    color: ${props => {
      if (props.color === 'gray') {
        return props.theme.colors.gray5
      }

      if (props.color === 'blue') {
        return props.theme.colors.blue4
      }

      if (props.color === 'green') {
        return props.theme.colors.green3
      }

      return null
    }};
  }
`

export const Text = styled.p`
  ${props => props.theme.fontTypes.button}
`
