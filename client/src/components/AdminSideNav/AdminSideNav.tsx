import { Link } from 'react-router-dom';

const AdminSideNav = () => {
  return (
    <ul className='flex flex-col gap-6 text-white p-10 min-w-[300px] min-h-[calc(100vh-64px)] border-r border-r-gray-600'>
      <li className='flex items-center gap-4'>
        <img src={require('assets/mng-prod.png')} alt='' width='30px' />
        <Link to='/admin/products'>Manage products</Link>
      </li>
      <li className='flex items-center gap-4'>
        <img src={require('assets/mng-user.png')} alt='' width='30px' />
        <Link to='/admin/users'>Manage users</Link>
      </li>
      <li className='flex items-center gap-4'>
        <img src={require('assets/mng-admin.png')} alt='' width='30px' />
        <Link to='/admin/admins'>Manage admins</Link>
      </li>
    </ul>
  );
};
export default AdminSideNav;
