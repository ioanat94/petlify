import { useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useSnackbar } from 'react-simple-snackbar';

import { useAppDispatch, useAppSelector } from 'redux/hooks';
import {
  deleteAdminThunk,
  fetchAdminsThunk,
} from 'redux/services/admin.service';
import { Admin } from 'redux/slices/adminsSlice';
import { RootState } from 'redux/store';

const AdminsTable = () => {
  const { admins, adminAuth } = useAppSelector((state: RootState) => state);
  const allAdmins = admins.allAdmins;
  const token = adminAuth.adminToken;
  const loggedInAdmin = adminAuth.loggedInAdmin;

  const tableHeaders = [
    'ID',
    'First Name',
    'Last Name',
    'Email',
    'Roles',
    'Actions',
  ];

  const options = {
    position: 'top-center',
    style: {
      marginTop: '60px',
      backgroundColor: 'white',
      color: '#0f172a',
      fontFamily: 'Montserrat, sans-serif',
      fontSize: '16px',
      textAlign: 'center',
    },
    closeStyle: {
      color: '#0f172a',
      fontSize: '12px',
    },
  };
  const [openSnackbar] = useSnackbar(options);

  const location = useLocation();
  const query = location.search;

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchAdminsThunk({ token, query }));
  }, [dispatch, token, query]);

  const handleDelete = (adminId: string) => {
    dispatch(deleteAdminThunk(adminId));
    openSnackbar('Admin deleted successfully.');
  };

  const checkWritePerms = () => {
    return loggedInAdmin.roles.includes('admins-write');
  };

  const handleRenderHeaders = (tableHeaders: string[]) => {
    return tableHeaders.map((header) => <td key={header}>{header}</td>);
  };

  const handleRenderRows = (admins: Admin[]) => {
    return admins.length > 0 ? (
      admins.map((admin) => (
        <tr key={admin._id}>
          <td>{admin._id}</td>
          <td>{admin.firstname}</td>
          <td>{admin.lastname}</td>
          <td>{admin.email}</td>
          <td className='py-4'>
            <ul>
              {admin.roles.map((role) => (
                <li>- {role}</li>
              ))}
            </ul>
          </td>
          {checkWritePerms() && (
            <td className='flex gap-2 pt-4'>
              <Link to={`/admin/admins/${admin._id}`}>
                <img src={require('assets/edit.png')} alt='' width='24px' />
              </Link>
              <button onClick={() => handleDelete(admin._id!)}>
                <img src={require('assets/delete.png')} alt='' width='24px' />
              </button>
            </td>
          )}
        </tr>
      ))
    ) : (
      <div className='text-xl font-semibold pt-10'>No admins found.</div>
    );
  };

  return (
    <div className='overflow-auto'>
      <table>
        <thead>
          <tr>{handleRenderHeaders(tableHeaders)}</tr>
        </thead>
        <tbody>{handleRenderRows(allAdmins)}</tbody>
      </table>
    </div>
  );
};
export default AdminsTable;
