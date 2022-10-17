import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useSnackbar } from 'react-simple-snackbar';

import { useAppDispatch, useAppSelector } from 'redux/hooks';
import {
  deleteUserThunk,
  fetchUsersThunk,
  updateUserThunk,
} from 'redux/services/user.service';
import { User } from 'redux/slices/usersSlice';
import { RootState } from 'redux/store';

const UsersTable = () => {
  const { users, adminAuth } = useAppSelector((state: RootState) => state);
  const allUsers = users.allUsers;
  const isLoading = users.isLoading;
  const token = adminAuth.adminToken;
  const loggedInAdmin = adminAuth.loggedInAdmin;

  const tableHeaders = [
    'ID',
    'Image',
    'First Name',
    'Last Name',
    'Email',
    'Banned',
    'Actions',
  ];

  const options = {
    position: 'top-center',
    style: {
      marginTop: '110px',
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
    dispatch(fetchUsersThunk({ token, query }));
  }, [dispatch, token, query]);

  const handleDelete = (userId: string) => {
    dispatch(deleteUserThunk(userId));
    openSnackbar('User deleted successfully.');
  };

  const handleBan = (userId: string, isBanned: boolean) => {
    const isUserBanned = !isBanned;
    const updatedUser = {
      isBanned: isUserBanned,
    };

    const data = { userId: userId, updatedUser: updatedUser };
    dispatch(updateUserThunk(data));
    openSnackbar(`User ${isUserBanned ? 'banned' : 'unbanned'} successfully.`);
  };

  const checkWritePerms = () => {
    return loggedInAdmin.roles.includes('users-write');
  };

  const handleRenderHeaders = (tableHeaders: string[]) => {
    return tableHeaders.map((header) => <td key={header}>{header}</td>);
  };

  const handleRenderRows = (users: User[]) => {
    return users.length > 0 ? (
      users.map((user) => (
        <tr key={user._id} className='h-28'>
          <td>{user._id}</td>
          <td>
            <img src={user.image} alt='' width='90px' />
          </td>
          <td>{user.firstname}</td>
          <td>{user.lastname}</td>
          <td>{user.email}</td>
          <td>{user.isBanned ? 'Yes' : 'No'}</td>
          {checkWritePerms() && (
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
          )}
        </tr>
      ))
    ) : (
      <div className='text-xl font-semibold pt-10'>No users found.</div>
    );
  };

  return (
    <div className='overflow-auto'>
      <table className='min-w-[1000px]'>
        <thead>
          <tr>{handleRenderHeaders(tableHeaders)}</tr>
        </thead>
        <tbody>{isLoading ? '' : handleRenderRows(allUsers)}</tbody>
      </table>
    </div>
  );
};
export default UsersTable;
