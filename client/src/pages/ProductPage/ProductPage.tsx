import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';

import { useAppDispatch, useAppSelector } from 'redux/hooks';
import { fetchProductThunk } from 'redux/services/product.service';
import { RootState } from 'redux/store';
import { addToCart } from 'redux/slices/cartSlice';
import { Product } from 'redux/slices/productsSlice';
import Footer from 'components/Footer/Footer';
import Navbar from 'components/Navbar/Navbar';

const ProductPage = () => {
  const product = useAppSelector(
    (state: RootState) => state.products.singleProduct
  );
  const user = useAppSelector((state: RootState) => state.auth.loggedInUser);

  const [chosenSize, setChosenSize] = useState(product.sizes[0]);
  const [chosenVariant, setChosenVariant] = useState(product.variants[0]);

  const dispatch = useAppDispatch();
  const params = useParams();
  const productId: string | undefined = params.productId!;

  useEffect(() => {
    dispatch(fetchProductThunk(productId));
  }, [dispatch, productId]);

  const handleChosenSize = (e: React.MouseEvent<HTMLButtonElement>) => {
    setChosenSize(e.currentTarget.value);
  };

  const handleChosenVariant = (e: React.MouseEvent<HTMLButtonElement>) => {
    setChosenVariant(e.currentTarget.value);
  };

  const hasSizes = () => {
    return product.sizes.length > 0;
  };

  const hasVariants = () => {
    return product.variants.length > 0;
  };

  const renderSizes = () => {
    return product.sizes.map((size) => (
      <button
        value={size}
        onClick={handleChosenSize}
        className={`border w-6 text-center ${
          chosenSize === size
            ? 'border-white text-white bg-mainBlue'
            : 'border-mainBlue text-mainBlue'
        }`}
      >
        {size[0].toUpperCase()}
      </button>
    ));
  };

  const renderVariants = () => {
    return product.variants.map((variant) => (
      <button
        value={variant}
        onClick={handleChosenVariant}
        className={`border w-max px-2 py-1 text-center ${
          chosenVariant === variant
            ? 'border-white text-white bg-mainBlue'
            : 'border-mainBlue text-mainBlue'
        }`}
      >
        {variant}
      </button>
    ));
  };

  const handleAddToCart = (product: Product) => {
    const productToAdd = {
      productId: uuidv4(),
      id: product._id as string,
      image: product.img,
      name: product.name,
      size: chosenSize || product.sizes[0],
      variant: chosenVariant || product.variants[0],
      price: product.price,
    };
    dispatch(addToCart(productToAdd));
  };

  return (
    <>
      <Navbar />
      <div className='min-h-[calc(100vh-128px)]'>
        <div className='flex justify-center gap-20 py-20'>
          <img src={product.img} alt='' width='600px' />
          <div className='flex flex-col gap-4'>
            <h4 className='text-mainBlue font-bold text-3xl'>{product.name}</h4>
            {hasSizes() && (
              <div>
                <p>Choose size:</p>
                <div className='flex gap-2'>{renderSizes()}</div>
              </div>
            )}
            {hasVariants() && (
              <div>
                <p>Choose variant:</p>
                <div className='flex gap-2'>{renderVariants()}</div>
              </div>
            )}
            <div className='flex gap-6'>
              <p className='text-2xl font-bold'>{product.price}€</p>
              <button
                onClick={() => handleAddToCart(product)}
                className='w-max px-4 py-1 text-mainBlue font-bold border-2 border-mainBlue rounded-lg transition-all hover:border-white hover:bg-mainBlue hover:text-white disabled:bg-slate-50 disabled:text-slate-500 disabled:border-slate-200'
                disabled={user.isBanned}
              >
                BUY
              </button>
            </div>
            <p>{product.description}</p>
            <div className='flex gap-2'>
              <span className='border rounded-full border-mainYellow px-2 py-1'>
                #{product.categories.pet}
              </span>
              <span className='border rounded-full border-mainYellow px-2 py-1'>
                #{product.categories.subcategory}
              </span>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default ProductPage;
