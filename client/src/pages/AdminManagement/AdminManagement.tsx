import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import AddAdminPopup from 'components/AddAdminPopup/AddAdminPopup';
import AdminsTable from 'components/AdminsTable/AdminsTable';
import AdminNavbar from 'components/AdminNavbar/AdminNavbar';
import AdminSideNav from 'components/AdminSideNav/AdminSideNav';
import { useAppSelector } from 'redux/hooks';
import { RootState } from 'redux/store';

const AdminManagement = () => {
  const [isVisible, setIsVisible] = useState(false);

  const handleSetVisible = () => {
    setIsVisible(!isVisible);
  };
  const loggedInAdmin = useAppSelector(
    (state: RootState) => state.adminAuth.loggedInAdmin
  );

  const adminToken = useAppSelector(
    (state: RootState) => state.adminAuth.adminToken
  );

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
      <div className='flex min-h-[calc(100vh-64px)] bg-adminBlue'>
        <AdminSideNav />
        <div className='text-white p-10 flex flex-col gap-8 w-full'>
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
          <AdminsTable />
        </div>
      </div>
    </>
  );
};

export default AdminManagement;
