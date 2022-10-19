import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from 'redux/hooks';
import { fetchProductsThunk } from 'redux/services/product.service';
import { Product } from 'redux/slices/productsSlice';
import { RootState } from 'redux/store';

const RecentProducts = () => {
  const { products } = useAppSelector((state: RootState) => state);
  const allProducts = products.allProducts.slice(0, 5);

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchProductsThunk());
  }, [dispatch]);

  const tableHeaders = [
    'Image',
    'Name',
    'Categories',
    'Variants',
    'Sizes',
    'Price',
  ];

  const handleRenderHeaders = (tableHeaders: string[]) => {
    return tableHeaders.map((header) => <td key={header}>{header}</td>);
  };

  const handleRenderRows = (products: Product[]) => {
    return products.map((product) => (
      <tr key={product._id} className='h-16'>
        <td>
          <img src={product.img} alt='' width='45px' />
        </td>
        <td>{product.name}</td>
        <td>
          <ul>
            {Object.values(product.categories).map((category) => (
              <li key={category}>- {category}</li>
            ))}
          </ul>
        </td>
        <td>
          <ul>
            {product.variants.map((variant) => (
              <li key={variant}>- {variant}</li>
            ))}
          </ul>
        </td>
        <td>
          <ul>
            {product.sizes.map((size) => (
              <li key={size}>- {size}</li>
            ))}
          </ul>
        </td>
        <td>{product.price}€</td>
      </tr>
    ));
  };

  return (
    <div className='flex flex-col gap-4'>
      <p className='text-xl font-semibold'>Recent Products</p>
      <div className='overflow-auto'>
        <table className='min-w-[700px] w-[calc((100vw-500px)/2)]'>
          <thead>
            <tr>{handleRenderHeaders(tableHeaders)}</tr>
          </thead>
          <tbody>{handleRenderRows(allProducts)}</tbody>
        </table>
      </div>
    </div>
  );
};
export default RecentProducts;
