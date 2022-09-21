import { Link } from 'react-router-dom';

const Admin = () => {
  return (
    <>
      <div>Admin</div>
      <Link to='/admin/products'>Manage products</Link>
    </>
  );
};

export default Admin;
