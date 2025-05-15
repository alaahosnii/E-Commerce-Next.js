import CarouselCard from "./_components/CarouselCard/CarouselCard";
import SideBar from "./_components/SideBar/SideBar";

import ProductBanner from "./_components/ProductBanner/ProductBanner";
import ProductsInHome from "./_components/ProductsInHome/ProductsInHome";

export const revalidate = 0;
export default async function Home() {
  return (
    <div className='flex flex-col mx-auto container'>

      <div className='hidden md:grid md:grid-cols-12'>
        <div className=' col-span-3'>
          <SideBar />
        </div>
        <div className=' col-span-9 pt-3 ps-3 pe-3'>
          <CarouselCard />
        </div>
      </div>

      {/* <Suspense fallback={<div>Loading...</div>}> */}
      <ProductsInHome />
      {/* </Suspense> */}

      <ProductBanner />
      {/* <ProductBanner />

      <CategorySection
        isFlash={false}
        style={{ marginTop: "100px" }}
        isExplore={true}
        categoryName={"Our Products"}
        description={"Explore Our Products"}
        products={products}
        error={error} />

      <NewArrivalSection /> */}


    </div>
  )
}

