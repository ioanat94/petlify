import { useEffect } from 'react';
import { useParams } from 'react-router-dom';

import { useAppDispatch, useAppSelector } from 'redux/hooks';
import { fetchUserThunk } from 'redux/services/user.service';
import { RootState } from 'redux/store';
import Footer from 'components/Footer/Footer';
import Navbar from 'components/Navbar/Navbar';

const User = () => {
  const user = useAppSelector((state: RootState) => state.users.singleUser);

  const dispatch = useAppDispatch();
  const params = useParams();
  const userId: string | undefined = params.userId!;

  useEffect(() => {
    dispatch(fetchUserThunk(userId));
  }, [dispatch, userId]);

  return (
    <div>
      <Navbar />
      <div className='flex justify-center min-h-[calc(100vh-128px)]'>
        <div className='flex items-center mt-20 gap-20 h-max'>
          <img
            src={user.image}
            alt=''
            width='150px'
            className='rounded-xl h-max'
          />
          <div className='flex items-center gap-20'>
            <div>
              <p className='text-mainBlue text-xl'>First Name</p>
              <p>{user.firstname}</p>
              <p className='text-mainBlue text-xl'>Last Name</p>
              <p>{user.lastname}</p>
              <p className='text-mainBlue text-xl'>E-mail</p>
              <p>{user.email}</p>
            </div>
            {user.isBanned && (
              <p className='text-red-500 font-bold text-2xl border-4 border-red-500 px-2 py-1 rounded-lg'>
                BANNED
              </p>
            )}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};
export default User;
