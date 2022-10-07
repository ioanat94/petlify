import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

import { useAppDispatch, useAppSelector } from 'redux/hooks';
import {
  deleteOrderThunk,
  fetchOrdersThunk,
  updateOrderThunk,
} from 'redux/services/order.service';
import { Order } from 'redux/slices/ordersSlice';
import { RootState } from 'redux/store';

const OrdersTable = () => {
  const orders = useAppSelector((state: RootState) => state.orders.allOrders);
  const token = useAppSelector(
    (state: RootState) => state.adminAuth.adminToken
  );
  const loggedInAdmin = useAppSelector(
    (state: RootState) => state.adminAuth.loggedInAdmin
  );

  const tableHeaders = [
    'ID',
    'Contents',
    'User',
    'Date',
    'Address',
    'Value',
    'Status',
  ];

  const location = useLocation();
  const query = location.search;

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchOrdersThunk({ token, query }));
  }, [dispatch, token, query]);

  const handleDelete = (orderId: string) => {
    dispatch(deleteOrderThunk(orderId));
  };

  const handleAdvance = (order: Order) => {
    let newStatus =
      order.status === 'processing'
        ? 'confirmed'
        : order.status === 'confirmed'
        ? 'shipping'
        : 'delivered';

    const updatedOrder = {
      status: newStatus,
    };

    const data = { orderId: order._id!, updatedOrder: updatedOrder };
    dispatch(updateOrderThunk(data));
  };

  const checkWritePerms = () => {
    return loggedInAdmin.roles.includes('orders-write');
  };

  const handleRenderHeaders = (tableHeaders: string[]) => {
    return tableHeaders.map((header) => <td key={header}>{header}</td>);
  };

  const handleRenderRows = (orders: Order[]) => {
    return orders.map((order) => (
      <tr key={order._id} className='h-28'>
        <td>{order._id}</td>
        <td>
          <ul>
            {order.products.map((product) => (
              <li>{product}</li>
            ))}
          </ul>
        </td>
        <td>{order.user}</td>
        <td>{order.date.toString().substring(0, 10)}</td>
        <td className='w-40'>{order.address}</td>
        <td>{order.value}€</td>
        <td>{order.status[0].toUpperCase() + order.status.substring(1)}</td>
        {checkWritePerms() && (
          <td className='flex gap-2 pt-11'>
            {order.status !== 'delivered' && (
              <button onClick={() => handleAdvance(order)}>
                <img src={require('assets/advance.png')} alt='' width='24px' />
              </button>
            )}
            <button onClick={() => handleDelete(order._id!)}>
              <img src={require('assets/delete.png')} alt='' width='24px' />
            </button>
          </td>
        )}
      </tr>
    ));
  };

  return (
    <table className='min-w-[1000px]'>
      <thead>
        <tr>{handleRenderHeaders(tableHeaders)}</tr>
      </thead>
      <tbody>{handleRenderRows(orders)}</tbody>
    </table>
  );
};
export default OrdersTable;
