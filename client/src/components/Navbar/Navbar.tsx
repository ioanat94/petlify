import { Link } from 'react-router-dom';
import { GoogleLogin } from '@react-oauth/google';

import { useAppDispatch, useAppSelector } from 'redux/hooks';
import { fetchTokenThunk } from 'redux/services/auth.service';
import { RootState } from 'redux/store';
import Searchbar from 'components/Searchbar/Searchbar';

const Navbar = () => {
  const { auth, cart } = useAppSelector((state: RootState) => state);
  const user = auth.loggedInUser;
  const count = cart.count;

  const dispatch = useAppDispatch();

  const handleGoogleOnSuccess = (res: any) => {
    dispatch(fetchTokenThunk(res.credential));
  };

  return (
    <div className='flex items-center justify-between px-6 h-16 bg-mainBlue'>
      <div className='flex gap-10'>
        <Link to='/'>
          <div className='flex items-center gap-4'>
            <img src={require('assets/logo.png')} alt='' className='w-12' />
            <p className='text-2xl text-mainYellow font-medium'>Petlify</p>
          </div>
        </Link>
        <div className='text-mainYellow flex gap-6 text-sm'>
          <div className='flex items-center gap-2'>
            <img src={require('../../assets/check.png')} alt='' width='20px' />
            <p>Free delivery for all purchases</p>
          </div>
          <div className='flex items-center gap-2'>
            <img src={require('../../assets/check.png')} alt='' width='20px' />
            <p>Always expert service</p>
          </div>
        </div>
      </div>
      <div className='flex gap-10'>
        <Searchbar />
        <div className='flex items-center gap-6'>
          <Link to={`/users/${user._id}`}>
            <img src={user.image} alt='' className='w-8 h-8 rounded-full' />
          </Link>
          <div className='relative'>
            <Link to='/cart'>
              <img src={require('assets/cart.png')} alt='' className='w-8' />
            </Link>
            <span className='absolute -top-2 -right-4 text-mainBlue font-semibold bg-mainYellow rounded-full px-2'>
              {count}
            </span>
          </div>

          <GoogleLogin
            onSuccess={handleGoogleOnSuccess}
            onError={() => {
              console.log('Login Failed');
            }}
          />
        </div>
      </div>
    </div>
  );
};
export default Navbar;
