import React from 'react'
import "./ProductComponent.css"
import Image from 'next/image'
import { Product } from '@/app/_types/productTypes'
import ProductImageContainer from './ProductImageContainer'
function ProductComponent({ product, isWishList = false, isFlashSale = false }: {
  product: Product,
  isWishList?: boolean,
  isFlashSale?: boolean
}) {
  // const ProductImageContainerNoSSR = dynamic(() => import('./ProductImageContainer'), { ssr: false, loading: () => <p>Loading...</p> }); 
  // const dispatch = useDispatch();
  // const favorites = useSelector((state) => state.favorite.products);
  // const favoriteProduct = favorites.find((favProduct) => favProduct.id == product.id);
  // const authState = useSelector((state) => state.auth);


  // const toggleFavorite = (e) => {
  //   e.stopPropagation();
  //   if (authState.user) {
  //     if (favoriteProduct) {
  //       removeProductFromFavorite(product);
  //     } else {
  //       addProductToFavorite(product);
  //     }
  //   } else {
  //     const id = toast.error(
  //       <div className='d-flex align-items-center justify-content-between w-100'>Login to add to wishlist
  //         <Button
  //           onClick={() => {
  //             toast.dismiss(id);
  //             return navigate("/login")
  //           }}
  //           variant="contained"
  //           className={`bg-danger text-white d-flex align-items-center justify-content-center`}
  //           style={{ height: "30px" }}
  //         >Login
  //         </Button>
  //       </div>,

  //       {
  //         autoClose: 5000,
  //         closeButton: false
  //       })
  //   }

  // }
  // const addProductToFavorite = () => {

  //   dispatch(addToFavorite(product));
  // }
  // const removeProductFromFavorite = () => {
  //   dispatch(removeFromFavorite(product));
  // }
  return (
    <div className='flex flex-col w-fit'>
      <ProductImageContainer
        product={product}
        isWishList={isWishList}
        isFlashSale={isFlashSale}
      />
      <h6 style={{ width: "270px" }} className='mt-2 mb-0'>{product.name}</h6>
      <div className='flex gap-2 items-center mt-2'>
        {
          isFlashSale &&
          <div className='flex items-center gap-2'>
            <p className='mb-0   text-red-500'> ${product.price} </p>
            <p className='mb-0 line-through text-gray-400 font-medium'> ${product.previousPrice} </p>
          </div>
        }
        {!isFlashSale && <p className='mb-0 text-red-500'> ${product.price} </p>}
        {
          !isFlashSale &&
          <div className='flex items-center gap-1'>
            <Image src="/star.png" width={17} height={17} alt='star' />
            <Image src="/star.png" width={17} height={17} alt='star' />
            <Image src="/star.png" width={17} height={17} alt='star' />
            <Image src="/grey_star.png" width={17} height={17} alt='star' />
            <Image src="/grey_star.png" width={17} height={17} alt='star' />
            <p className='mb-0 text-gray-400 font-medium'>(35)</p>
          </div>
        }
      </div>
      {isFlashSale && <div className='mt-2 flex items-center gap-1'>
        <Image src="/star.png" width={17} height={17} alt='star' />
        <Image src="/star.png" width={17} height={17} alt='star' />
        <Image src="/star.png" width={17} height={17} alt='star' />
        <Image src="/grey_star.png" width={17} height={17} alt='star' />
        <Image src="/grey_star.png" width={17} height={17} alt='star' />
        <p className='mb-0 text-gray-400 font-medium'>(35)</p>
      </div>}

    </div>
  )
}

export default ProductComponent