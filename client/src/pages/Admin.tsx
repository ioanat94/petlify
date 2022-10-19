import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { useAppSelector } from 'redux/hooks';
import { RootState } from 'redux/store';
import AdminNavbar from 'components/AdminNavbar/AdminNavbar';
import AdminSideNav from 'components/AdminSideNav/AdminSideNav';
import RecentProducts from 'components/RecentProducts/RecentProducts';
import RecentOrders from 'components/RecentOrders/RecentOrders';
import RecentUsers from 'components/RecentUsers/RecentUsers';
import RecentAdmins from 'components/RecentAdmins/RecentAdmins';

const Admin = () => {
  document.title = 'Petlify Admin Dashboard';

  const { adminAuth } = useAppSelector((state: RootState) => state);
  const adminToken = adminAuth.adminToken;
  const loggedInAdmin = adminAuth.loggedInAdmin;

  const navigate = useNavigate();

  useEffect(() => {
    if (!adminToken) {
      navigate('/admin/login');
    }
  }, [adminToken, navigate]);

  const checkWritePerms = (perm: string) => {
    return loggedInAdmin.roles.includes(perm);
  };

  return (
    <>
      <AdminNavbar />
      <div className='flex flex-col md:flex-row min-h-[calc(100vh-64px)] bg-adminBlue'>
        <AdminSideNav />
        <div className='flex flex-col gap-8 text-white px-10 md:p-10'>
          <div className='leading-7'>
            <p className='text-3xl font-medium'>Welcome!</p>
            <br />
            <p>
              This is <span className='text-mainYellow'>Petlify's</span> admin
              dashboard.
            </p>
            <p>
              Here you can manage products, users and / or admins, depending on
              your permissions.
            </p>
            <p>
              If you are lacking permissions or need help using any of the
              tools, please contact a system administrator.
            </p>
          </div>
          <div className='flex flex-col md:flex-row md:flex-wrap gap-16'>
            {checkWritePerms('products-read') && <RecentProducts />}
            {checkWritePerms('users-read') && <RecentUsers />}
            {checkWritePerms('orders-read') && <RecentOrders />}
            {checkWritePerms('admins-read') && <RecentAdmins />}
          </div>
        </div>
      </div>
    </>
  );
};

export default Admin;
