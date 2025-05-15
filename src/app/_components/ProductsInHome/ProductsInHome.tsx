import React from 'react'
import CategorySection from '../CategorySection'
import { Product } from '@/app/_types/productTypes';
import instance from '@/app/_redux/services/axiosInstance';

export default async function ProductsInHome() {
    const { products, error } = await getProducts();
    const flashSalesProducts = products.filter(product => product.flashSale);
    const bestSellingProducts = products.filter(product => product.bestSelling);
    return (
        <>
            <CategorySection
                style={{ marginTop: "100px" }}
                isFlash={true}
                categoryName={"Today's"}
                description={"Flash Sales"}
                products={flashSalesProducts}
                error={error} />

            <CategorySection
                style={{ marginTop: "100px" }}
                isFlash={false}
                categoryName={"This Month"}
                description={"Best Selling Products"}
                products={bestSellingProducts}
                isBestSelling={true}
                error={error} />
        </>
    )
}

const getProducts = async (): Promise<{ products: Product[], error: string }> => {
    try {
        const response = await instance.get("/products");
        return {
            products: response.data as Product[],
            error: ""
        }
    } catch (error) {
        console.error("Error fetching products:", error);
        return {
            products: [],
            error: "Error fetching products"
        };
    }
}
