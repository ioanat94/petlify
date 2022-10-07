import { useAppSelector } from 'redux/hooks';
import { RootState } from 'redux/store';
import Footer from 'components/Footer/Footer';
import Navbar from 'components/Navbar/Navbar';
import EmptyCart from 'components/EmptyCart/EmptyCart';
import CartTable from 'components/CartTable/CartTable';
import CartForm from 'components/CartForm/CartForm';

const CartPage = () => {
  const items = useAppSelector((state: RootState) => state.cart.items);

  const checkEmptyCart = () => {
    return items.length === 0;
  };

  return (
    <>
      <Navbar />
      {checkEmptyCart() ? (
        <EmptyCart />
      ) : (
        <div className='min-h-[calc(100vh-128px)] pt-16 px-10 flex flex-col gap-10'>
          <CartTable />
          <div className='flex gap-20'>
            <CartForm />
          </div>
        </div>
      )}

      <Footer />
    </>
  );
};
export default CartPage;
