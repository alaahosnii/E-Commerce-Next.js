"use client"
import { Product } from "../_types/productTypes";
import CategoryLabel from "./CategoryLabel/CategoryLabel";
import { useContext } from "react";
import { ProductsInRoutesContext } from "../_contexts/ProductsInRoutesContext";
import FlashSaleLabel from "./FlashSaleLabel/FlashSaleLabel";
import ProductComponent from "./ProductComponent/ProductComponent";
import { useRouter } from "next/navigation";

function CategorySection({ products, error, isFlash = false, categoryName, description, style, isExplore = false, isBestSelling = false }: {
    products: Product[],
    error: string,
    isFlash: boolean,
    categoryName: string,
    description: string,
    style: React.CSSProperties,
    isExplore?: boolean,
    isBestSelling?: boolean
}) {
    console.log("envv", process.env.NEXT_PUBLIC_BACKEND_URL);
    const context = useContext(ProductsInRoutesContext);
    if (!context) {
        throw new Error("useProductsInRoutes must be used within a ProductsInRoutesContextProvider");
    }
    const { setProductsInRoutes } = context;
    const navigate = useRouter();


    return (
        <div style={style}>
            {
                isFlash ? <FlashSaleLabel />
                    :
                    <CategoryLabel products={products} isExplore={isExplore} isBestSelling={isBestSelling} categoryName={categoryName} description={description} />

            }
            <div className={` ${!isBestSelling && "flex overflow-auto gap-5"} ${(isBestSelling || isExplore) && "flex gap-5 flex-wrap sm:flex justify-center sm:justify-between"} mt-4`}>
                {
                    !isBestSelling ?
                        isExplore ?
                            products.length !== 0 ? products.map((product, index) => index < 8 && <ProductComponent isFlashSale={product.flashSale} key={product.id} product={product} />)
                                : error && <div>{error}</div>
                            :
                            products.length !== 0 ? products.map((product) => <ProductComponent isFlashSale={product.flashSale} key={product.id} product={product} />)
                                : error && <div>{error}</div>
                        : products.length !== 0 ? products.map((product, index) => index < 4 && <ProductComponent isFlashSale={product.flashSale} key={product.id} product={product} />)
                            : error && <div>{error}</div>
                }
            </div>
            {
                !isBestSelling &&
                <div className='mt-5 flex justify-center'>
                    <button onClick={() => {
                        setProductsInRoutes(products);
                        return navigate.push("/products");
                    }} className={` bg-red-500 text-white rounded md:w-1/5 w-1/2`} style={{ height: "50px" }}>View All Products</button>

                </div>
            }
        </div>)
}

export default CategorySection;