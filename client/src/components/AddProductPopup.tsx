import React, { useState } from 'react';
import { useAppDispatch } from 'redux/hooks';
import { createProductThunk } from 'redux/slices/productsSlice';

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
  };

  const handleRenderVariants = () => {
    return productData.variants.map((variant) => (
      <li key={variant}>{variant}</li>
    ));
  };

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor='name'>Name</label>
      <input type='text' id='name' required onChange={handleSetName} />
      <label htmlFor='img'>Image URL</label>
      <input type='text' id='img' required onChange={handleSetImg} />
      <label htmlFor='desc'>Description</label>
      <input type='text' id='desc' required onChange={handleSetDescription} />
      <p>Categories</p>
      <p>Pet</p>
      <div onChange={handleSetPet}>
        <input type='radio' id='cats' name='pet' value='cats' required />
        <label htmlFor='cats'>Cats</label>
        <input type='radio' id='dogs' name='pet' value='dogs' />
        <label htmlFor='dogs'>Dogs</label>
      </div>
      <p>Subcategory</p>
      <div onChange={handleSetSubcategory}>
        <input
          type='radio'
          id='food'
          name='subcategory'
          value='food'
          required
        />
        <label htmlFor='food'>Food</label>
        <input type='radio' id='toys' name='subcategory' value='toys' />
        <label htmlFor='toys'>Toys</label>
        <input type='radio' id='hygene' name='subcategory' value='hygene' />
        <label htmlFor='hygene'>Hygene</label>
        <input type='radio' id='beds' name='subcategory' value='beds' />
        <label htmlFor='beds'>Beds</label>
        <input type='radio' id='other' name='subcategory' value='other' />
        <label htmlFor='other'>Other</label>
      </div>
      <label htmlFor='variants'>Variants</label>
      <input type='text' id='variants' onChange={handleSetVariant} />
      <button onClick={handleSetVariants}>Add variant</button>
      <ul>{handleRenderVariants()}</ul>
      <input
        type='checkbox'
        id='small'
        name='sizes'
        value='small'
        onChange={handleCheckbox}
      />
      <label htmlFor='small'>Small</label>
      <input
        type='checkbox'
        id='medium'
        name='sizes'
        value='medium'
        onChange={handleCheckbox}
      />
      <label htmlFor='medium'>Medium</label>
      <input
        type='checkbox'
        id='large'
        name='sizes'
        value='large'
        onChange={handleCheckbox}
      />
      <label htmlFor='large'>Large</label>
      <label htmlFor='price'>Price</label>
      <input
        type='number'
        id='price'
        step='0.01'
        required
        onChange={handleSetPrice}
      />
      <button type='submit'>Submit</button>
    </form>
  );
};
export default AddProductPopup;
