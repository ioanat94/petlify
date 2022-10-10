import Navbar from 'components/Navbar/Navbar';
import SideNav from 'components/SideNav/SideNav';
import ProductList from 'components/ProductList/ProductList';
import Footer from 'components/Footer/Footer';
import Searchbar from 'components/Searchbar/Searchbar';

const Home = () => {
  return (
    <div>
      <Navbar />
      <div className='flex p-16 gap-20 min-h-[calc(100vh-128px)]'>
        <SideNav />
        <div className='flex flex-col gap-10'>
          <Searchbar />
          <ProductList />
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Home;
