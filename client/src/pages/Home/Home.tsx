import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from 'redux/hooks';

import { fetchProductsThunk } from 'redux/services/product.service';
import { Product } from 'redux/slices/productsSlice';
import { RootState } from 'redux/store';

const Home = () => {
  const products = useAppSelector(
    (state: RootState) => state.products.allProducts
  );

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchProductsThunk());
  }, [dispatch]);

  const handleRenderProducts = (products: Product[]) => {
    return products.map((product) => (
      <div>
        <img src={product.img} alt='' width='200px' />
        <Link to={`/products/${product._id}`}>{product.name}</Link>
        <p>{product.description}</p>
        <div>
          <span>{product.categories.pet}</span>
          <span>{product.categories.subcategory}</span>
        </div>
        <p>{product.variants}</p>
        <p>{product.sizes}</p>
        <p>{product.price}</p>
      </div>
    ));
  };

  return <div>{handleRenderProducts(products)}</div>;
};

export default Home;
