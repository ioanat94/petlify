import { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';

import { RootState } from 'redux/store';
import { useAppDispatch, useAppSelector } from 'redux/hooks';
import { fetchOrderThunk } from 'redux/services/order.service';
import Footer from 'components/Footer/Footer';
import Navbar from 'components/Navbar/Navbar';
import SomethingWentWrong from 'components/SomethingWentWrong/SomethingWentWrong';

const OrderPage = () => {
  const user = useAppSelector((state: RootState) => state.auth.loggedInUser);
  const order = useAppSelector((state: RootState) => state.orders.singleOrder);

  const dispatch = useAppDispatch();
  const params = useParams();
  const orderId: string | undefined = params.orderId!;

  useEffect(() => {
    dispatch(fetchOrderThunk(orderId));
  }, [dispatch, orderId]);

  const handleRenderProductIds = () => {
    return order.products.map((product) => (
      <li className='hover:underline' key={product}>
        <Link to={`/products/${product}`}>{product}</Link>
      </li>
    ));
  };

  return (
    <div>
      <Navbar />
      {order.user === user._id ? (
        <div className='flex flex-col gap-20 items-center min-h-[calc(100vh-128px)] pt-20'>
          <p className='text-3xl font-bold text-mainBlue'>Order #{order._id}</p>
          <div className='flex items-center gap-20'>
            <div className='flex flex-col gap-2'>
              <p className='text-lg text-mainBlue font-semibold'>Order Date</p>
              <p>{order.date.toString().substring(0, 10)}</p>
              <p className='text-lg text-mainBlue font-semibold'>Contents</p>
              <ul>{handleRenderProductIds()}</ul>
            </div>
            <div className='flex flex-col gap-2 text-right'>
              <p className='text-lg text-mainBlue font-semibold'>
                Delivery address
              </p>
              <p>{order.address}</p>
              <p className='text-lg text-mainBlue font-semibold'>Value</p>
              <p className='font-semibold'>{order.value}€</p>
            </div>
          </div>
          <div className='flex flex-col gap-10 items-center'>
            <p className='text-lg text-mainBlue font-semibold'>Status</p>
            <div className='flex gap-20'>
              <img
                src={require('../../assets/processing.png')}
                alt=''
                width='75px'
                className={`${
                  order.status === 'processing' ? 'animate-pulse' : ''
                }`}
              />
              <img
                src={require('../../assets/confirmed.png')}
                alt=''
                width='75px'
                className={`${
                  order.status === 'processing' ? 'filter grayscale' : ''
                } ${order.status === 'confirmed' ? 'animate-pulse' : ''}`}
              />
              <img
                src={require('../../assets/shipping.png')}
                alt=''
                width='75px'
                className={`${
                  order.status === 'processing' || order.status === 'confirmed'
                    ? 'filter grayscale'
                    : ''
                } ${order.status === 'shipping' ? 'animate-pulse' : ''}`}
              />
              <img
                src={require('../../assets/delivered.png')}
                alt=''
                width='75px'
                className={`${
                  order.status !== 'delivered' ? 'filter grayscale' : ''
                }`}
              />
            </div>
          </div>
        </div>
      ) : (
        <SomethingWentWrong />
      )}
      <Footer />
    </div>
  );
};
export default OrderPage;
