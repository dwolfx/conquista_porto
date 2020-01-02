import styled from 'styled-components'

export const CardWrapper = styled.div`
  border: 1px solid ${props => props.theme.colors.gray3};
  border-left: 0px;
  display: flex;
  flex-direction: row;
  height: 10em;
  padding: 1em;

  svg {
    height: 36px;
    margin: 0.5em 1em 0 0;
    width: 93px;
    fill: ${props => props.theme.colors.gray5};
  }

  @media (min-width: 1100px) {
    padding: 2em;
  }
`

export const Title = styled.h1`
  font-size: 18px;
  line-height: 28px;
  font-weight: 300;
`

export const Description = styled.p`
  color: ${props => props.theme.colors.gray6};
  font-weight: 300;
  font-size: 14px;
`

export const TextBox = styled.div``
