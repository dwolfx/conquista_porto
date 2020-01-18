import styled from 'styled-components'

export const Tab = styled.div`
  background-image: linear-gradient(
    to bottom,
    ${props => props.theme.colors.white} 0%,
    ${props => props.theme.colors.gray1} 100%
  );
  border: 1px solid ${props => props.theme.colors.gray3};
  cursor: pointer;
  height: 3rem;
  font-size: 10px;
  font-weight: 700;
  flex: 1 1 0;
  letter-spacing: 1.5px;
  margin-top: 0.75rem;
  padding-top: 1.75em;
  text-align: center;
  text-transform: uppercase;
  vertical-align: middle;
  transition: all 0.1s linear;

  &:first-of-type {
    border-radius: 6px 0 0 0;
  }

  &:last-of-type {
    border-radius: 0 6px 0 0;
  }

  &.active {
    border-radius: 6px 6px 0 0;
    background-image: linear-gradient(
      to bottom,
      ${props => props.theme.colors.white} 0%,
      ${props => props.theme.colors.gray1} 100%
    );
    height: 3.75rem;
    margin-top: 0;
    padding-top: 2em;
    border-bottom: 4px solid ${props => props.theme.colors.blue4};
  }
`
