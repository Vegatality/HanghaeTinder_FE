import { QueryClient, QueryClientProvider } from "react-query";
import Router from "./shared/Router";
import { ThemeProvider } from "styled-components";
import { colors } from "./styles/theme";
import GlobalStyle from "./styles/GlobalStyle";
import { BrowserRouter } from "react-router-dom";

const queryClient = new QueryClient();

function App() {
    return (
        <QueryClientProvider client={queryClient}>
            <ThemeProvider theme={colors}>
                <BrowserRouter>
                    <GlobalStyle />
                    <Router />
                </BrowserRouter>
            </ThemeProvider>
        </QueryClientProvider>
    );
}

export default App;
