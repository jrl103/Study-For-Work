import { ThemeProvider } from 'styled-components';
import GlobalStyle from './GlobalStyle';

interface ITheme {
  children: React.ReactNode;
}

export default function Theme({ children }: ITheme) {
  return (
    <ThemeProvider theme={{}}>
      <GlobalStyle />
      {children}
    </ThemeProvider>
  );
}
