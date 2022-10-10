import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import { useAppDispatch, useAppSelector } from 'redux/hooks';
import {
  fetchAdminThunk,
  updateAdminThunk,
} from 'redux/services/admin.service';
import { Admin } from 'redux/slices/adminsSlice';
import { RootState } from 'redux/store';
import AdminNavbar from 'components/AdminNavbar/AdminNavbar';
import AdminSideNav from 'components/AdminSideNav/AdminSideNav';

const EditAdmin = () => {
  const { admins, adminAuth } = useAppSelector((state: RootState) => state);
  const admin = admins.singleAdmin;
  const isLoading = admins.isLoading;
  const adminToken = adminAuth.adminToken;
  const loggedInAdmin = adminAuth.loggedInAdmin;

  const navigate = useNavigate();

  useEffect(() => {
    if (!adminToken) {
      navigate('/admin/login');
      return;
    }

    if (!loggedInAdmin.roles.includes('admins-write')) {
      navigate('/admin/unauthorized');
    }
  }, [adminToken, navigate, loggedInAdmin.roles]);

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
    ordersRead: () => (admin.roles.includes('orders-read') ? true : false),
    ordersWrite: () => (admin.roles.includes('orders-write') ? true : false),
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
      <AdminNavbar />
      <div className='flex min-h-[calc(100vh-64px)] bg-adminBlue'>
        <AdminSideNav />
        {!isLoading && (
          <div className='flex flex-col gap-4 p-10 text-white min-w-[550px]'>
            <p className='text-3xl font-medium'>Edit Admin</p>
            <form onSubmit={handleSubmit} className='flex flex-col gap-4'>
              <div className='flex justify-between'>
                <label htmlFor='firstname'>First Name</label>
                <input
                  type='text'
                  id='firstname'
                  className='rounded text-black indent-2'
                  required
                  defaultValue={admin.firstname}
                  onChange={handleSetFirstName}
                />
              </div>
              <div className='flex justify-between'>
                <label htmlFor='lastname'>Last Name</label>
                <input
                  type='text'
                  id='lastname'
                  className='rounded text-black indent-2'
                  required
                  defaultValue={admin.lastname}
                  onChange={handleSetLastName}
                />
              </div>
              <div className='flex justify-between'>
                <label htmlFor='email'>Email</label>
                <input
                  type='email'
                  id='email'
                  className='rounded text-black indent-2'
                  required
                  defaultValue={admin.email}
                  onChange={handleSetEmail}
                />
              </div>
              <div className='flex justify-between'>
                <label htmlFor='password'>Password</label>
                <input
                  type='password'
                  id='password'
                  className='rounded text-black indent-2'
                  onChange={handleSetPassword}
                />
              </div>
              <div className='flex flex-col gap-2'>
                <p>Roles</p>
                <div className='flex gap-32'>
                  <div className='flex flex-col'>
                    <div className='flex items-center gap-2'>
                      <input
                        type='checkbox'
                        id='products-read'
                        name='roles'
                        value='products-read'
                        onChange={handleCheckbox}
                        defaultChecked={checkRoles.productsRead()}
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
                        defaultChecked={checkRoles.productsWrite()}
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
                        defaultChecked={checkRoles.ordersRead()}
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
                        defaultChecked={checkRoles.ordersWrite()}
                      />
                      <label htmlFor='orders-write'>Orders - Write</label>
                    </div>
                  </div>
                  <div className='flex flex-col'>
                    <div className='flex items-center gap-2'>
                      <input
                        type='checkbox'
                        id='users-read'
                        name='roles'
                        value='users-read'
                        onChange={handleCheckbox}
                        defaultChecked={checkRoles.usersRead()}
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
                        defaultChecked={checkRoles.usersWrite()}
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
                        defaultChecked={checkRoles.adminsRead()}
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
                        defaultChecked={checkRoles.adminsWrite()}
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
          </div>
        )}
      </div>
    </div>
  );
};

export default EditAdmin;
