import React, { useState } from 'react';
import { useAppDispatch } from 'redux/hooks';
import { createProductThunk } from 'redux/slices/productsSlice';

const AddProductPopup = () => {
  const [name, setName] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [description, setDescription] = useState('');
  const [pet, setPet] = useState('');
  const [subcategory, setSubcategory] = useState('');
  const [variant, setVariant] = useState('');
  const [variants, setVariants] = useState<string[]>([]);
  const [sizes, setSizes] = useState<string[]>([]);
  const [price, setPrice] = useState(0);

  const dispatch = useAppDispatch();

  const resetState = () => {
    setName('');
    setImageUrl('');
    setDescription('');
    setPet('');
    setSubcategory('');
    setVariant('');
    setVariants([]);
    setSizes([]);
    setPrice(0);
  };

  const handleCheckbox = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.checked) {
      setSizes((prevSizes) => [...prevSizes, e.target.value]);
    } else {
      const newSizes = sizes.filter((size) => size !== e.target.value);
      setSizes(newSizes);
    }
  };

  const handleSubmit = (e: React.ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();
    const newProduct = {
      name: name,
      img: imageUrl,
      description: description,
      categories: {
        pet: pet,
        subcategory: subcategory,
      },
      variants: variants,
      sizes: sizes,
      price: price,
    };
    dispatch(createProductThunk(newProduct));
    e.target.reset();
    resetState();
  };

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor='name'>Name</label>
      <input
        type='text'
        id='name'
        required
        onChange={(e) => setName(e.target.value)}
      />
      <label htmlFor='imgurl'>Image URL</label>
      <input
        type='text'
        id='imgurl'
        required
        onChange={(e) => setImageUrl(e.target.value)}
      />
      <label htmlFor='desc'>Description</label>
      <input
        type='text'
        id='desc'
        required
        onChange={(e) => setDescription(e.target.value)}
      />
      <p>Categories</p>
      <p>Pet</p>
      <div onChange={(e) => setPet((e.target as HTMLInputElement).value)}>
        <input type='radio' id='cats' name='pet' value='cats' required />
        <label htmlFor='cats'>Cats</label>
        <input type='radio' id='dogs' name='pet' value='dogs' />
        <label htmlFor='dogs'>Dogs</label>
      </div>
      <p>Subcategory</p>
      <div
        onChange={(e) => setSubcategory((e.target as HTMLInputElement).value)}
      >
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
      <input
        type='text'
        id='variants'
        onChange={(e) => setVariant(e.target.value)}
      />
      <button
        onClick={(e) => {
          e.preventDefault();
          setVariants((prevVariants) => [...prevVariants, variant]);
        }}
      >
        Add variant
      </button>
      <p>{variants}</p>
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
        onChange={(e) => setPrice(parseFloat(e.target.value))}
      />
      <button type='submit'>Submit</button>
    </form>
  );
};
export default AddProductPopup;
