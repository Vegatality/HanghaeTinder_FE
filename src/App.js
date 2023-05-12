import { QueryClient, QueryClientProvider } from 'react-query';
import Router from './shared/Router';
import { ThemeProvider } from 'styled-components';
import { colors } from './styles/theme';
import GlobalStyle from './styles/GlobalStyle';

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider theme={colors}>
        <GlobalStyle />
        <Router />
      </ThemeProvider>
    </QueryClientProvider>
  )
}

export default App;
