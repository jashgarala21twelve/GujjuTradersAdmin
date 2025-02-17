import "./App.css";
import { ThemeProvider } from "./components/themeProvider";
import { MotionLazy } from "./components/animate/motion-lazy";
import Router from "./routes";
import { BrowserRouter } from "react-router-dom";
import AppRouter from "./routes";

function App() {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <MotionLazy>
        <AppRouter />
        {/* <Router /> */}
      </MotionLazy>
    </ThemeProvider>
  );
}

export default App;
