"use client";
import React, { useContext } from 'react'
import styles from './CategoryLabel.module.css'
import { ProductsInRoutesContext } from '@/app/_contexts/ProductsInRoutesContext';
import { Product } from '@/app/_types/productTypes';
import { useRouter } from "next/navigation";
function CategoryLabel({ products = [], isNewArrival = false, categoryName, isExplore = false, description, isBestSelling = false }: {
  products?: Product[],
  isNewArrival?: boolean,
  categoryName?: string,
  isExplore?: boolean,
  description?: string,
  isBestSelling?: boolean
}) {
  const context = useContext(ProductsInRoutesContext);
  if (!context) {
    throw new Error("useProductsInRoutes must be used within a ProductsInRoutesContextProvider");
  }

  const { setProductsInRoutes } = context;
  const navigate = useRouter();




  return (
    <div>
      <div className={`${description ? styles.categoryLabel : styles.relatedItems} flex items-center`}>
        <div className={`${styles.redCard} rounded`}></div>
        <h6 className='ms-3 mb-0'> {categoryName} </h6>
      </div>
      {

        <div className='flex justify-between'>
          {
            (isBestSelling || isExplore || isNewArrival) &&
            <h4 className='mb-0 mt-3'>{description}</h4>
          }

          {
            isBestSelling && <button onClick={() => {
              setProductsInRoutes(products);
              return navigate.push("/products");
            }} className={`flex items-center bg-red-500 rounded p-3 text-white`} style={{ height: "50px" }}>View All Products</button>
          }
        </div>
      }
    </div>
  );
}

export default CategoryLabel;