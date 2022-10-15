import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from 'redux/hooks';
import { fetchUsersThunk } from 'redux/services/user.service';
import { User } from 'redux/slices/usersSlice';
import { RootState } from 'redux/store';

const RecentUsers = () => {
  const { users, adminAuth } = useAppSelector((state: RootState) => state);
  const allUsers = users.allUsers.slice(0, 5);
  const token = adminAuth.adminToken;

  const dispatch = useAppDispatch();
  const query = '';

  useEffect(() => {
    dispatch(fetchUsersThunk({ token, query }));
  }, [dispatch, token]);

  const tableHeaders = ['Image', 'First Name', 'Last Name', 'Email', 'Banned'];

  const handleRenderHeaders = (tableHeaders: string[]) => {
    return tableHeaders.map((header) => <td key={header}>{header}</td>);
  };

  const handleRenderRows = (users: User[]) => {
    return users.map((user) => (
      <tr key={user._id} className='h-16'>
        <td>
          <img src={user.image} alt='' width='45px' />
        </td>
        <td>{user.firstname}</td>
        <td>{user.lastname}</td>
        <td>{user.email}</td>
        <td>{user.isBanned ? 'Yes' : 'No'}</td>
      </tr>
    ));
  };

  return (
    <div className='flex flex-col gap-4'>
      <p className='text-xl font-semibold'>Recent Users</p>
      <table className='w-[calc((100vw-500px)/2)]'>
        <thead>
          <tr>{handleRenderHeaders(tableHeaders)}</tr>
        </thead>
        <tbody>{handleRenderRows(allUsers)}</tbody>
      </table>
    </div>
  );
};
export default RecentUsers;
