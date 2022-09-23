import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from 'redux/hooks';
import { fetchUserThunk } from 'redux/services/user.service';
import { RootState } from 'redux/store';

const User = () => {
  const user = useAppSelector((state: RootState) => state.users.singleUser);

  const dispatch = useAppDispatch();
  const params = useParams();
  const userId: string | undefined = params.userId!;

  useEffect(() => {
    dispatch(fetchUserThunk(userId));
  }, [dispatch, userId]);

  return (
    <div>
      <p>{user.firstname}</p>
      <p>{user.lastname}</p>
      <p>{user.email}</p>
      {user.isBanned && <p>BANNED</p>}
    </div>
  );
};
export default User;
