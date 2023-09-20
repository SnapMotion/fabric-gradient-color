import ReactDOM from "react-dom/client";
import { ChakraProvider, ColorModeScript } from "@chakra-ui/react";
import App from "./App.tsx";
import { theme } from "./styles/theme";
import "./styles/global.css";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <>
    <ColorModeScript initialColorMode={"system"} />
    <ChakraProvider theme={theme}>
      <App />
    </ChakraProvider>
  </>
);
