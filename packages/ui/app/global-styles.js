import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
  html,
  body {
    height: 100%;
    width: 100%;
  }

  body {
    font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;
    margin: 0;
  }

  #app {
    background-color: #fafafa;
    min-height: 100%;
    min-width: 100%;
  }

  p,
  label {
    font-family: Georgia, Times, 'Times New Roman', serif;
    line-height: 1.5em;
  }
  a[href] {
    cursor: pointer;
  }

  .eventItem-enter {
    opacity: 0.01;
  }

  .eventItem-enter.eventItem-enter-active {
    opacity: 1;
    transition: opacity 500ms ease-in;
  }

  .eventItem-leave {
    opacity: 1;
  }

  .eventItem-leave.eventItem-leave-active {
    opacity: 0.01;
    transition: opacity 300ms ease-in;
  }
`;

export default GlobalStyle;
