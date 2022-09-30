import { Link } from 'react-router-dom';

import { useAppDispatch } from 'redux/hooks';
import { logout } from 'redux/slices/authAdminSlice';

const AdminNavbar = () => {
  const dispatch = useAppDispatch();

  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <div className='flex items-center justify-between px-10 bg-adminBlue h-16 text-white border-b border-b-gray-600'>
      <Link to='/admin' className='flex items-center gap-4'>
        <img src={require('assets/admin.png')} alt='' width='40px' />
        <p className='text-2xl'>Admin</p>
      </Link>
      <button className='text-lg' onClick={handleLogout}>
        LOG OUT
      </button>
    </div>
  );
};
export default AdminNavbar;
