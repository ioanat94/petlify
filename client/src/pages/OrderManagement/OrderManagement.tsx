import AdminNavbar from 'components/AdminNavbar/AdminNavbar';
import AdminSearchbar from 'components/AdminSearchbar/AdminSearchbar';
import AdminSideNav from 'components/AdminSideNav/AdminSideNav';
import OrdersTable from 'components/OrdersTable/OrdersTable';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppSelector } from 'redux/hooks';
import { RootState } from 'redux/store';

const OrderManagement = () => {
  const adminToken = useAppSelector(
    (state: RootState) => state.adminAuth.adminToken
  );
  const loggedInAdmin = useAppSelector(
    (state: RootState) => state.adminAuth.loggedInAdmin
  );

  const navigate = useNavigate();

  useEffect(() => {
    if (!adminToken) {
      navigate('/admin/login');
      return;
    }

    if (!loggedInAdmin.roles.includes('orders-read')) {
      navigate('/admin/unauthorized');
    }
  }, [adminToken, navigate, loggedInAdmin.roles]);

  return (
    <>
      <AdminNavbar />
      <div className='flex min-h-[calc(100vh-64px)] bg-adminBlue'>
        <AdminSideNav />
        <div className='text-white p-10 flex flex-col gap-8 w-full'>
          <div className='text-3xl font-medium'>Order Management</div>
          <AdminSearchbar category='orders' />
          <OrdersTable />
        </div>
      </div>
    </>
  );
};
export default OrderManagement;
