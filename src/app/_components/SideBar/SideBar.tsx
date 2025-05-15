import Spacer from '../Spacer/Spacer'
import CategoryItem from '../CategoryItem/CategoryItem'

function SideBar() {
  return (
    <div className='flex justify-between h-full'>
      <div className='flex flex-col justify-center gap-6 w-full'>
        <CategoryItem categoryName={"Woman’s Fashion"} />
        <CategoryItem categoryName={"Men’s Fashion"} />
        <CategoryItem categoryName={"Home & Lifestyle"} />
        <CategoryItem categoryName={"Medicine"} />
        <CategoryItem categoryName={"Sports & Outdoor"} />
        <CategoryItem categoryName={"Baby’s & Toys"} />
        <CategoryItem categoryName={"Groceries & Pets"} />
        <CategoryItem categoryName={"Health & Beauty"} />


      </div>
      <Spacer direaction={"vertical"} />
    </div>

  )
}

export default SideBar