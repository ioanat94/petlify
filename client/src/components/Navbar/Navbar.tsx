import { Link } from 'react-router-dom';
import { GoogleLogin } from '@react-oauth/google';

const Navbar = () => {
  const handleGoogleOnSuccess = (res: any) => {
    console.log(res);
  };

  return (
    <div className='flex items-center justify-between px-6 h-16 bg-mainBlue'>
      <Link to='/'>
        <div className='flex items-center gap-4'>
          <img src={require('assets/logo.png')} alt='' className='w-12' />
          <p className='text-2xl text-mainYellow font-medium'>Petlify</p>
        </div>
      </Link>
      <div className='flex items-center gap-4'>
        <img src={require('assets/profilepic.png')} alt='' className='w-8' />
        <img src={require('assets/cart.png')} alt='' className='w-8' />
        <GoogleLogin
          onSuccess={handleGoogleOnSuccess}
          onError={() => {
            console.log('Login Failed');
          }}
        />
      </div>
    </div>
  );
};
export default Navbar;
