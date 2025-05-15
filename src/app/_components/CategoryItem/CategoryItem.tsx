import Image from 'next/image';
function CategoryItem({ categoryName }: {
  categoryName: string
}) {
  return (
    <div className='flex items-center justify-between w-full'>
      <h6 style={{ fontSize: "13.5px" }}>{categoryName}</h6>
      <Image alt='arrow' src= "/arrow.png" height={10} width={10} />
    </div>
  );
}

export default CategoryItem