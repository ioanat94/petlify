import { useState } from 'react';
import { useAppDispatch } from 'redux/hooks';
import { createAdminThunk } from 'redux/slices/adminsSlice';

const AddAdminPopup = () => {
  const [firstname, setFirstName] = useState('');
  const [lastname, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('');

  const dispatch = useAppDispatch();

  const resetState = () => {
    setFirstName('');
    setLastName('');
    setEmail('');
    setPassword('');
    setRole('');
  };

  const handleSubmit = (e: React.ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();
    const newAdmin = {
      firstname: firstname,
      lastname: lastname,
      email: email,
      password: password,
      role: role,
    };
    dispatch(createAdminThunk(newAdmin));
    e.target.reset();
    resetState();
  };

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor='firstname'>First Name</label>
      <input
        type='text'
        id='firstname'
        required
        onChange={(e) => setFirstName(e.target.value)}
      />
      <label htmlFor='lastname'>Last Name</label>
      <input
        type='text'
        id='lastname'
        required
        onChange={(e) => setLastName(e.target.value)}
      />
      <label htmlFor='email'>Email</label>
      <input
        type='email'
        id='email'
        required
        onChange={(e) => setEmail(e.target.value)}
      />
      <label htmlFor='password'>Password</label>
      <input
        type='password'
        id='password'
        required
        onChange={(e) => setPassword(e.target.value)}
      />
      <label htmlFor='role'>Role</label>
      <input
        type='role'
        id='role'
        required
        onChange={(e) => setRole(e.target.value)}
      />
      <button type='submit'>Submit</button>
    </form>
  );
};
export default AddAdminPopup;
