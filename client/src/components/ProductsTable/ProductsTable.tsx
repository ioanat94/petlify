import { useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';

import { useAppDispatch, useAppSelector } from 'redux/hooks';
import {
  deleteProductThunk,
  fetchProductsThunk,
} from 'redux/services/product.service';
import { Product } from 'redux/slices/productsSlice';
import { RootState } from 'redux/store';

const ProductsTable = () => {
  const { products, adminAuth } = useAppSelector((state: RootState) => state);
  const allProducts = products.allProducts;
  const loggedInAdmin = adminAuth.loggedInAdmin;

  const tableHeaders = [
    'ID',
    'Image',
    'Name',
    'Categories',
    'Variants',
    'Sizes',
    'Price',
    'Actions',
  ];

  const location = useLocation();
  const query = location.search;

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchProductsThunk(query));
  }, [dispatch, query]);

  const handleDelete = (productId: string) => {
    dispatch(deleteProductThunk(productId));
  };

  const checkWritePerms = () => {
    return loggedInAdmin.roles.includes('products-write');
  };

  const handleRenderHeaders = (tableHeaders: string[]) => {
    return tableHeaders.map((header) => <td key={header}>{header}</td>);
  };

  const handleRenderRows = (products: Product[]) => {
    return products.map((product) => (
      <tr key={product._id} className='h-28'>
        <td>{product._id}</td>
        <td>
          <img src={product.img} alt='' width='90px' />
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
        {checkWritePerms() && (
          <td className='flex gap-2 pt-10'>
            <Link to={`/admin/products/${product._id}`}>
              <img src={require('assets/edit.png')} alt='' width='24px' />
            </Link>
            <button
              onClick={() => {
                handleDelete(product._id!);
              }}
            >
              <img src={require('assets/delete.png')} alt='' width='24px' />
            </button>
          </td>
        )}
      </tr>
    ));
  };

  return (
    <div className='overflow-auto'>
      <table className='min-w-[1000px]'>
        <thead>
          <tr>{handleRenderHeaders(tableHeaders)}</tr>
        </thead>
        <tbody>{handleRenderRows(allProducts)}</tbody>
      </table>
    </div>
  );
};
export default ProductsTable;
