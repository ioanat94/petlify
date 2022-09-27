import { useEffect } from 'react';

import { useAppDispatch, useAppSelector } from 'redux/hooks';
import {
  deleteUserThunk,
  fetchUsersThunk,
  updateUserThunk,
} from 'redux/services/user.service';
import { User } from 'redux/slices/usersSlice';
import { RootState } from 'redux/store';

const UsersTable = () => {
  const users = useAppSelector((state: RootState) => state.users.allUsers);

  const tableHeaders = [
    'ID',
    'Image',
    'First Name',
    'Last Name',
    'Email',
    'Banned',
    'Actions',
  ];

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchUsersThunk());
  }, [dispatch]);

  const handleDelete = (userId: string) => {
    dispatch(deleteUserThunk(userId));
  };

  const handleBan = (userId: string, isBanned: boolean) => {
    const isUserBanned = !isBanned;
    const updatedUser = {
      isBanned: isUserBanned,
    };

    const data = { userId: userId, updatedUser: updatedUser };
    dispatch(updateUserThunk(data));
  };

  const handleRenderHeaders = (tableHeaders: string[]) => {
    return tableHeaders.map((header) => <td key={header}>{header}</td>);
  };

  const handleRenderRows = (users: User[]) => {
    return users.map((user) => (
      <tr key={user._id} className='h-28'>
        <td>{user._id}</td>
        <td>
          <img src={user.image} alt='' width='90px' />
        </td>
        <td>{user.firstname}</td>
        <td>{user.lastname}</td>
        <td>{user.email}</td>
        <td>{user.isBanned ? 'Yes' : 'No'}</td>
        <td className='flex gap-2 pt-11'>
          <button onClick={() => handleBan(user._id!, user.isBanned)}>
            {user.isBanned ? (
              <p className='text-green-500'>Unban</p>
            ) : (
              <p className='text-red-500'>Ban</p>
            )}
          </button>
          <button onClick={() => handleDelete(user._id!)}>
            <img src={require('assets/delete.png')} alt='' width='24px' />
          </button>
        </td>
      </tr>
    ));
  };

  return (
    <table className='min-w-[1000px]'>
      <thead>
        <tr>{handleRenderHeaders(tableHeaders)}</tr>
      </thead>
      <tbody>{handleRenderRows(users)}</tbody>
    </table>
  );
};
export default UsersTable;
