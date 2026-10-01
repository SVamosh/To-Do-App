
import React from "react";
import Main from "./components/Main";
import Header from "./components/Header";
import { ThemeProvider } from "./context/ThemeProvider";

function App() {
  return (
    <ThemeProvider>
      <div className="App">
        <Header />
        <Main />
      </div>
    </ThemeProvider>
  );
}

export default App;
