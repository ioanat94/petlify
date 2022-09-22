import AddAdminPopup from 'components/AddAdminPopup';
import AdminsTable from 'components/AdminsTable';
import { useState } from 'react';

const AdminManagement = () => {
  const [isVisible, setIsVisible] = useState(false);

  return (
    <>
      <div>AdminManagement</div>
      <button onClick={() => setIsVisible(!isVisible)}>Add Admin</button>
      {isVisible && <AddAdminPopup />}
      <AdminsTable />
    </>
  );
};

export default AdminManagement;
