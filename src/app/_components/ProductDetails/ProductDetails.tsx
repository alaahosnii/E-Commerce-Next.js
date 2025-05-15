import styles from './ProductDetails.module.css'
import RightSide from '../RightSide/RightSide';
import instance from '@/app/_redux/services/axiosInstance';
import { Product } from '@/app/_types/productTypes';
import Image from 'next/image'; 

async function ProductDetails({ id }: {
  id: string
}) {
  const product = await getProductWithId(id);
  
  return (
    <div className={`flex flex-col items-start mt-10`}>
      {

        <div className='w-full grid grid-cols-12 mt-5'>
          <div className='md:col-span-6 col-span-12'>
            <div className={`${styles.productImgContainer} flex items-center justify-center`}>
              <Image src={product?.imageUrl ?? ""} height={315} width={200} alt={product?.name ?? ""} />
            </div>
          </div>
          <div className=' col-span-2'></div>
          <div className='col-span-12 md:col-span-4 flex flex-col justify-center'>
            <RightSide product={product as Product} />
          </div>
        </div>
      }

    </div>
  )
}
const getProductWithId = async (id: string) => {
  try {
    console.log("id", id);
    const response = await instance.get(`/products/${id}`);
    return response.data as Product;
  } catch (error) {
    console.error("Error fetching product:", error);
    return null;
  }
}

export default ProductDetails;