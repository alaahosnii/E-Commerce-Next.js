"use client"
import { createContext, useState } from "react";

type ThemeContextType = {
    theme: string,
    setTheme: React.Dispatch<React.SetStateAction<string>>
}
export const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

const ThemeContextProvider = ({ children }: { children: React.ReactNode }) => {
    const [theme, setTheme] = useState("light");

    return (
        <ThemeContext.Provider value={{ theme, setTheme }}>
            {children}
        </ThemeContext.Provider>
    );
}

export default ThemeContextProvider;