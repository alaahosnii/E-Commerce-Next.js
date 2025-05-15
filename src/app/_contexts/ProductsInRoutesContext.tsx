"use client"
import { createContext, useState } from "react";
import { Product } from "../_types/productTypes";

type ProductsInRoutesContextType = {
    productsInRoutes: Product[] | undefined,
    setProductsInRoutes: React.Dispatch<React.SetStateAction<Product[] | undefined>>
}

export const ProductsInRoutesContext = createContext<ProductsInRoutesContextType | undefined>(undefined);

const ProductsInRoutesContextProvider = ({ children }: { children: React.ReactNode }) => {
    const [productsInRoutes, setProductsInRoutes] = useState<Product[]>();
    return (
        <ProductsInRoutesContext.Provider value={{ productsInRoutes, setProductsInRoutes }}>
            {children}
        </ProductsInRoutesContext.Provider>
    );
}

export default ProductsInRoutesContextProvider;