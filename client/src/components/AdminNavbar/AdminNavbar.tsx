import { Link } from 'react-router-dom';

import { useAppDispatch, useAppSelector } from 'redux/hooks';
import { logout } from 'redux/slices/authAdminSlice';
import { RootState } from 'redux/store';

const AdminNavbar = () => {
  const token = useAppSelector(
    (state: RootState) => state.adminAuth.adminToken
  );

  const dispatch = useAppDispatch();

  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <div className='flex items-center justify-between px-4 md:px-10 bg-adminBlue h-16 text-white border-b border-b-gray-600'>
      <Link to='/admin' className='flex items-center gap-4'>
        <img src={require('assets/admin.png')} alt='' width='40px' />
        <p className='text-2xl'>Admin</p>
      </Link>
      {token && (
        <button className='text-lg' onClick={handleLogout}>
          LOG OUT
        </button>
      )}
    </div>
  );
};
export default AdminNavbar;
