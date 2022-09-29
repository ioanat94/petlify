import { Link } from 'react-router-dom';
import { GoogleLogin } from '@react-oauth/google';
import { useAppDispatch, useAppSelector } from 'redux/hooks';
import { fetchTokenThunk } from 'redux/services/auth.service';
import { RootState } from 'redux/store';

const Navbar = () => {
  const user = useAppSelector((state: RootState) => state.auth.loggedInUser);

  const dispatch = useAppDispatch();

  const handleGoogleOnSuccess = (res: any) => {
    dispatch(fetchTokenThunk(res.credential));
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
        <Link to={`/users/${user._id}`}>
          <img src={user.image} alt='' className='w-8 rounded-full' />
        </Link>

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
