import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import { useAppDispatch, useAppSelector } from 'redux/hooks';
import { fetchUserThunk, updateUserThunk } from 'redux/services/user.service';
import { RootState } from 'redux/store';
import Footer from 'components/Footer/Footer';
import Navbar from 'components/Navbar/Navbar';
import SomethingWentWrong from 'components/SomethingWentWrong/SomethingWentWrong';

type UserInfo = {
  firstname: string;
  lastname: string;
  image: string;
};

const User = () => {
  const user = useAppSelector((state: RootState) => state.users.singleUser);
  const token = useAppSelector((state: RootState) => state.auth.token);

  const [userData, setUserData] = useState<UserInfo>({
    firstname: '',
    lastname: '',
    image: '',
  });

  const dispatch = useAppDispatch();
  const params = useParams();
  const userId: string | undefined = params.userId!;

  useEffect(() => {
    dispatch(fetchUserThunk({ userId, token }));
  }, [dispatch, userId, token]);

  const handleSetFirstName = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUserData({ ...userData, firstname: e.target.value });
  };

  const handleSetLastName = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUserData({ ...userData, lastname: e.target.value });
  };

  const handleSetImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUserData({ ...userData, image: e.target.value });
  };

  const handleSubmit = (e: React.ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();
    const updatedUser: { [index: string]: any } = {
      firstname: userData.firstname,
      lastname: userData.lastname,
      image: userData.image,
    };

    Object.keys(updatedUser).forEach((key) => {
      if (updatedUser[key] === '') delete updatedUser[key];
    });

    const data = { userId: userId, updatedUser: updatedUser };
    dispatch(updateUserThunk(data));
  };

  return (
    <div>
      <Navbar />
      {userId === user._id ? (
        <div className='flex justify-center min-h-[calc(100vh-128px)]'>
          <div className='flex items-center justify-evenly mt-20 h-max w-[750px]'>
            <img
              src={user.image}
              alt=''
              width='150px'
              className='rounded-xl h-max'
            />
            <div className='flex justify-center gap-20'>
              <form
                onSubmit={handleSubmit}
                className='flex flex-col gap-2 w-[300px]'
              >
                <p className='text-mainBlue text-xl font-semibold'>E-mail</p>
                <p className='indent-1'>{user.email}</p>
                <div className='flex flex-col gap-2'>
                  <label
                    htmlFor='firstname'
                    className='text-mainBlue text-xl font-semibold'
                  >
                    First Name
                  </label>
                  <input
                    type='text'
                    id='firstname'
                    className='rounded text-black indent-1 border border-mainBlue'
                    required
                    defaultValue={user.firstname}
                    onChange={handleSetFirstName}
                  />
                </div>
                <div className='flex flex-col gap-2'>
                  <label
                    htmlFor='lastname'
                    className='text-mainBlue text-xl font-semibold'
                  >
                    Last Name
                  </label>
                  <input
                    type='text'
                    id='lastname'
                    className='rounded text-black indent-1 border border-mainBlue'
                    required
                    defaultValue={user.lastname}
                    onChange={handleSetLastName}
                  />
                </div>
                <div className='flex flex-col gap-2'>
                  <label
                    htmlFor='image'
                    className='text-mainBlue text-xl font-semibold'
                  >
                    Profile Picture
                  </label>
                  <input
                    type='text'
                    id='image'
                    className='rounded text-black indent-1 border border-mainBlue'
                    required
                    defaultValue={user.image}
                    onChange={handleSetImage}
                  />
                </div>
                <button
                  type='submit'
                  className='w-max px-3 py-1 mt-2 border-2 border-mainBlue rounded text-mainBlue font-semibold transition-all hover:bg-mainBlue hover:text-white'
                >
                  Edit
                </button>
              </form>
              {user.isBanned && (
                <p className='text-red-500 font-bold text-2xl border-4 border-red-500 px-2 py-1 rounded-lg'>
                  BANNED
                </p>
              )}
            </div>
          </div>
        </div>
      ) : (
        <SomethingWentWrong />
      )}
      <Footer />
    </div>
  );
};
export default User;
