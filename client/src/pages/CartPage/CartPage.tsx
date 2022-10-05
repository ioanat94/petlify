import React, { useEffect, useState } from 'react';
import {
  PayPalButtons,
  PayPalScriptProvider,
  usePayPalScriptReducer,
} from '@paypal/react-paypal-js';

import { useAppDispatch, useAppSelector } from 'redux/hooks';
import { CartProduct, removeFromCart } from 'redux/slices/cartSlice';
import { RootState } from 'redux/store';
import Footer from 'components/Footer/Footer';
import Navbar from 'components/Navbar/Navbar';
import { createOrderThunk } from 'redux/services/order.service';
import { useNavigate } from 'react-router-dom';

const CartPage = () => {
  const items = useAppSelector((state: RootState) => state.cart.items);
  const user = useAppSelector((state: RootState) => state.auth.loggedInUser);

  let productIds: any[] = [];
  items.map((item) => productIds.push(item.id));

  const [cash, setCash] = useState(false);
  const [paid, setPaid] = useState(false);

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
  const navigate = useNavigate();

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

  const handleSetCash = (e: React.MouseEvent<HTMLElement>) => {
    e.preventDefault();
    setCash(!cash);
    setPaid(!paid);
  };

  const currency = 'EUR';

  const ButtonWrapper = ({
    currency,
    showSpinner,
  }: {
    currency: string;
    showSpinner: boolean;
  }) => {
    const [{ options, isPending }, dispatch] = usePayPalScriptReducer();

    useEffect(() => {
      dispatch({
        type: 'resetOptions',
        value: {
          ...options,
          currency: currency,
        },
      });
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [currency, showSpinner]);

    return (
      <>
        {showSpinner && isPending && <div className='spinner' />}
        <PayPalButtons
          style={{ layout: 'vertical' }}
          disabled={false}
          fundingSource={'paypal'}
          createOrder={(data, actions) => {
            return actions.order.create({
              purchase_units: [
                {
                  amount: {
                    value: totalPrice.toString(),
                  },
                },
              ],
            });
          }}
          onApprove={(data, actions) => {
            return actions.order!.capture().then((details) => {
              setPaid(true);
            });
          }}
        />
      </>
    );
  };

  const handlePlaceOrder = (e: React.FormEvent<HTMLElement>) => {
    e.preventDefault();

    const newOrder = {
      products: productIds,
      user: user._id,
      date: new Date(),
      address: `${address.street}, ${address.postal} ${address.city}, ${address.country}`,
      value: totalPrice,
      status: 'processing',
    };

    dispatch(createOrderThunk(newOrder));
    navigate(`/users/${user._id}`);
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
            <form action='' onSubmit={handlePlaceOrder} className='flex gap-20'>
              <div className='flex flex-col gap-2'>
                <label htmlFor='street' className='font-semibold'>
                  Street and number
                </label>
                <input
                  required
                  type='text'
                  id='street'
                  className='border border-mainBlue w-96 rounded indent-1'
                  onChange={(e) => handleSetStreet(e)}
                />
                <label htmlFor='postal' className='font-semibold'>
                  Postal code
                </label>
                <input
                  required
                  type='text'
                  id='postal'
                  className='border border-mainBlue w-96 rounded indent-1'
                  onChange={(e) => handleSetPostal(e)}
                />
                <label htmlFor='city' className='font-semibold'>
                  City
                </label>
                <input
                  required
                  type='text'
                  id='city'
                  className='border border-mainBlue w-96 rounded indent-1'
                  onChange={(e) => handleSetCity(e)}
                />
                <label htmlFor='country' className='font-semibold'>
                  Country
                </label>
                <input
                  required
                  type='text'
                  id='country'
                  className='border border-mainBlue w-96 rounded indent-1'
                  onChange={(e) => handleSetCountry(e)}
                />
              </div>
              <div className='flex flex-col gap-10 self-center'>
                <p className='text-lg font-bold'>
                  Total: <span>{totalPrice.toFixed(2)}€</span>
                </p>
                <div className='flex flex-col gap-2'>
                  <p className='font-semibold'>Choose payment method:</p>
                  <div className='flex gap-4'>
                    <button
                      onClick={handleSetCash}
                      className={`w-max py-1 px-3 border-2 border-mainBlue font-semibold rounded ${
                        cash
                          ? 'bg-mainBlue text-white'
                          : 'bg-white text-mainBlue'
                      }`}
                    >
                      Cash on delivery
                    </button>
                    <div className='pt-1'>
                      <PayPalScriptProvider
                        options={{
                          'client-id':
                            'ATba9YMUOGj85RMZlI2u9oHbhEgJc-hLy_xQAdzqeGZAbD28Wh6B1kZiMAq2kwmo6youM6TP5-FjgNhp',
                          components: 'buttons',
                          currency: 'EUR',
                        }}
                      >
                        <ButtonWrapper
                          currency={currency}
                          showSpinner={false}
                        />
                      </PayPalScriptProvider>
                    </div>
                  </div>
                </div>
                <button
                  className='w-max py-1 px-3 border-2 border-mainBlue text-mainBlue font-semibold rounded hover:bg-mainBlue hover:text-white disabled:bg-slate-50 disabled:text-slate-500 disabled:border-slate-200'
                  disabled={!paid}
                  type='submit'
                >
                  Place order
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      <Footer />
    </>
  );
};
export default CartPage;
