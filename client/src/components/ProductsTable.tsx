import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from 'redux/hooks';
import { fetchProductsThunk, Product } from 'redux/slices/productsSlice';
import { RootState } from 'redux/store';

const ProductsTable = () => {
  const products = useAppSelector(
    (state: RootState) => state.products.allProducts
  );

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchProductsThunk());
  }, [dispatch]);

  const handleRenderRows = (products: Product[]) => {
    return products.map((product) => (
      <tr key={product._id}>
        <td>{product._id}</td>
        <td>
          <img src={product.img} alt='' width='100px' />
        </td>
        <td>{product.name}</td>
        <td>
          <ul>
            {Object.values(product.categories).map((category) => (
              <li key={category}>{category}</li>
            ))}
          </ul>
        </td>
        <td>
          <ul>
            {product.variants.map((variant) => (
              <li key={variant}>{variant}</li>
            ))}
          </ul>
        </td>
        <td>{product.sizes}</td>
        <td>{product.price}€</td>
      </tr>
    ));
  };

  return (
    <table>
      <thead>
        <tr>
          <td>ID</td>
          <td>Image</td>
          <td>Name</td>
          <td>Categories</td>
          <td>Variants</td>
          <td>Sizes</td>
          <td>Price</td>
        </tr>
      </thead>
      <tbody>{handleRenderRows(products)}</tbody>
    </table>
  );
};
export default ProductsTable;
