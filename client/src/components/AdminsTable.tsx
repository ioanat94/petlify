import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from 'redux/hooks';
import {
  Admin,
  deleteAdminThunk,
  fetchAdminsThunk,
} from 'redux/slices/adminsSlice';
import { RootState } from 'redux/store';

const AdminsTable = () => {
  const admins = useAppSelector((state: RootState) => state.admins.allAdmins);

  const tableHeaders = [
    'ID',
    'First Name',
    'Last Name',
    'Email',
    'Roles',
    'Actions',
  ];

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchAdminsThunk());
  }, [dispatch]);

  const handleDelete = (adminId: string) => {
    dispatch(deleteAdminThunk(adminId));
  };

  const handleRenderHeaders = (tableHeaders: string[]) => {
    return tableHeaders.map((header) => <td key={header}>{header}</td>);
  };

  const handleRenderRows = (admins: Admin[]) => {
    return admins.map((admin) => (
      <tr key={admin._id}>
        <td>{admin._id}</td>
        <td>{admin.firstname}</td>
        <td>{admin.lastname}</td>
        <td>{admin.email}</td>
        <td>
          <ul>
            {admin.roles.map((role) => (
              <li>{role}</li>
            ))}
          </ul>
        </td>
        <td>
          <Link to={`/admin/admins/${admin._id}`}>Edit</Link>
          <button onClick={() => handleDelete(admin._id!)}>Delete</button>
        </td>
      </tr>
    ));
  };

  return (
    <table>
      <thead>
        <tr>{handleRenderHeaders(tableHeaders)}</tr>
      </thead>
      <tbody>{handleRenderRows(admins)}</tbody>
    </table>
  );
};
export default AdminsTable;
