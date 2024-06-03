import "@/styles/globals.css";
import { CssBaseline } from "@mui/material";
import { ThemeProvider } from "@mui/material/styles";
import CustomTheme from "./CustomTheme";

export default function App({ Component, pageProps }) {
  return (
    <ThemeProvider theme={CustomTheme}>
      <CssBaseline />
      <Component {...pageProps} />
    </ThemeProvider>
  );
}
