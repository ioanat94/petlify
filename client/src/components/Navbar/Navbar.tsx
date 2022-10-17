import { Link } from 'react-router-dom';
import { GoogleLogin } from '@react-oauth/google';
import { useSnackbar } from 'react-simple-snackbar';

import { useAppDispatch, useAppSelector } from 'redux/hooks';
import { fetchTokenThunk } from 'redux/services/auth.service';
import { RootState } from 'redux/store';
import Searchbar from 'components/Searchbar/Searchbar';

const Navbar = () => {
  const { auth, cart } = useAppSelector((state: RootState) => state);
  const user = auth.loggedInUser;
  const count = cart.count;

  const options = {
    position: 'top-center',
    style: {
      marginTop: '110px',
      backgroundColor: '#444a9c',
      color: '#f4cd57',
      fontFamily: 'Montserrat, sans-serif',
      fontSize: '16px',
      textAlign: 'center',
    },
    closeStyle: {
      color: '#f4cd57',
      fontSize: '12px',
    },
  };
  const [openSnackbar] = useSnackbar(options);

  const dispatch = useAppDispatch();

  const handleGoogleOnSuccess = (res: any) => {
    dispatch(fetchTokenThunk(res.credential));
    openSnackbar('Login successful.');
  };

  return (
    <div className='flex flex-col bg-mainBlue pb-4 lg:pb-0 sticky top-0 z-[9]'>
      <div className='flex items-center justify-between px-6 h-16'>
        <div className='flex gap-12'>
          <Link to='/'>
            <div className='flex items-center gap-4'>
              <img
                src={require('assets/logo.png')}
                alt=''
                className='max-w-[48px]'
              />
              <p className='text-2xl text-mainYellow font-medium hidden md:block'>
                Petlify
              </p>
            </div>
          </Link>
          <div className='text-mainYellow gap-2 text-sm hidden xl:flex'>
            <div className='flex items-center gap-2'>
              <img
                src={require('../../assets/check.png')}
                alt=''
                width='20px'
              />
              <p>Free delivery for all purchases</p>
            </div>
            <div className='flex items-center gap-2'>
              <img
                src={require('../../assets/check.png')}
                alt=''
                width='20px'
              />
              <p>Always expert service</p>
            </div>
          </div>
        </div>
        <div className='flex gap-10'>
          <div className='hidden lg:block'>
            <Searchbar />
          </div>
          <div className='flex items-center gap-4 md:gap-6'>
            <Link to={`/users/${user._id}`}>
              <img
                src={user.image}
                alt=''
                className='max-w-[32px] h-8 rounded-full ml-4 md:ml-0'
              />
            </Link>
            <div className='relative mr-2 md:mr-0'>
              <Link to='/cart'>
                <img
                  src={require('assets/cart.png')}
                  alt=''
                  className='max-w-[32px]'
                />
              </Link>
              <span className='absolute -top-2 -right-4 text-mainBlue font-semibold bg-mainYellow rounded-full px-2'>
                {count}
              </span>
            </div>

            <GoogleLogin
              width='100px'
              onSuccess={handleGoogleOnSuccess}
              onError={() => {
                console.log('Login Failed');
              }}
            />
          </div>
        </div>
      </div>
      <div className='block self-center lg:hidden'>
        <Searchbar />
      </div>
    </div>
  );
};
export default Navbar;
