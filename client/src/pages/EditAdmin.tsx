import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from 'redux/hooks';
import { fetchAdminThunk, updateAdminThunk } from 'redux/slices/adminsSlice';
import { RootState } from 'redux/store';

const EditAdmin = () => {
  const admin = useAppSelector((state: RootState) => state.admins.singleAdmin);
  const isLoading = useAppSelector(
    (state: RootState) => state.admins.isLoading
  );

  const [firstname, setFirstName] = useState('');
  const [lastname, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('');

  const dispatch = useAppDispatch();
  const params = useParams();
  const adminId: string | undefined = params.adminId!;

  useEffect(() => {
    dispatch(fetchAdminThunk(adminId));
  }, [dispatch, adminId]);

  const handleSubmit = (e: React.ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();
    const updatedAdmin = {
      firstname: firstname,
      lastname: lastname,
      email: email,
      password: password,
      role: role,
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
            onChange={(e) => setFirstName(e.target.value)}
          />
          <label htmlFor='lastname'>Last Name</label>
          <input
            type='text'
            id='lastname'
            required
            defaultValue={admin.lastname}
            onChange={(e) => setLastName(e.target.value)}
          />
          <label htmlFor='email'>Email</label>
          <input
            type='email'
            id='email'
            required
            defaultValue={admin.email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <label htmlFor='password'>Password</label>
          <input
            type='password'
            id='password'
            required
            defaultValue={admin.password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <label htmlFor='role'>Role</label>
          <input
            type='role'
            id='role'
            required
            defaultValue={admin.role}
            onChange={(e) => setRole(e.target.value)}
          />
          <button type='submit'>Submit</button>
        </form>
      )}
    </div>
  );
};

export default EditAdmin;
