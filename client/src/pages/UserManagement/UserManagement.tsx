import AdminNavbar from 'components/AdminNavbar/AdminNavbar';
import AdminSideNav from 'components/AdminSideNav/AdminSideNav';
import UsersTable from 'components/UsersTable/UsersTable';

const UserManagement = () => {
  return (
    <>
      <AdminNavbar />
      <div className='flex min-h-[calc(100vh-64px)] bg-adminBlue'>
        <AdminSideNav />
        <div className='text-white p-10 flex flex-col gap-8 w-full'>
          <div className='text-3xl font-medium'>User Management</div>
          <UsersTable />
        </div>
      </div>
    </>
  );
};
export default UserManagement;
