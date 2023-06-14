import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux/es/exports";
import App from "./App";
import { store } from "./hooks";
import "./index.css";
import { ChakraProvider } from "@chakra-ui/react";
import { MantineProvider } from "@mantine/core";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <Provider store={store}>
    <MantineProvider withGlobalStyles withNormalizeCSS>
      <ChakraProvider>
        <App />
      </ChakraProvider>
    </MantineProvider>
  </Provider>
);
