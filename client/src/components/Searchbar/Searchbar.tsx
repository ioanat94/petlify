import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

const Searchbar = () => {
  const [search, setSearch] = useState('');
  const location = useLocation();

  var regex = new RegExp('(search=)[^&]+');
  const query = location.search.replace(regex, '');

  const handleSetSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  return (
    <div className='flex items-center gap-10'>
      <input
        type='search'
        placeholder='Search product...'
        className='w-96 h-10 border-2 rounded border-mainBlue indent-2 text-mainBlue'
        onChange={handleSetSearch}
      />

      <button className='border-2 border-mainYellow rounded px-4 py-1 text-mainYellow font-bold transition-all hover:border-white hover:bg-mainBlue hover:text-white'>
        <Link
          to={`/${
            query
              ? `${query}&search=${search.toLowerCase()}`
              : `?search=${search.toLowerCase()}`
          }`}
        >
          Search
        </Link>
      </button>
    </div>
  );
};
export default Searchbar;
