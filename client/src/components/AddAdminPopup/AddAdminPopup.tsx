import { useState } from 'react';

import { useAppDispatch } from 'redux/hooks';
import { createAdminThunk } from 'redux/services/admin.service';
import { Admin } from 'redux/slices/adminsSlice';

const AddAdminPopup = () => {
  const [adminData, setAdminData] = useState<Admin>({
    firstname: '',
    lastname: '',
    email: '',
    password: '',
    roles: [],
  });

  const dispatch = useAppDispatch();

  const resetState = () => {
    setAdminData({
      firstname: '',
      lastname: '',
      email: '',
      password: '',
      roles: [],
    });
  };

  const handleSetFirstName = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAdminData({ ...adminData, firstname: e.target.value });
  };

  const handleSetLastName = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAdminData({ ...adminData, lastname: e.target.value });
  };

  const handleSetEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAdminData({ ...adminData, email: e.target.value });
  };

  const handleSetPassword = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAdminData({ ...adminData, password: e.target.value });
  };

  const handleCheckbox = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.checked) {
      const newRoles = [...adminData.roles, e.target.value];
      setAdminData({ ...adminData, roles: newRoles });
    } else {
      const newRoles = adminData.roles.filter(
        (role) => role !== e.target.value
      );
      setAdminData({ ...adminData, roles: newRoles });
    }
  };

  const handleSubmit = (e: React.ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();
    const newAdmin = {
      firstname: adminData.firstname,
      lastname: adminData.lastname,
      email: adminData.email,
      password: adminData.password,
      roles: adminData.roles,
    };
    dispatch(createAdminThunk(newAdmin));
    e.target.reset();
    resetState();
  };

  return (
    <form
      onSubmit={handleSubmit}
      className='flex flex-col gap-4 border border-adminLightBlue rounded-xl px-6 md:px-10 py-4 md:py-6 md:w-max'
    >
      <div className='flex flex-col md:flex-row justify-between'>
        <label htmlFor='firstname'>First Name</label>
        <input
          type='text'
          id='firstname'
          required
          className='rounded text-black indent-2'
          onChange={handleSetFirstName}
        />
      </div>
      <div className='flex flex-col md:flex-row justify-between'>
        <label htmlFor='lastname'>Last Name</label>
        <input
          type='text'
          id='lastname'
          required
          className='rounded text-black indent-2'
          onChange={handleSetLastName}
        />
      </div>
      <div className='flex flex-col md:flex-row justify-between'>
        <label htmlFor='email'>Email</label>
        <input
          type='email'
          id='email'
          className='rounded text-black indent-2'
          required
          onChange={handleSetEmail}
        />
      </div>
      <div className='flex flex-col md:flex-row justify-between'>
        <label htmlFor='password'>Password</label>
        <input
          type='password'
          id='password'
          className='rounded text-black indent-2'
          required
          onChange={handleSetPassword}
        />
      </div>
      <div className='flex flex-col gap-2'>
        <p>Roles</p>
        <div className='flex flex-col md:flex-row md:gap-10'>
          <div className='flex flex-col'>
            <div className='flex items-center gap-2'>
              <input
                type='checkbox'
                id='products-read'
                name='roles'
                value='products-read'
                onChange={handleCheckbox}
              />
              <label htmlFor='products-read'>Products - Read</label>
            </div>
            <div className='flex items-center gap-2'>
              <input
                type='checkbox'
                id='products-write'
                name='roles'
                value='products-write'
                onChange={handleCheckbox}
              />
              <label htmlFor='products-write'>Products - Write</label>
            </div>
            <div className='flex items-center gap-2'>
              <input
                type='checkbox'
                id='orders-read'
                name='roles'
                value='orders-read'
                onChange={handleCheckbox}
              />
              <label htmlFor='orders-read'>Orders - Read</label>
            </div>
            <div className='flex items-center gap-2'>
              <input
                type='checkbox'
                id='orders-write'
                name='roles'
                value='orders-write'
                onChange={handleCheckbox}
              />
              <label htmlFor='orders-write'>Orders - Write</label>
            </div>
          </div>
          <div>
            <div className='flex items-center gap-2'>
              <input
                type='checkbox'
                id='users-read'
                name='roles'
                value='users-read'
                onChange={handleCheckbox}
              />
              <label htmlFor='users-read'>Users - Read</label>
            </div>
            <div className='flex items-center gap-2'>
              <input
                type='checkbox'
                id='users-write'
                name='roles'
                value='users-write'
                onChange={handleCheckbox}
              />
              <label htmlFor='users-write'>Users - Write</label>
            </div>
            <div className='flex items-center gap-2'>
              <input
                type='checkbox'
                id='admins-read'
                name='roles'
                value='admins-read'
                onChange={handleCheckbox}
              />
              <label htmlFor='admins-read'>Admins - Read</label>
            </div>
            <div className='flex items-center gap-2'>
              <input
                type='checkbox'
                id='admins-write'
                name='roles'
                value='admins-write'
                onChange={handleCheckbox}
              />
              <label htmlFor='admins-write'>Admins - Write</label>
            </div>
          </div>
        </div>
      </div>

      <button
        type='submit'
        className='w-max bg-adminLightBlue px-2 py-1 border border-adminBlue rounded text-adminBlue font-medium transition-all hover:border-adminLightBlue hover:bg-adminBlue hover:text-adminLightBlue'
      >
        Submit
      </button>
    </form>
  );
};
export default AddAdminPopup;
