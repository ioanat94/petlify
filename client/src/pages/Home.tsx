import Navbar from 'components/Navbar/Navbar';
import SideNav from 'components/SideNav/SideNav';
import ProductList from 'components/ProductList/ProductList';
import Footer from 'components/Footer/Footer';
import ImageCarousel from 'components/ImageCarousel/ImageCarousel';
import MobileSidenav from 'components/MobileSidenav/MobileSidenav';

const Home = () => {
  return (
    <div>
      <Navbar />
      <div className='flex px-4 lg:px-16 py-4 lg:py-10 lg:gap-20 min-h-[calc(100vh-128px)]'>
        <div className='flex flex-col gap-10 items-center h-screen sticky top-28'>
          <div className='hidden lg:block'>
            <SideNav />
          </div>
          <img
            src={require('../assets/sideimg.png')}
            alt=''
            className='relative -left-4 hidden lg:block'
          />
          <img
            src={require('../assets/paypal.png')}
            alt=''
            width='100px'
            className='hidden lg:block'
          />
          <img
            src={require('../assets/cash-on-delivery.png')}
            alt=''
            width='100px'
            className='hidden lg:block'
          />
          <img
            src={require('../assets/posti.png')}
            alt=''
            width='100px'
            className='hidden lg:block'
          />
        </div>
        <div className='flex flex-col items-center gap-4 lg:gap-10 w-screen'>
          <ImageCarousel />
          <MobileSidenav />
          <ProductList />
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Home;
