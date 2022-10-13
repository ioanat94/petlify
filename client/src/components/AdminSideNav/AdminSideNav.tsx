import { Link } from 'react-router-dom';

const AdminSideNav = () => {
  return (
    <ul className='flex justify-between md:flex-col md:justify-start md:gap-6 text-white p-10 md:min-w-[300px] md:min-h-[calc(100vh-64px)] border-r border-r-gray-600'>
      <li>
        <Link to='/admin/products' className='flex items-center gap-4'>
          <img src={require('assets/mng-prod.png')} alt='' width='30px' />
          <p className='hidden md:block'>Manage products</p>
        </Link>
      </li>
      <li>
        <Link to='/admin/orders' className='flex items-center gap-4'>
          <img src={require('assets/mng-orders.png')} alt='' width='30px' />
          <p className='hidden md:block'>Manage orders</p>
        </Link>
      </li>
      <li>
        <Link to='/admin/users' className='flex items-center gap-4'>
          <img src={require('assets/mng-user.png')} alt='' width='30px' />
          <p className='hidden md:block'>Manage users</p>
        </Link>
      </li>
      <li>
        <Link to='/admin/admins' className='flex items-center gap-4'>
          <img src={require('assets/mng-admin.png')} alt='' width='30px' />
          <p className='hidden md:block'>Manage admins</p>
        </Link>
      </li>
    </ul>
  );
};
export default AdminSideNav;
