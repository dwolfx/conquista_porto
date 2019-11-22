import styled from 'styled-components'

export const Container = styled.div`
  background: white;
  width: 100%;
  list-style-type: none;
  margin-bottom: 30px;
  position: relative;
  padding: 14px;
  cursor: pointer;
  -moz-transition: all 0.2s ease 0s;
  -o-transition: all 0.2s ease 0s;
  -webkit-transition: all 0.2s ease 0s;
  transition: all 0.2s ease 0s;
  display: block;
  text-decoration: none;
  filter: drop-shadow(0 2px 8px rgba(0, 0, 0, 0.15));

  display: flex;
  flex-direction: column;
  align-items: center;

  ::after {
    content: '';
    display: ${props => !props.active && 'none'};
    position: absolute;
    left: 100%;
    top: calc(50% - 11px);
    border-top: 11px solid transparent;
    border-bottom: 11px solid transparent;
    border-left: 12px solid white;

    @media (max-width: 1000px) {
      top: 100%;
      left: calc(50% - 11px);
      border-left: 11px solid transparent;
      border-right: 11px solid transparent;
      border-top: 12px solid white;
      border-bottom: 11px solid transparent;
    }
  }

  @media (max-width: 1000px) {
    margin-left: 22px;
    width: 150px;
  }
`
