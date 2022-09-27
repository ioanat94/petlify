import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <div className='flex items-center justify-between px-6 h-16 bg-mainBlue'>
      <Link to='/'>
        <div className='flex items-center gap-4'>
          <img src={require('assets/logo.png')} alt='' className='w-12' />
          <p className='text-2xl text-mainYellow font-medium'>Petlify</p>
        </div>
      </Link>
      <div className='flex items-center gap-4'>
        <img src={require('assets/profilepic.png')} alt='' className='w-8' />
        <img src={require('assets/cart.png')} alt='' className='w-8' />
        <button className='text-mainYellow font-medium'>LOG OUT</button>
      </div>
    </div>
  );
};
export default Navbar;
