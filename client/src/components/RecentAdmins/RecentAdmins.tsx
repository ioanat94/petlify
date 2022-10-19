import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from 'redux/hooks';
import { fetchAdminsThunk } from 'redux/services/admin.service';
import { Admin } from 'redux/slices/adminsSlice';
import { RootState } from 'redux/store';

const RecentAdmins = () => {
  const { admins, adminAuth } = useAppSelector((state: RootState) => state);
  const allAdmins = admins.allAdmins.slice(0, 5);
  const token = adminAuth.adminToken;

  const dispatch = useAppDispatch();
  const query = '';

  useEffect(() => {
    dispatch(fetchAdminsThunk({ token, query }));
  }, [dispatch, token]);

  const tableHeaders = ['First Name', 'Last Name', 'Email', 'Roles'];

  const handleRenderHeaders = (tableHeaders: string[]) => {
    return tableHeaders.map((header) => <td key={header}>{header}</td>);
  };

  const handleRenderRows = (admins: Admin[]) => {
    return admins.map((admin) => (
      <tr key={admin._id}>
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
      </tr>
    ));
  };

  return (
    <div className='flex flex-col gap-4'>
      <p className='text-xl font-semibold'>Recent Admins</p>
      <div className='overflow-auto'>
        <table className='min-w-[700px] w-[calc((100vw-500px)/2)]'>
          <thead>
            <tr>{handleRenderHeaders(tableHeaders)}</tr>
          </thead>
          <tbody>{handleRenderRows(allAdmins)}</tbody>
        </table>
      </div>
    </div>
  );
};
export default RecentAdmins;
