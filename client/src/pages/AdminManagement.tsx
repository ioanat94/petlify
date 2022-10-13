import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { useAppSelector } from 'redux/hooks';
import { RootState } from 'redux/store';
import AddAdminPopup from 'components/AddAdminPopup/AddAdminPopup';
import AdminsTable from 'components/AdminsTable/AdminsTable';
import AdminNavbar from 'components/AdminNavbar/AdminNavbar';
import AdminSideNav from 'components/AdminSideNav/AdminSideNav';
import AdminSearchbar from 'components/AdminSearchbar/AdminSearchbar';

const AdminManagement = () => {
  const [isVisible, setIsVisible] = useState(false);

  const handleSetVisible = () => {
    setIsVisible(!isVisible);
  };

  const { adminAuth } = useAppSelector((state: RootState) => state);
  const loggedInAdmin = adminAuth.loggedInAdmin;
  const adminToken = adminAuth.adminToken;

  const navigate = useNavigate();

  useEffect(() => {
    if (!adminToken) {
      navigate('/admin/login');
      return;
    }

    if (!loggedInAdmin.roles.includes('admins-read')) {
      navigate('/admin/unauthorized');
    }
  }, [adminToken, navigate, loggedInAdmin.roles]);

  const checkWritePerms = () => {
    return loggedInAdmin.roles.includes('admins-write');
  };

  return (
    <>
      <AdminNavbar />
      <div className='flex flex-col md:flex-row min-h-[calc(100vh-64px)] bg-adminBlue'>
        <AdminSideNav />
        <div className='text-white px-8 md:p-10 flex flex-col gap-8 w-full'>
          <div className='text-3xl font-medium'>Admin Management</div>
          {checkWritePerms() && (
            <button
              onClick={handleSetVisible}
              className='w-max bg-adminLightBlue px-2 py-1 border border-adminBlue rounded text-adminBlue font-medium transition-all hover:border-adminLightBlue hover:bg-adminBlue hover:text-adminLightBlue'
            >
              Add Admin
            </button>
          )}
          {isVisible && <AddAdminPopup />}
          <AdminSearchbar category='admins' />
          <AdminsTable />
        </div>
      </div>
    </>
  );
};

export default AdminManagement;
