import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import AddProductPopup from 'components/AddProductPopup/AddProductPopup';
import ProductsTable from 'components/ProductsTable/ProductsTable';
import AdminNavbar from 'components/AdminNavbar/AdminNavbar';
import AdminSideNav from 'components/AdminSideNav/AdminSideNav';
import { useAppSelector } from 'redux/hooks';
import { RootState } from 'redux/store';

const ProductManagement = () => {
  const [isVisible, setIsVisible] = useState(false);

  const handleSetVisible = () => {
    setIsVisible(!isVisible);
  };

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
          <div className='text-3xl font-medium'>Product Management</div>
          <button
            onClick={handleSetVisible}
            className='w-max bg-adminLightBlue px-2 py-1 border border-adminBlue rounded text-adminBlue font-medium transition-all hover:border-adminLightBlue hover:bg-adminBlue hover:text-adminLightBlue'
          >
            Add Product
          </button>
          {isVisible && <AddProductPopup />}
          <ProductsTable />
        </div>
      </div>
    </>
  );
};

export default ProductManagement;
