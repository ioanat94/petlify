import AdminNavbar from 'components/AdminNavbar/AdminNavbar';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppSelector } from 'redux/hooks';
import { RootState } from 'redux/store';

const Unauthorized = () => {
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
      <div className='flex flex-col items-center gap-4 min-h-[calc(100vh-64px)] pt-10 pl-6 md:pl-0 md:pt-20 bg-adminBlue text-white'>
        <img src={require('../assets/403.png')} alt='' />
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
