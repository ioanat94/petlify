import { useAppDispatch, useAppSelector } from 'redux/hooks';
import { CartProduct, removeFromCart } from 'redux/slices/cartSlice';
import { RootState } from 'redux/store';

const CartTable = () => {
  const items = useAppSelector((state: RootState) => state.cart.items);

  const dispatch = useAppDispatch();

  const handleRemoveProduct = (id: string) => {
    dispatch(removeFromCart(id));
  };

  const tableHeaders = ['ID', 'Image', 'Name', 'Size', 'Variant', 'Price', ''];

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

  return (
    <div className='overflow-auto'>
      <table className='w-2/3 min-w-[700px]'>
        <thead>
          <tr>{renderHeaders(tableHeaders)}</tr>
        </thead>
        <tbody>{renderRows(items)}</tbody>
      </table>
    </div>
  );
};
export default CartTable;
