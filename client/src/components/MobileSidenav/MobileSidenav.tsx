import { Link } from 'react-router-dom';

const MobileSidenav = () => {
  const categories = ['Food', 'Toys', 'Beds', 'Hygene', 'Other'];

  const handleRenderCategories = (pet: string) => {
    return categories.map((category) => (
      <li className='pt-0.5' key={`${pet}&${category.toLowerCase()}`}>
        <Link to={`/?pet=${pet}&subcategory=${category.toLowerCase()}`}>
          {category}
        </Link>
      </li>
    ));
  };

  return (
    <div className='lg:hidden'>
      <div className='flex flex-col py-4 h-max'>
        <div className='flex items-center justify-between'>
          <div className='text-mainBlue text-xl font-medium'>
            <Link to='/?pet=cats'>Cats:&nbsp;&nbsp; </Link>
          </div>
          <ul className='flex gap-4'>{handleRenderCategories('cats')}</ul>
        </div>
        <div className='flex items-center'>
          <div className='text-mainBlue text-xl font-medium'>
            <Link to='/?pet=dogs'>Dogs:&nbsp;&nbsp;</Link>
          </div>
          <ul className='flex gap-4'>{handleRenderCategories('dogs')}</ul>
        </div>
      </div>
    </div>
  );
};
export default MobileSidenav;
