import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { useAppSelector } from 'redux/hooks';
import { RootState } from 'redux/store';
import AdminNavbar from 'components/AdminNavbar/AdminNavbar';
import AdminSideNav from 'components/AdminSideNav/AdminSideNav';
import UsersTable from 'components/UsersTable/UsersTable';
import AdminSearchbar from 'components/AdminSearchbar/AdminSearchbar';

const UserManagement = () => {
  const { adminAuth } = useAppSelector((state: RootState) => state);
  const adminToken = adminAuth.adminToken;
  const loggedInAdmin = adminAuth.loggedInAdmin;

  const navigate = useNavigate();

  useEffect(() => {
    if (!adminToken) {
      navigate('/admin/login');
      return;
    }

    if (!loggedInAdmin.roles.includes('users-read')) {
      navigate('/admin/unauthorized');
    }
  }, [adminToken, navigate, loggedInAdmin.roles]);

  return (
    <>
      <AdminNavbar />
      <div className='flex flex-col md:flex-row min-h-[calc(100vh-64px)] bg-adminBlue'>
        <AdminSideNav />
        <div className='text-white px-10 md:p-10 flex flex-col gap-8 w-full'>
          <div className='text-3xl font-medium'>User Management</div>
          <AdminSearchbar category='users' />
          <UsersTable />
        </div>
      </div>
    </>
  );
};
export default UserManagement;
