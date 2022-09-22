import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from 'redux/hooks';
import {
  deleteUserThunk,
  fetchUsersThunk,
  updateUserThunk,
  User,
} from 'redux/slices/usersSlice';
import { RootState } from 'redux/store';

const UsersTable = () => {
  const users = useAppSelector((state: RootState) => state.users.allUsers);

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchUsersThunk());
  }, [dispatch]);

  const handleDelete = (userId: string) => {
    dispatch(deleteUserThunk(userId));
    window.location.reload();
  };

  const handleBan = (userId: string, isBanned: boolean) => {
    const isUserBanned = !isBanned;
    const updatedUser = {
      isBanned: isUserBanned,
    };

    const data = { userId: userId, updatedUser: updatedUser };
    dispatch(updateUserThunk(data));
    window.location.reload();
  };

  const handleRenderRows = (users: User[]) => {
    return users.map((user) => (
      <tr key={user._id}>
        <td>{user._id}</td>
        <td>{user.firstname}</td>
        <td>{user.lastname}</td>
        <td>{user.email}</td>
        <td>{user.isBanned ? 'Yes' : 'No'}</td>
        <td>
          <button onClick={() => handleBan(user._id!, user.isBanned)}>
            {user.isBanned ? 'Unban' : 'Ban'}
          </button>
          <button onClick={() => handleDelete(user._id!)}>Delete</button>
        </td>
      </tr>
    ));
  };

  return (
    <table>
      <thead>
        <tr>
          <td>ID</td>
          <td>First Name</td>
          <td>Last Name</td>
          <td>Email</td>
          <td>Banned</td>
          <td>Actions</td>
        </tr>
      </thead>
      <tbody>{handleRenderRows(users)}</tbody>
    </table>
  );
};
export default UsersTable;
