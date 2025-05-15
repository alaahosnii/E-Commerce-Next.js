'use client'
import React, { useContext } from 'react'
import { ProductsInRoutesContext } from '../_contexts/ProductsInRoutesContext'
import ProductComponent from '../_components/ProductComponent/ProductComponent';


export default function Products() {

    const context = useContext(ProductsInRoutesContext);
    if (!context) {
        throw new Error("useProductsInRoutes must be used within a ProductsInRoutesContextProvider");
    }
    const { productsInRoutes } = context;
    console.log("productsInRoutes", productsInRoutes);

    return (

        <div className='mt-5 flex gap-5 flex-wrap'>
            {
                productsInRoutes?.map((product) => <ProductComponent isFlashSale={product.flashSale} key={product.id} product={product} />)
            }
        </div>
    )
}
