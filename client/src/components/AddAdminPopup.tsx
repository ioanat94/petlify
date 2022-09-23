import { useState } from 'react';
import { useAppDispatch } from 'redux/hooks';
import { createAdminThunk } from 'redux/slices/adminsSlice';

const AddAdminPopup = () => {
  const [firstname, setFirstName] = useState('');
  const [lastname, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [roles, setRoles] = useState<string[]>([]);

  const dispatch = useAppDispatch();

  const resetState = () => {
    setFirstName('');
    setLastName('');
    setEmail('');
    setPassword('');
    setRoles([]);
  };

  const handleCheckbox = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.checked) {
      setRoles((prevRoles) => [...prevRoles, e.target.value]);
    } else {
      const newRoles = roles.filter((role) => role !== e.target.value);
      setRoles(newRoles);
    }
  };

  const handleSubmit = (e: React.ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();
    const newAdmin = {
      firstname: firstname,
      lastname: lastname,
      email: email,
      password: password,
      roles: roles,
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
      <input
        type='checkbox'
        id='products-read'
        name='roles'
        value='products-read'
        onChange={handleCheckbox}
      />
      <label htmlFor='products-read'>Products - Read</label>
      <input
        type='checkbox'
        id='products-write'
        name='roles'
        value='products-write'
        onChange={handleCheckbox}
      />
      <label htmlFor='products-write'>Products - Write</label>
      <input
        type='checkbox'
        id='users-read'
        name='roles'
        value='users-read'
        onChange={handleCheckbox}
      />
      <label htmlFor='users-read'>Users - Read</label>
      <input
        type='checkbox'
        id='users-write'
        name='roles'
        value='users-write'
        onChange={handleCheckbox}
      />
      <label htmlFor='users-write'>Users - Write</label>
      <input
        type='checkbox'
        id='admins-read'
        name='roles'
        value='admins-read'
        onChange={handleCheckbox}
      />
      <label htmlFor='admins-read'>Admins - Read</label>
      <button type='submit'>Submit</button>
    </form>
  );
};
export default AddAdminPopup;
