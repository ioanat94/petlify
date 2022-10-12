import { useEffect } from 'react';
import { Link } from 'react-router-dom';

import { useAppDispatch, useAppSelector } from 'redux/hooks';
import { fetchOrdersThunk } from 'redux/services/order.service';
import { RootState } from 'redux/store';

const UserOrders = ({ userId, token }: { userId: string; token: string }) => {
  const orders = useAppSelector((state: RootState) => state.orders.allOrders);

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchOrdersThunk({ query: userId }));
  }, [dispatch, userId, token]);

  const handleRenderOrders = () => {
    return orders.map((order) => (
      <div className='flex flex-col gap-4 md:flex-row md:gap-0 justify-between items-center border-2 border-mainBlue rounded-lg py-4 px-4 md:px-8'>
        <div>
          <p className='font-semibold'>
            Order ID: <span className='font-normal'>{order._id}</span>
          </p>
          <p className='font-semibold'>
            Date:{' '}
            <span className='font-normal'>
              {order.date.toString().substring(0, 10)}
            </span>
          </p>
          <p className='font-semibold'>
            Status:{' '}
            <span className='font-normal'>
              {order.status[0].toUpperCase() + order.status.substring(1)}
            </span>
          </p>
          <p className='font-semibold'>
            Value: <span className='font-normal'>{order.value}€</span>
          </p>
        </div>
        <Link to={`/orders/${order._id}`}>
          <button className='flex items-center gap-4 text-mainBlue font-semibold border-2 border-mainBlue rounded-lg px-4 py-2 h-max'>
            View Order{' '}
            <img src={require('../../assets/open.png')} alt='' width='20px' />
          </button>
        </Link>
      </div>
    ));
  };

  return (
    <div className='max-w-[600px] flex flex-col gap-4 px-2 md:px-0 pb-10 md:pb-20'>
      <p className='text-mainBlue text-xl font-semibold'>My Orders</p>
      <div className='flex flex-col gap-4'>{handleRenderOrders()}</div>
    </div>
  );
};
export default UserOrders;
