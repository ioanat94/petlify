import AdminNavbar from 'components/AdminNavbar/AdminNavbar';
import AdminSideNav from 'components/AdminSideNav/AdminSideNav';

const Admin = () => {
  document.title = 'Petlify Admin Dashboard';
  return (
    <>
      <AdminNavbar />
      <div className='flex min-h-[calc(100vh-64px)] bg-adminBlue'>
        <AdminSideNav />
        <div className='text-white p-10 leading-7'>
          <p className='text-3xl font-medium'>Welcome!</p>
          <br />
          <br />
          <p>
            This is <span className='text-mainYellow'>Petlify's</span> admin
            dashboard.
          </p>
          <p>
            Here you can manage products, users and / or admins, depending on
            your permissions.
          </p>
          <p>
            If you are lacking permissions or need help using any of the tools,
            please contact a system administrator.
          </p>
        </div>
      </div>
    </>
  );
};

export default Admin;
