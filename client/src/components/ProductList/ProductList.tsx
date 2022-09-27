import { useEffect } from 'react';

import { useAppDispatch, useAppSelector } from 'redux/hooks';
import { fetchProductsThunk } from 'redux/services/product.service';
import { RootState } from 'redux/store';
import ProductCard from 'components/ProductCard/ProductCard';

const ProductList = () => {
  const products = useAppSelector(
    (state: RootState) => state.products.allProducts
  );

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchProductsThunk());
  }, [dispatch]);

  const handleRenderProducts = () => {
    return products.map((product) => <ProductCard {...product} />);
  };

  return (
    <div className='flex flex-wrap justify-center gap-x-28 gap-y-16'>
      {handleRenderProducts()}
    </div>
  );
};
export default ProductList;
