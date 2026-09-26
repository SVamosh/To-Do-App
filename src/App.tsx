
import React from "react";
import Clock from "./components/Clock";
import Header from "./components/Header";
import { ThemeProvider } from "./context/ThemeProvider";

function App() {
  return (
    <ThemeProvider>
      <div className="App">
        <Header />
        <Clock />
      </div>
    </ThemeProvider>
  );
}

export default App;
