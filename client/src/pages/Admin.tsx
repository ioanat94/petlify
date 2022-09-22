import { Link } from 'react-router-dom';

const Admin = () => {
  return (
    <>
      <div>Admin</div>
      <Link to='/admin/products'>Manage products</Link>
      <Link to='/admin/users'>Manage users</Link>
    </>
  );
};

export default Admin;
