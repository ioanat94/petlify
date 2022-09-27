import { Link } from 'react-router-dom';

import { Product } from 'redux/slices/productsSlice';

const ProductCard = ({ _id, name, img, categories, sizes, price }: Product) => {
  const renderSizes = () => {
    return sizes.map((size) => (
      <span className='border border-mainBlue text-mainBlue w-6 text-center'>
        {size[0].toUpperCase()}
      </span>
    ));
  };

  return (
    <div className='w-max flex flex-col gap-4'>
      <img src={img} alt='' width='200px' className='border border-mainGrey' />
      <Link to={`/products/${_id}`} className='text-mainBlue font-medium'>
        {name}
      </Link>
      <div className='flex items-center gap-2'>{renderSizes()}</div>
      <div className='flex items-center justify-between'>
        <div className='flex gap-2'>
          <span className='border rounded-full border-mainYellow px-2 py-1'>
            #{categories.pet}
          </span>
          <span className='border rounded-full border-mainYellow px-2 py-1'>
            #{categories.subcategory}
          </span>
        </div>
        <span className='text-right text-lg font-bold'>{price}€</span>
      </div>
      <button className='w-max px-4 py-1 text-mainBlue font-bold border-2 border-mainBlue rounded-lg transition-all hover:border-white hover:bg-mainBlue hover:text-white'>
        BUY
      </button>
    </div>
  );
};
export default ProductCard;
