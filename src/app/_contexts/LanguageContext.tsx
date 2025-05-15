import { createContext, useState } from "react";

type LanguageContextType = {
    language: string,
    setLanguage: React.Dispatch<React.SetStateAction<string>>
}
export const languageContext = createContext<LanguageContextType | undefined>(undefined);

const LanguageContextProvider = ({ children }: { children: React.ReactNode }) => {
    const [language, setLanguage] = useState("English");

    return (
        <languageContext.Provider value={{ language, setLanguage }}>
            {children}
        </languageContext.Provider>
    )
}

export default LanguageContextProvider;
