
import { useState, useEffect, createContext, useContext, type FC } from "react";
import type { Theme, MyContextType, ThemeProviderProps } from "../services/interfaces";

export const ThemeContext = createContext<MyContextType | undefined>(undefined);

export const ThemeProvider: FC<ThemeProviderProps> = ({ children }) => {
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