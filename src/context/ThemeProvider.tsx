
import React, { useState, useEffect, createContext, useContext, Dispatch } from "react";

type Theme = "light" | "dark";

type MyContextType = {
    theme: Theme;
    setTheme: Dispatch<React.SetStateAction<Theme>>;
}

type ThemeProviderProps = {
    children: React.ReactNode;
}

export const ThemeContext = createContext<MyContextType | undefined>(undefined);

export const ThemeProvider: React.FC<ThemeProviderProps> = ({ children }) => {
    const [theme, setTheme] = useState<Theme>("light");

    useEffect(() => {
        document.documentElement.classList.remove("light", "dark");
        document.documentElement.classList.add(theme);
    }, [theme]);

    return (
        <ThemeContext.Provider value={{theme, setTheme}}>
            {children}
        </ThemeContext.Provider>
    );
};

export function useTheme() {
    const context = useContext(ThemeContext);
    if (!context) {
      throw new Error('useTheme должен использоваться внутри ThemeProvider');
    }
    return context;
}