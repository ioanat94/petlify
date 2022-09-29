import { useEffect } from 'react';

import { useAppDispatch, useAppSelector } from 'redux/hooks';
import { fetchProductsThunk } from 'redux/services/product.service';
import { RootState } from 'redux/store';
import ProductCard from 'components/ProductCard/ProductCard';
import { useSearchParams } from 'react-router-dom';

const ProductList = () => {
  const products = useAppSelector(
    (state: RootState) => state.products.allProducts
  );

  const dispatch = useAppDispatch();
  const [params] = useSearchParams();
  const pet = params.get('pet');
  const subcategory = params.get('subcategory');
  const query =
    pet === null
      ? ''
      : subcategory === null
      ? `?pet=${pet}`
      : `?pet=${pet}&subcategory=${subcategory}`;

  useEffect(() => {
    dispatch(fetchProductsThunk(query));
  }, [dispatch, query]);

  const handleRenderProducts = () => {
    return products.map((product) => (
      <ProductCard {...product} key={product._id} />
    ));
  };

  return (
    <div className='flex flex-wrap justify-center gap-x-28 gap-y-16'>
      {handleRenderProducts()}
    </div>
  );
};
export default ProductList;
