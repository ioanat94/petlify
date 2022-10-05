import { useAppDispatch, useAppSelector } from 'redux/hooks';
import { CartProduct, removeFromCart } from 'redux/slices/cartSlice';
import { RootState } from 'redux/store';
import Footer from 'components/Footer/Footer';
import Navbar from 'components/Navbar/Navbar';
import { useEffect, useState } from 'react';

const CartPage = () => {
  const items = useAppSelector((state: RootState) => state.cart.items);

  const [totalPrice, setTotalPrice] = useState(0);

  useEffect(() => {
    let cartTotal = 0;
    items.map((item) => {
      return (cartTotal += item.price);
    });
    setTotalPrice(cartTotal);
  }, [items]);

  const dispatch = useAppDispatch();

  const tableHeaders = ['ID', 'Name', 'Size', 'Variant', 'Price', ''];

  const handleRemoveProduct = (id: string) => {
    dispatch(removeFromCart(id));
  };

  const renderHeaders = (tableHeaders: string[]) => {
    return tableHeaders.map((header) => {
      return (
        <td key={header} className='font-semibold'>
          {header}
        </td>
      );
    });
  };

  const renderRows = (items: CartProduct[]) => {
    return items.map((item) => {
      return (
        <tr className='h-12' key={item.productId}>
          <td>{item.productId.substring(0, 8)}</td>
          <td>{item.name}</td>
          <td>{item.size}</td>
          <td>{item.variant}</td>
          <td className='font-semibold'>{item.price}€</td>
          <td>
            <button
              onClick={() => handleRemoveProduct(item.productId)}
              className='flex items-center'
            >
              <img
                src={require('../../assets/remove.png')}
                alt=''
                width='24px'
              />
            </button>
          </td>
        </tr>
      );
    });
  };

  return (
    <>
      <Navbar />
      <div className='min-h-[calc(100vh-128px)] pt-16 px-10 flex flex-col gap-10'>
        <table className='w-full min-w-[700px]'>
          <thead>
            <tr>{renderHeaders(tableHeaders)}</tr>
          </thead>
          <tbody>{renderRows(items)}</tbody>
        </table>
        <div className='flex items-center gap-10'>
          <p className='text-lg font-semibold'>
            Total: <span>{totalPrice.toFixed(2)}€</span>
          </p>
          <button className='w-max py-1 px-3 border-2 border-mainBlue text-mainBlue font-semibold rounded transition-all hover:bg-mainBlue hover:text-white'>
            Place order
          </button>
        </div>
      </div>

      <Footer />
    </>
  );
};
export default CartPage;
