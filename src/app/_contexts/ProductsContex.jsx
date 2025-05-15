import { createContext, useState } from "react";

const ProductsContext = createContext();

export const ProductsContextProvider = ({ children }) => {
    const [products, setProducts] = useState([]);
    const [flashSalesProducts, setFlashSalesProducts] = useState([]);
    const [bestSellingProducts, setBestSellingProducts] = useState([]);
    return (
        <ProductsContext.Provider value={{ products, setProducts , bestSellingProducts, setBestSellingProducts, flashSalesProducts, setFlashSalesProducts }}>
            {children}
        </ProductsContext.Provider>
    );
};

export default ProductsContext;