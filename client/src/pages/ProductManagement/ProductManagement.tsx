import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { useAppSelector } from 'redux/hooks';
import { RootState } from 'redux/store';
import AddProductPopup from 'components/AddProductPopup/AddProductPopup';
import ProductsTable from 'components/ProductsTable/ProductsTable';
import AdminNavbar from 'components/AdminNavbar/AdminNavbar';
import AdminSideNav from 'components/AdminSideNav/AdminSideNav';
import AdminSearchbar from 'components/AdminSearchbar/AdminSearchbar';

const ProductManagement = () => {
  const [isVisible, setIsVisible] = useState(false);

  const handleSetVisible = () => {
    setIsVisible(!isVisible);
  };

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

    if (!loggedInAdmin.roles.includes('products-read')) {
      navigate('/admin/unauthorized');
    }
  }, [adminToken, navigate, loggedInAdmin.roles]);

  const checkWritePerms = () => {
    return loggedInAdmin.roles.includes('products-write');
  };

  return (
    <>
      <AdminNavbar />
      <div className='flex min-h-[calc(100vh-64px)] bg-adminBlue'>
        <AdminSideNav />
        <div className='text-white p-10 flex flex-col gap-8 w-full'>
          <div className='text-3xl font-medium'>Product Management</div>
          {checkWritePerms() && (
            <button
              onClick={handleSetVisible}
              className='w-max bg-adminLightBlue px-2 py-1 border border-adminBlue rounded text-adminBlue font-medium transition-all hover:border-adminLightBlue hover:bg-adminBlue hover:text-adminLightBlue'
            >
              Add Product
            </button>
          )}
          {isVisible && <AddProductPopup />}
          <AdminSearchbar category='products' />
          <ProductsTable />
        </div>
      </div>
    </>
  );
};

export default ProductManagement;
