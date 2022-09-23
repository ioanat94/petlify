import AddAdminPopup from 'components/AddAdminPopup';
import AdminsTable from 'components/AdminsTable';
import { useState } from 'react';

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
