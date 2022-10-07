import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { useAppDispatch, useAppSelector } from 'redux/hooks';
import { createOrderThunk } from 'redux/services/order.service';
import { emptyCart, setPaid } from 'redux/slices/cartSlice';
import { RootState } from 'redux/store';
import PaypalButton from 'components/PaypalButton/PaypalButton';

const CartForm = () => {
  const user = useAppSelector((state: RootState) => state.auth.loggedInUser);
  const items = useAppSelector((state: RootState) => state.cart.items);
  const paid = useAppSelector((state: RootState) => state.cart.paid);

  const [cash, setCash] = useState(false);
  const [totalPrice, setTotalPrice] = useState(0);

  useEffect(() => {
    let cartTotal = 0;
    items.map((item) => {
      return (cartTotal += item.price);
    });
    setTotalPrice(cartTotal);
  }, [items]);

  const [address, setAddress] = useState({
    street: '',
    postal: '',
    city: '',
    country: '',
  });

  let productIds: any[] = [];
  items.map((item) => productIds.push(item.id));

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleSetPaypal = () => {
    dispatch(setPaid(!paid));
  };

  const handleSetCash = (e: React.MouseEvent<HTMLElement>) => {
    e.preventDefault();
    setCash(!cash);
    dispatch(setPaid(!paid));
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
    dispatch(emptyCart());
    navigate(`/users/${user._id}`);
  };

  return (
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
                cash ? 'bg-mainBlue text-white' : 'bg-white text-mainBlue'
              }`}
            >
              Cash on delivery
            </button>
            <PaypalButton
              totalPrice={totalPrice}
              handleSetPaypal={handleSetPaypal}
            />
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
  );
};

export default CartForm;
