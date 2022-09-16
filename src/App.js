import React from "react";
import Home from "./pages/Home";
import "@fontsource/poppins/300.css";
import "@fontsource/poppins/400.css";
import "@fontsource/poppins/500.css";
import "@fontsource/poppins/700.css";
import { createTheme } from "@mui/material";
import { ThemeProvider } from "@emotion/react";
import "react-toastify/dist/ReactToastify.css";

const theme = createTheme({
  typography: {
    fontFamily: ["Poppins"],
  },
  palette: {
    primary: {
      main: "#ef6c00",
    },
    secondary: {
      main: "#ffca28",
    },
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Home />
    </ThemeProvider>
  );
}

export default App;
