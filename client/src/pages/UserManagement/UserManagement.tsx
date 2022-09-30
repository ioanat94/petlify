import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { useAppSelector } from 'redux/hooks';
import { RootState } from 'redux/store';
import AdminNavbar from 'components/AdminNavbar/AdminNavbar';
import AdminSideNav from 'components/AdminSideNav/AdminSideNav';
import UsersTable from 'components/UsersTable/UsersTable';

const UserManagement = () => {
  const adminToken = useAppSelector(
    (state: RootState) => state.adminAuth.adminToken
  );

  const navigate = useNavigate();

  useEffect(() => {
    if (!adminToken) {
      navigate('/admin/login');
    }
  }, [adminToken, navigate]);

  return (
    <>
      <AdminNavbar />
      <div className='flex min-h-[calc(100vh-64px)] bg-adminBlue'>
        <AdminSideNav />
        <div className='text-white p-10 flex flex-col gap-8 w-full'>
          <div className='text-3xl font-medium'>User Management</div>
          <UsersTable />
        </div>
      </div>
    </>
  );
};
export default UserManagement;
