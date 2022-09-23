import { useEffect } from 'react';
import { useParams } from 'react-router-dom';

import { useAppDispatch, useAppSelector } from 'redux/hooks';
import { fetchProductThunk } from 'redux/services/product.service';
import { RootState } from 'redux/store';

const Product = () => {
  const product = useAppSelector(
    (state: RootState) => state.products.singleProduct
  );

  const dispatch = useAppDispatch();
  const params = useParams();
  const productId: string | undefined = params.productId!;

  useEffect(() => {
    dispatch(fetchProductThunk(productId));
  }, [dispatch, productId]);

  return (
    <div>
      <img src={product.img} alt='' width='200px' />
      <h4>{product.name}</h4>
      <p>{product.description}</p>
      <div>
        <span>{product.categories.pet}</span>
        <span>{product.categories.subcategory}</span>
      </div>
      <p>{product.variants}</p>
      <p>{product.sizes}</p>
      <p>{product.price}</p>
    </div>
  );
};

export default Product;
