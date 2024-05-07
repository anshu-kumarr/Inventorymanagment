import { theme } from '../../theme';
import { createGlobalStyle, type DefaultTheme } from 'styled-components';

type IGlobalStyles = DefaultTheme;

const GlobalStyles = createGlobalStyle<IGlobalStyles>`
  
  body {
    margin: 0;
    background: ${theme.bgColor};
    font-family: Sans-serif;
  }
  
`;

export default GlobalStyles;
