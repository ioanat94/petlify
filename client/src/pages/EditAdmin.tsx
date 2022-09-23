import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from 'redux/hooks';
import {
  Admin,
  fetchAdminThunk,
  updateAdminThunk,
} from 'redux/slices/adminsSlice';
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

  const handleCheckbox = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.checked) {
      const newRoles = [...adminData.roles, e.target.value];
      console.log(newRoles);
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
    const updatedAdmin = {
      firstname: adminData.firstname,
      lastname: adminData.lastname,
      email: adminData.email,
      password: adminData.password,
      roles: adminData.roles,
    };
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
            onChange={(e) =>
              setAdminData({ ...adminData, firstname: e.target.value })
            }
          />
          <label htmlFor='lastname'>Last Name</label>
          <input
            type='text'
            id='lastname'
            required
            defaultValue={admin.lastname}
            onChange={(e) =>
              setAdminData({ ...adminData, lastname: e.target.value })
            }
          />
          <label htmlFor='email'>Email</label>
          <input
            type='email'
            id='email'
            required
            defaultValue={admin.email}
            onChange={(e) =>
              setAdminData({ ...adminData, email: e.target.value })
            }
          />
          <label htmlFor='password'>Password</label>
          <input
            type='password'
            id='password'
            required
            defaultValue={admin.password}
            onChange={(e) =>
              setAdminData({ ...adminData, password: e.target.value })
            }
          />
          <input
            type='checkbox'
            id='products-read'
            name='roles'
            value='products-read'
            onChange={handleCheckbox}
            defaultChecked={
              admin.roles.includes('products-read') ? true : false
            }
          />
          <label htmlFor='products-read'>Products - Read</label>
          <input
            type='checkbox'
            id='products-write'
            name='roles'
            value='products-write'
            onChange={handleCheckbox}
            defaultChecked={
              admin.roles.includes('products-write') ? true : false
            }
          />
          <label htmlFor='products-write'>Products - Write</label>
          <input
            type='checkbox'
            id='users-read'
            name='roles'
            value='users-read'
            onChange={handleCheckbox}
            defaultChecked={admin.roles.includes('users-read') ? true : false}
          />
          <label htmlFor='users-read'>Users - Read</label>
          <input
            type='checkbox'
            id='users-write'
            name='roles'
            value='users-write'
            onChange={handleCheckbox}
            defaultChecked={admin.roles.includes('users-write') ? true : false}
          />
          <label htmlFor='users-write'>Users - Write</label>
          <input
            type='checkbox'
            id='admins-read'
            name='roles'
            value='admins-read'
            onChange={handleCheckbox}
            defaultChecked={admin.roles.includes('admins-read') ? true : false}
          />
          <label htmlFor='admins-read'>Admins - Read</label>
          <input
            type='checkbox'
            id='admins-write'
            name='roles'
            value='admins-write'
            onChange={handleCheckbox}
            defaultChecked={admin.roles.includes('admins-write') ? true : false}
          />
          <label htmlFor='admins-write'>Admins - Write</label>
          <button type='submit'>Submit</button>
        </form>
      )}
    </div>
  );
};

export default EditAdmin;
