import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import { useAppDispatch, useAppSelector } from 'redux/hooks';
import {
  fetchAdminThunk,
  updateAdminThunk,
} from 'redux/services/admin.service';
import { Admin } from 'redux/slices/adminsSlice';
import { RootState } from 'redux/store';

const EditAdmin = () => {
  const admin = useAppSelector((state: RootState) => state.admins.singleAdmin);
  const isLoading = useAppSelector(
    (state: RootState) => state.admins.isLoading
  );

  const [adminData, setAdminData] = useState<Admin>({
    firstname: '',
    lastname: '',
    email: '',
    password: '',
    roles: [],
  });

  const dispatch = useAppDispatch();
  const params = useParams();
  const adminId: string | undefined = params.adminId!;

  useEffect(() => {
    dispatch(fetchAdminThunk(adminId));
  }, [dispatch, adminId]);

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

  const checkRoles = {
    productsRead: () => (admin.roles.includes('products-read') ? true : false),
    productsWrite: () =>
      admin.roles.includes('products-write') ? true : false,
    usersRead: () => (admin.roles.includes('users-read') ? true : false),
    usersWrite: () => (admin.roles.includes('users-write') ? true : false),
    adminsRead: () => (admin.roles.includes('admins-read') ? true : false),
    adminsWrite: () => (admin.roles.includes('admins-write') ? true : false),
  };

  const handleCheckbox = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.checked) {
      if (adminData.roles.length === 0) {
        const newRoles = [...admin.roles, e.target.value];
        setAdminData({ ...adminData, roles: newRoles });
      } else {
        const newRoles = [...adminData.roles, e.target.value];
        setAdminData({ ...adminData, roles: newRoles });
      }
    } else {
      if (adminData.roles.length === 0) {
        const newRoles = admin.roles.filter((size) => size !== e.target.value);
        setAdminData({ ...adminData, roles: newRoles });
      } else {
        const newRoles = adminData.roles.filter(
          (size) => size !== e.target.value
        );
        setAdminData({ ...adminData, roles: newRoles });
      }
    }
  };

  const handleSubmit = (e: React.ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();
    const updatedAdmin: { [index: string]: any } = {
      firstname: adminData.firstname,
      lastname: adminData.lastname,
      email: adminData.email,
      password: adminData.password,
      roles: adminData.roles,
    };

    Object.keys(updatedAdmin).forEach((key) => {
      if (updatedAdmin[key] === '' || updatedAdmin[key].length === 0)
        delete updatedAdmin[key];
    });

    const data = { adminId: adminId, updatedAdmin: updatedAdmin };
    dispatch(updateAdminThunk(data));
  };

  return (
    <div>
      {!isLoading && (
        <form onSubmit={handleSubmit}>
          <label htmlFor='firstname'>First Name</label>
          <input
            type='text'
            id='firstname'
            required
            defaultValue={admin.firstname}
            onChange={handleSetFirstName}
          />
          <label htmlFor='lastname'>Last Name</label>
          <input
            type='text'
            id='lastname'
            required
            defaultValue={admin.lastname}
            onChange={handleSetLastName}
          />
          <label htmlFor='email'>Email</label>
          <input
            type='email'
            id='email'
            required
            defaultValue={admin.email}
            onChange={handleSetEmail}
          />
          <label htmlFor='password'>Password</label>
          <input type='password' id='password' onChange={handleSetPassword} />
          <input
            type='checkbox'
            id='products-read'
            name='roles'
            value='products-read'
            onChange={handleCheckbox}
            defaultChecked={checkRoles.productsRead()}
          />
          <label htmlFor='products-read'>Products - Read</label>
          <input
            type='checkbox'
            id='products-write'
            name='roles'
            value='products-write'
            onChange={handleCheckbox}
            defaultChecked={checkRoles.productsWrite()}
          />
          <label htmlFor='products-write'>Products - Write</label>
          <input
            type='checkbox'
            id='users-read'
            name='roles'
            value='users-read'
            onChange={handleCheckbox}
            defaultChecked={checkRoles.usersRead()}
          />
          <label htmlFor='users-read'>Users - Read</label>
          <input
            type='checkbox'
            id='users-write'
            name='roles'
            value='users-write'
            onChange={handleCheckbox}
            defaultChecked={checkRoles.usersWrite()}
          />
          <label htmlFor='users-write'>Users - Write</label>
          <input
            type='checkbox'
            id='admins-read'
            name='roles'
            value='admins-read'
            onChange={handleCheckbox}
            defaultChecked={checkRoles.adminsRead()}
          />
          <label htmlFor='admins-read'>Admins - Read</label>
          <input
            type='checkbox'
            id='admins-write'
            name='roles'
            value='admins-write'
            onChange={handleCheckbox}
            defaultChecked={checkRoles.adminsWrite()}
          />
          <label htmlFor='admins-write'>Admins - Write</label>
          <button type='submit'>Submit</button>
        </form>
      )}
    </div>
  );
};

export default EditAdmin;
