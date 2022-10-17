import React, { useState } from 'react';
import { useSnackbar } from 'react-simple-snackbar';

import { useAppDispatch } from 'redux/hooks';
import { createProductThunk } from 'redux/services/product.service';

export type ProductData = {
  name: string;
  img: string;
  description: string;
  pet: string;
  subcategory: string;
  variant: string;
  variants: string[];
  sizes: string[];
  price: number;
};

const AddProductPopup = () => {
  const [productData, setProductData] = useState<ProductData>({
    name: '',
    img: '',
    description: '',
    pet: '',
    subcategory: '',
    variant: '',
    variants: [],
    sizes: [],
    price: 0,
  });

  const options = {
    position: 'top-center',
    style: {
      marginTop: '60px',
      backgroundColor: 'white',
      color: '#0f172a',
      fontFamily: 'Montserrat, sans-serif',
      fontSize: '16px',
      textAlign: 'center',
    },
    closeStyle: {
      color: '#0f172a',
      fontSize: '12px',
    },
  };
  const [openSnackbar] = useSnackbar(options);

  const dispatch = useAppDispatch();

  const resetState = () => {
    setProductData({
      name: '',
      img: '',
      description: '',
      pet: '',
      subcategory: '',
      variant: '',
      variants: [],
      sizes: [],
      price: 0,
    });
  };

  const handleSetName = (e: React.ChangeEvent<HTMLInputElement>) => {
    setProductData({ ...productData, name: e.target.value });
  };

  const handleSetImg = (e: React.ChangeEvent<HTMLInputElement>) => {
    setProductData({ ...productData, img: e.target.value });
  };

  const handleSetDescription = (e: React.ChangeEvent<HTMLInputElement>) => {
    setProductData({ ...productData, description: e.target.value });
  };

  const handleSetPet = (e: React.ChangeEvent<HTMLInputElement>) => {
    setProductData({
      ...productData,
      pet: (e.target as HTMLInputElement).value,
    });
  };

  const handleSetSubcategory = (e: React.ChangeEvent<HTMLInputElement>) => {
    setProductData({
      ...productData,
      subcategory: (e.target as HTMLInputElement).value,
    });
  };

  const handleSetVariant = (e: React.ChangeEvent<HTMLInputElement>) => {
    setProductData({ ...productData, variant: e.target.value });
  };

  const handleSetVariants = (e: React.MouseEvent) => {
    e.preventDefault();
    const newVariants = [...productData.variants, productData.variant];
    setProductData({ ...productData, variants: newVariants });
  };

  const handleSetPrice = (e: React.ChangeEvent<HTMLInputElement>) => {
    setProductData({ ...productData, price: parseFloat(e.target.value) });
  };

  const handleCheckbox = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.checked) {
      const newSizes = [...productData.sizes, e.target.value];
      setProductData({ ...productData, sizes: newSizes });
    } else {
      const newSizes = productData.sizes.filter(
        (size) => size !== e.target.value
      );
      setProductData({ ...productData, sizes: newSizes });
    }
  };

  const handleSubmit = (e: React.ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();
    const newProduct = {
      name: productData.name,
      img: productData.img,
      description: productData.description,
      categories: {
        pet: productData.pet,
        subcategory: productData.subcategory,
      },
      variants: productData.variants,
      sizes: productData.sizes,
      price: productData.price,
    };
    dispatch(createProductThunk(newProduct));
    e.target.reset();
    resetState();
    openSnackbar('Product added successfully.');
  };

  const handleRenderVariants = () => {
    return productData.variants.map((variant) => (
      <span className='border border-adminLightBlue rounded px-3 py-1'>
        {variant}
      </span>
    ));
  };

  return (
    <form
      onSubmit={handleSubmit}
      className='flex flex-col gap-4 border border-adminLightBlue rounded-xl px-6 md:px-10 py-4 md:py-6 md:w-max'
    >
      <div className='flex flex-col md:flex-row justify-between'>
        <label htmlFor='name'>Name</label>
        <input
          type='text'
          id='name'
          className='rounded text-black indent-2'
          required
          onChange={handleSetName}
        />
      </div>
      <div className='flex flex-col md:flex-row justify-between'>
        <label htmlFor='img'>Image URL</label>
        <input
          type='text'
          id='img'
          className='rounded text-black indent-2'
          required
          onChange={handleSetImg}
        />
      </div>
      <div className='flex flex-col md:flex-row justify-between'>
        <label htmlFor='desc'>Description</label>
        <input
          type='text'
          id='desc'
          className='rounded text-black indent-2'
          required
          onChange={handleSetDescription}
        />
      </div>
      <div className='flex flex-col gap-2'>
        <p>Categories</p>
        <p>Pet</p>
        <div className='flex gap-4'>
          <div className='flex gap-2'>
            <input
              type='radio'
              id='cats'
              name='pet'
              value='cats'
              required
              onChange={handleSetPet}
            />
            <label htmlFor='cats'>Cats</label>
          </div>
          <div className='flex gap-2'>
            <input
              type='radio'
              id='dogs'
              name='pet'
              value='dogs'
              onChange={handleSetPet}
            />
            <label htmlFor='dogs'>Dogs</label>
          </div>
        </div>
        <p>Subcategory</p>
        <div className='flex gap-4'>
          <div className='flex flex-col md:flex-row md:items-center gap-4'>
            <div className='flex gap-2'>
              <input
                type='radio'
                id='food'
                name='subcategory'
                value='food'
                required
                onChange={handleSetSubcategory}
              />
              <label htmlFor='food'>Food</label>
            </div>
            <div className='flex gap-2'>
              <input
                type='radio'
                id='toys'
                name='subcategory'
                value='toys'
                onChange={handleSetSubcategory}
              />
              <label htmlFor='toys'>Toys</label>
            </div>
            <div className='flex gap-2'>
              <input
                type='radio'
                id='hygene'
                name='subcategory'
                value='hygene'
                onChange={handleSetSubcategory}
              />
              <label htmlFor='hygene'>Hygene</label>
            </div>
          </div>
          <div className='flex flex-col md:flex-row md:items-center gap-4'>
            <div className='flex gap-2'>
              <input
                type='radio'
                id='beds'
                name='subcategory'
                value='beds'
                onChange={handleSetSubcategory}
              />
              <label htmlFor='beds'>Beds</label>
            </div>
            <div className='flex gap-2'>
              <input
                type='radio'
                id='other'
                name='subcategory'
                value='other'
                onChange={handleSetSubcategory}
              />
              <label htmlFor='other'>Other</label>
            </div>
          </div>
        </div>
      </div>
      <div className='flex flex-col gap-2'>
        <label htmlFor='variants'>Variants</label>
        <div className='flex flex-col md:flex-row md:items-center gap-8'>
          <input
            type='text'
            id='variants'
            className='rounded text-black indent-2 h-max'
            onChange={handleSetVariant}
          />
          <button
            onClick={handleSetVariants}
            className='w-max bg-adminLightBlue px-2 py-1 border border-adminBlue rounded text-adminBlue font-medium transition-all hover:border-adminLightBlue hover:bg-adminBlue hover:text-adminLightBlue'
          >
            Add variant
          </button>
        </div>
        <div className='flex gap-4'>{handleRenderVariants()}</div>
      </div>
      <div className='flex flex-col gap-2'>
        <p>Sizes</p>
        <div className='flex items-center gap-4'>
          <div className='flex items-center gap-2'>
            <input
              type='checkbox'
              id='small'
              name='sizes'
              value='small'
              onChange={handleCheckbox}
            />
            <label htmlFor='small'>Small</label>
          </div>
          <div className='flex items-center gap-2'>
            <input
              type='checkbox'
              id='medium'
              name='sizes'
              value='medium'
              onChange={handleCheckbox}
            />
            <label htmlFor='medium'>Medium</label>
          </div>
          <div className='flex items-center gap-2'>
            <input
              type='checkbox'
              id='large'
              name='sizes'
              value='large'
              onChange={handleCheckbox}
            />
            <label htmlFor='large'>Large</label>
          </div>
        </div>
      </div>
      <div className='flex flex-col md:flex-row justify-between'>
        <label htmlFor='price'>Price</label>
        <input
          type='number'
          id='price'
          step='0.01'
          className='rounded text-black indent-2'
          required
          onChange={handleSetPrice}
        />
      </div>
      <button
        type='submit'
        className='w-max bg-adminLightBlue px-2 py-1 border border-adminBlue rounded text-adminBlue font-medium transition-all hover:border-adminLightBlue hover:bg-adminBlue hover:text-adminLightBlue'
      >
        Submit
      </button>
    </form>
  );
};
export default AddProductPopup;
