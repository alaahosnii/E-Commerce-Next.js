"use client";
import { Provider } from "react-redux";
import store from "./app/_redux/store";
import ProductsInRoutesContextProvider from "./app/_contexts/ProductsInRoutesContext";
import ThemeContextProvider from "./app/_contexts/ThemeModeContext";
import LanguageContextProvider from "./app/_contexts/LanguageContext";

export function Providers({ children }: { children: React.ReactNode }) {
    return (
        <Provider store={store}>
            <ProductsInRoutesContextProvider>
                <ThemeContextProvider>
                    <LanguageContextProvider>
                        {children}
                    </LanguageContextProvider>
                </ThemeContextProvider>
            </ProductsInRoutesContextProvider>
        </Provider>
    )
}