import { useState } from 'react';

import AddAdminPopup from 'components/AddAdminPopup/AddAdminPopup';
import AdminsTable from 'components/AdminsTable/AdminsTable';
import AdminNavbar from 'components/AdminNavbar/AdminNavbar';
import AdminSideNav from 'components/AdminSideNav/AdminSideNav';

const AdminManagement = () => {
  const [isVisible, setIsVisible] = useState(false);

  const handleSetVisible = () => {
    setIsVisible(!isVisible);
  };

  return (
    <>
      <AdminNavbar />
      <div className='flex min-h-[calc(100vh-64px)] bg-adminBlue'>
        <AdminSideNav />
        <div className='text-white p-10 flex flex-col gap-8 w-full'>
          <div className='text-3xl font-medium'>Admin Management</div>
          <button
            onClick={handleSetVisible}
            className='w-max bg-adminLightBlue px-2 py-1 border border-adminBlue rounded text-adminBlue font-medium transition-all hover:border-adminLightBlue hover:bg-adminBlue hover:text-adminLightBlue'
          >
            Add Admin
          </button>
          {isVisible && <AddAdminPopup />}
          <AdminsTable />
        </div>
      </div>
    </>
  );
};

export default AdminManagement;
