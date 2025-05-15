"use client"
import React, { useContext } from 'react';
import styles from './HeaderContent.module.css'
import Dropdown from 'react-bootstrap/Dropdown';
import { ThemeContext } from '@/app/_contexts/ThemeModeContext';
import { languageContext } from '@/app/_contexts/LanguageContext';

export default function HeaderContent() {
    const themeContext = useContext(ThemeContext);
    if (!themeContext) {
        throw new Error("useTheme must be used within a ThemeContextProvider");
    }
    const { theme, setTheme } = themeContext;
    const languageContexts = useContext(languageContext);
    if (!languageContexts) {
        throw new Error("useLanguage must be used within a LanguageContextProvider");
    }
    const { language, setLanguage } = languageContexts;
    const toggleThemeMode = () => {
        setTheme((currentTheme) => currentTheme == "light" ? "dark" : "light");
    }

    const toggleLanguage = () => {
        setLanguage((currentLanguage) => currentLanguage == "English" ? "Arabic" : "English");
    }
    return (
        <div className={`${theme == "dark" ? styles.headerDark : styles.header} p-2 flex flex-col lg:flex-row justify-between  items-center`}>
            <div className='w-100 flex justify-center'>
                <h6 className=' text-lg mb-0'>Summer Sale For All Swim Suits And Free Express Delivery - OFF 50%!
                    ShopNow</h6>
            </div>

            <div className='me-5 flex'>
                <Dropdown>

                    <Dropdown.Toggle style={{ backgroundColor: "transparent", border: "none" }} id="dropdown-basic">
                        {theme}
                    </Dropdown.Toggle>
                    <Dropdown.Menu style={{ minWidth: "50px" }}>
                        <Dropdown.Item onClick={toggleThemeMode}>Light</Dropdown.Item>
                        <Dropdown.Item onClick={toggleThemeMode}>dark</Dropdown.Item>
                    </Dropdown.Menu>
                </Dropdown>

                <Dropdown className='ms-3'>
                    <Dropdown.Toggle style={{ backgroundColor: "transparent", border: "none" }} id="dropdown-basic">
                        {language}
                    </Dropdown.Toggle>

                    <Dropdown.Menu style={{ minWidth: "100px" }}>
                        <Dropdown.Item onClick={toggleLanguage}>English</Dropdown.Item>
                        <Dropdown.Item onClick={toggleLanguage}>Arabic</Dropdown.Item>
                    </Dropdown.Menu>
                </Dropdown>
            </div>

        </div>)
}
