import { Link } from 'react-router-dom';

const SideNav = () => {
  const categories = ['Food', 'Toys', 'Beds', 'Hygene', 'Other'];

  const handleRenderCategories = (pet: string) => {
    return categories.map((category) => (
      <li className='pl-3' key={`${pet}&${category.toLowerCase()}`}>
        <Link to={`/?pet=${pet}&subcategory=${category.toLowerCase()}`}>
          {category}
        </Link>
      </li>
    ));
  };
  return (
    <ul className='border-2 rounded-xl border-mainYellow p-6 pr-20 h-max'>
      <li className='text-mainBlue text-xl font-medium'>
        <Link to='/?pet=cats'>Cats</Link>
      </li>
      <ul>{handleRenderCategories('cats')}</ul>
      <li className='text-mainBlue text-xl font-medium'>
        <Link to='/?pet=dogs'>Dogs</Link>
      </li>
      <ul>{handleRenderCategories('dogs')}</ul>
    </ul>
  );
};
export default SideNav;
