const SideNav = () => {
  const categories = ['Food', 'Toys', 'Beds', 'Hygene', 'Other'];

  const handleRenderCategories = () => {
    return categories.map((category) => <li className='pl-3'>{category}</li>);
  };
  return (
    <ul className='border-2 rounded-xl border-mainYellow p-6 pr-20 h-max'>
      <li className='text-mainBlue text-xl font-medium'>Cats</li>
      <ul>{handleRenderCategories()}</ul>
      <li className='text-mainBlue text-xl font-medium'>Dogs</li>
      <ul>{handleRenderCategories()}</ul>
    </ul>
  );
};
export default SideNav;
