import { useAppDispatch, useAppSelector } from 'redux/hooks';
import { CartProduct, removeFromCart } from 'redux/slices/cartSlice';
import { RootState } from 'redux/store';
import Footer from 'components/Footer/Footer';
import Navbar from 'components/Navbar/Navbar';
import React, { useEffect, useState } from 'react';

const CartPage = () => {
  const items = useAppSelector((state: RootState) => state.cart.items);

  const [totalPrice, setTotalPrice] = useState(0);
  const [address, setAddress] = useState({
    street: '',
    postal: '',
    city: '',
    country: '',
  });

  useEffect(() => {
    let cartTotal = 0;
    items.map((item) => {
      return (cartTotal += item.price);
    });
    setTotalPrice(cartTotal);
  }, [items]);

  const dispatch = useAppDispatch();

  const tableHeaders = ['ID', 'Image', 'Name', 'Size', 'Variant', 'Price', ''];

  const handleRemoveProduct = (id: string) => {
    dispatch(removeFromCart(id));
  };

  const handleSetStreet = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAddress({ ...address, street: e.target.value });
  };

  const handleSetPostal = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAddress({ ...address, postal: e.target.value });
  };

  const handleSetCity = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAddress({ ...address, city: e.target.value });
  };

  const handleSetCountry = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAddress({ ...address, country: e.target.value });
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
          <td>
            <img src={item.image} alt='' width='50px' />
          </td>
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

  const checkEmptyCart = () => {
    return items.length === 0;
  };

  return (
    <>
      <Navbar />
      {checkEmptyCart() ? (
        <div className='min-h-[calc(100vh-128px)] flex flex-col items-center pt-20 gap-10'>
          <img
            src={require('../../assets/empty-cart.webp')}
            alt=''
            width='500px'
          />
          <p className='text-xl font-semibold'>Your Cart is Empty</p>
          <p>Looks like you haven't added anything to your cart yet.</p>
        </div>
      ) : (
        <div className='min-h-[calc(100vh-128px)] pt-16 px-10 flex flex-col gap-10'>
          <table className='w-2/3 min-w-[700px]'>
            <thead>
              <tr>{renderHeaders(tableHeaders)}</tr>
            </thead>
            <tbody>{renderRows(items)}</tbody>
          </table>
          <div className='flex gap-20'>
            <form action='' className='flex flex-col gap-2'>
              <label htmlFor='street' className='font-semibold'>
                Street and number
              </label>
              <input
                type='text'
                id='street'
                className='border border-mainBlue w-96 rounded indent-1'
                onChange={(e) => handleSetStreet(e)}
              />
              <label htmlFor='postal' className='font-semibold'>
                Postal code
              </label>
              <input
                type='text'
                id='postal'
                className='border border-mainBlue w-96 rounded indent-1'
                onChange={(e) => handleSetPostal(e)}
              />
              <label htmlFor='city' className='font-semibold'>
                City
              </label>
              <input
                type='text'
                id='city'
                className='border border-mainBlue w-96 rounded indent-1'
                onChange={(e) => handleSetCity(e)}
              />
              <label htmlFor='country' className='font-semibold'>
                Country
              </label>
              <input
                type='text'
                id='country'
                className='border border-mainBlue w-96 rounded indent-1'
                onChange={(e) => handleSetCountry(e)}
              />
            </form>
            <div className='flex items-center gap-10'>
              <p className='text-lg font-semibold'>
                Total: <span>{totalPrice.toFixed(2)}€</span>
              </p>
              <button className='w-max py-1 px-3 border-2 border-mainBlue text-mainBlue font-semibold rounded transition-all hover:bg-mainBlue hover:text-white'>
                Place order
              </button>
            </div>
          </div>
        </div>
      )}

      <Footer />
    </>
  );
};
export default CartPage;
