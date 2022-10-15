import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from 'redux/hooks';
import { fetchOrdersThunk } from 'redux/services/order.service';
import { Order } from 'redux/slices/ordersSlice';
import { RootState } from 'redux/store';

const RecentOrders = () => {
  const { orders, adminAuth } = useAppSelector((state: RootState) => state);
  const allOrders = orders.allOrders.slice(0, 5);
  const token = adminAuth.adminToken;

  const dispatch = useAppDispatch();
  const query = '';

  useEffect(() => {
    dispatch(fetchOrdersThunk({ token, query }));
  }, [dispatch, token]);

  const tableHeaders = [
    'Contents',
    'User',
    'Date',
    'Address',
    'Value',
    'Status',
  ];

  const handleRenderHeaders = (tableHeaders: string[]) => {
    return tableHeaders.map((header) => <td key={header}>{header}</td>);
  };

  const handleRenderRows = (orders: Order[]) => {
    return orders.map((order) => (
      <tr key={order._id} className='h-16'>
        <td>
          <ul>
            {order.products.map((product) => (
              <li className='w-24 text-ellipsis overflow-hidden'>{product}</li>
            ))}
          </ul>
        </td>
        <td>
          <p className='w-24 text-ellipsis overflow-hidden'>{order.user}</p>
        </td>
        <td>{order.date.toString().substring(0, 10)}</td>
        <td className='w-40'>{order.address}</td>
        <td>{order.value}€</td>
        <td>{order.status[0].toUpperCase() + order.status.substring(1)}</td>
      </tr>
    ));
  };

  return (
    <div className='flex flex-col gap-4'>
      <p className='text-xl font-semibold'>Recent Orders</p>
      <table className='w-[calc((100vw-500px)/2)]'>
        <thead>
          <tr>{handleRenderHeaders(tableHeaders)}</tr>
        </thead>
        <tbody>{handleRenderRows(allOrders)}</tbody>
      </table>
    </div>
  );
};
export default RecentOrders;
