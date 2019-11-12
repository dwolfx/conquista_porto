import { createGlobalStyle } from 'styled-components'

export default createGlobalStyle`
  @import url('https://fonts.googleapis.com/css?family=Open+Sans:300,400,600,700,800&display=swap');
  *{
    padding: 0;
    margin: 0;
    box-sizing: border-box;
    outline: 0;
    font-family: 'Open Sans', sans-serif;

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
  }
`
