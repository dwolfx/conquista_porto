import { createGlobalStyle } from 'styled-components'

export default createGlobalStyle`
  @import url('https://fonts.googleapis.com/css?family=Open+Sans:300,400,600&display=swap');

  *{
    padding: 0;
    margin: 0;
    box-sizing: border-box;
    outline: 0;
    font-family: 'Open Sans', sans-serif;

  }

  *::before,
  *::after {
    box-sizing: inherit;
  }

  html {
    scroll-behavior: smooth;
    box-sizing: border-box;
    -ms-overflow-style: scrollbar;
  }

  a {
    text-decoration: none;
    color: #000;
  }

  p {
    font-weight: 300;
  }

  ::selection {
    background: #018cb7;
    color: #fff;
  }

  #root {
    display: flex;
    flex-direction: column;
    min-height: 100vh;
  }

  .main-content {
    display: flex;
    flex-grow: 1;
    flex-shrink: 0;
    flex-basis: auto;
    justify-content: center;
    flex-direction: column;
    background-color: #F1F1F1;
  }

  &::-webkit-scrollbar {
    height: 10px;
    width: 10px;
    background-color: ${props => props.theme.colors.gray2};
    border-radius: 10px;
  }

  &::-webkit-scrollbar-thumb {
    border-radius: 10px;
    background-color: ${props => props.theme.colors.gray5};
  }

  .with-custom-scroll {
    &::-webkit-scrollbar {
      background-color: transparent;
    }

    &::-webkit-scrollbar-thumb {
      background-color: ${props => props.theme.colors.gray2};
    }
  }
`
