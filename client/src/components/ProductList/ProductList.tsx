import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

import { useAppDispatch, useAppSelector } from 'redux/hooks';
import { fetchProductsThunk } from 'redux/services/product.service';
import { RootState } from 'redux/store';
import ProductCard from 'components/ProductCard/ProductCard';

const ProductList = () => {
  const { products } = useAppSelector((state: RootState) => state);

  const allProducts = products.allProducts;
  const isLoading = products.isLoading;

  const location = useLocation();
  const query = location.search;

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchProductsThunk(query));
  }, [dispatch, query]);

  const handleRenderProducts = () => {
    return allProducts.length > 0 ? (
      allProducts.map((product) => (
        <ProductCard {...product} key={product._id} />
      ))
    ) : (
      <div className='text-xl font-semibold'>No products found.</div>
    );
  };

  return (
    <div className='flex flex-wrap justify-center gap-x-28 gap-y-16'>
      {isLoading ? '' : handleRenderProducts()}
    </div>
  );
};
export default ProductList;
