import styled from 'styled-components'

export const Container = styled.div<{ color: string }>`
  height: 28px;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: ${({ theme }) => `0 ${theme.spacing(2)}px`};
  background-color: ${({ theme }) => theme.colors.white};
  border-radius: 4px;
  border: 1px solid
    ${({ color, theme }) => {
      if (color === 'gray') {
        return theme.colors.gray3
      }

      if (color === 'blue') {
        return theme.colors.blue4
      }

      if (color === 'green') {
        return theme.colors.green3
      }
    }};

  p {
    color: ${({ color, theme }) => {
      if (color === 'gray') {
        return theme.colors.gray5
      }

      if (color === 'blue') {
        return theme.colors.blue4
      }

      if (color === 'green') {
        return theme.colors.green3
      }
    }};
  }
`

export const Text = styled.p`
  ${({ theme }) => theme.fontTypes.button}
`
