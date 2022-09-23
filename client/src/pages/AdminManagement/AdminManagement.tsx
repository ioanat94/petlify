import { useState } from 'react';

import AddAdminPopup from 'components/AddAdminPopup/AddAdminPopup';
import AdminsTable from 'components/AdminsTable/AdminsTable';

const AdminManagement = () => {
  const [isVisible, setIsVisible] = useState(false);

  const handleSetVisible = () => {
    setIsVisible(!isVisible);
  };

  return (
    <>
      <div>AdminManagement</div>
      <button onClick={handleSetVisible}>Add Admin</button>
      {isVisible && <AddAdminPopup />}
      <AdminsTable />
    </>
  );
};

export default AdminManagement;
