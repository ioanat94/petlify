import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { useAppDispatch, useAppSelector } from 'redux/hooks';
import { fetchAdminTokenThunk } from 'redux/services/adminAuth.service';
import AdminNavbar from 'components/AdminNavbar/AdminNavbar';
import { RootState } from 'redux/store';

const AdminLogin = () => {
  const adminToken = useAppSelector(
    (state: RootState) => state.adminAuth.adminToken
  );
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const navigate = useNavigate();

  useEffect(() => {
    if (adminToken) {
      navigate('/admin');
    }
  }, [adminToken, navigate]);

  const dispatch = useAppDispatch();

  const handleSetEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const handleSetPassword = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const handleLogin = (e: React.ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(fetchAdminTokenThunk({ email, password }));
  };

  return (
    <>
      <AdminNavbar />
      <div className='flex justify-center items-center min-h-[calc(100vh-64px)] bg-adminBlue text-white'>
        <div className='flex flex-col gap-12 w-[300px]'>
          <form
            action=''
            onSubmit={handleLogin}
            className='flex flex-col gap-6'
          >
            <div className='flex justify-between'>
              <label htmlFor=''>Email</label>
              <input
                type='email'
                onChange={handleSetEmail}
                className='text-adminBlue indent-1 rounded'
              />
            </div>
            <div className='flex justify-between'>
              <label htmlFor=''>Password</label>
              <input
                type='password'
                onChange={handleSetPassword}
                className='text-adminBlue indent-1 rounded'
              />
            </div>
            <button className='border-2 border-white w-max self-center py-1 px-3 rounded font-semibold transition-all hover:border-adminBlue hover:text-adminBlue hover:bg-white'>
              LOGIN
            </button>
          </form>
        </div>
      </div>
    </>
  );
};
export default AdminLogin;
