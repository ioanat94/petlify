import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

const AdminSearchbar = ({ category }: { category: string }) => {
  const [search, setSearch] = useState('');
  const location = useLocation();

  var regex = new RegExp('(\\?search=)[^&]+');
  const query = location.search.replace(regex, '');

  const handleSetSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  return (
    <div className='flex items-center gap-10'>
      <input
        type='search'
        placeholder='Search...'
        className='w-96 h-10 border-2 rounded border-mainBlue indent-2 text-mainBlue'
        onChange={handleSetSearch}
      />

      <button className='border-2 border-adminLightBlue rounded px-4 py-1 text-adminLightBlue font-bold transition-all hover:border-adminBlue hover:bg-adminLightBlue hover:text-adminBlue'>
        <Link
          to={`/admin/${category}${`?${query}search=${search.toLowerCase()}`}`}
        >
          Search
        </Link>
      </button>
      <button className='border-2 border-adminLightBlue rounded px-4 py-1 text-adminLightBlue font-bold transition-all hover:border-adminBlue hover:bg-adminLightBlue hover:text-adminBlue'>
        <Link to={`/admin/${category}`}>Clear</Link>
      </button>
    </div>
  );
};
export default AdminSearchbar;
