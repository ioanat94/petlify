import Navbar from 'components/Navbar/Navbar';
import SideNav from 'components/SideNav/SideNav';
import ProductList from 'components/ProductList/ProductList';
import Footer from 'components/Footer/Footer';

const Home = () => {
  return (
    <div>
      <Navbar />
      <div className='flex p-16 gap-20 min-h-[calc(100vh-128px)]'>
        <SideNav />
        <ProductList />
      </div>
      <Footer />
    </div>
  );
};

export default Home;
