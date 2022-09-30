import AdminNavbar from 'components/AdminNavbar/AdminNavbar';

const Unauthorized = () => {
  return (
    <>
      <AdminNavbar />
      <div className='flex flex-col items-center gap-4 min-h-[calc(100vh-64px)] pt-20 bg-adminBlue text-white'>
        <img src={require('../../assets/403.png')} alt='' />
        <div className='text-4xl text-red-500 font-bold'>OOPS!</div>
        <div className='text-xl'>
          It seems like you do not have permission to complete this action.
        </div>
        <div className='text-xl'>
          Please contact a system admin if you need additional permissions.
        </div>
      </div>
    </>
  );
};
export default Unauthorized;
