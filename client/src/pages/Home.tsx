import Navbar from 'components/Navbar/Navbar';
import SideNav from 'components/SideNav/SideNav';
import ProductList from 'components/ProductList/ProductList';
import Footer from 'components/Footer/Footer';
import ImageCarousel from 'components/ImageCarousel/ImageCarousel';

const Home = () => {
  return (
    <div>
      <Navbar />
      <div className='flex px-16 py-10 gap-20 min-h-[calc(100vh-128px)]'>
        <div className='flex flex-col gap-10 items-center h-screen sticky top-28'>
          <SideNav />
          <img
            src={require('../assets/sideimg.png')}
            alt=''
            className='relative -left-4'
          />
          <img src={require('../assets/paypal.png')} alt='' width='100px' />
          <img
            src={require('../assets/cash-on-delivery.png')}
            alt=''
            width='100px'
          />
          <img src={require('../assets/posti.png')} alt='' width='100px' />
        </div>
        <div className='flex flex-col items-center gap-10'>
          <ImageCarousel />
          <ProductList />
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Home;
