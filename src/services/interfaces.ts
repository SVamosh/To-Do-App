
import { Dispatch, SetStateAction, ReactNode } from "react";

export type Theme = "light" | "dark";

export interface MyContextType {
    theme: Theme;
    setTheme: Dispatch<SetStateAction<Theme>>;
}

export interface ThemeProviderProps {
    children: ReactNode;
}

export interface Note {
    id: string;
    isEdit: boolean;
    text: string;
    date: string;
};

export interface CompletedTask {
    id: string;
    text: string;
    date: string;
};