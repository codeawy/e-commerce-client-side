import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { ChakraProvider } from "@chakra-ui/react";
import { BrowserRouter as Router } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "react-query";
import { Provider } from "react-redux";
import InternetConnectionProvider from "./providers/InternetConnectionProvider";
import { store } from "./app/store";
import { theme } from "./theme";

import "./index.css";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
    },
  },
});

ReactDOM.createRoot(document.getElementById("root")).render(
  <QueryClientProvider client={queryClient}>
    <Provider store={store}>
      <InternetConnectionProvider>
        <Router>
          <ChakraProvider theme={theme}>
            <App />
          </ChakraProvider>
        </Router>
      </InternetConnectionProvider>
    </Provider>
  </QueryClientProvider>
);
