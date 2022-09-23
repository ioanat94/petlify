import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import { useAppDispatch, useAppSelector } from 'redux/hooks';
import {
  fetchProductThunk,
  updateProductThunk,
} from 'redux/services/product.service';
import { RootState } from 'redux/store';
import { ProductData } from 'components/AddProductPopup/AddProductPopup';

const EditProduct = () => {
  const product = useAppSelector(
    (state: RootState) => state.products.singleProduct
  );
  const isLoading = useAppSelector(
    (state: RootState) => state.products.isLoading
  );

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
  const params = useParams();
  const productId: string | undefined = params.productId!;

  useEffect(() => {
    dispatch(fetchProductThunk(productId));
  }, [dispatch, productId]);

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
    const updatedProduct = {
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
    const data = { productId: productId, updatedProduct: updatedProduct };
    dispatch(updateProductThunk(data));
  };

  const handleRenderVariants = () => {
    return productData.variants.map((variant) => (
      <li key={variant}>{variant}</li>
    ));
  };

  const checkPet = {
    cats: () => (product.categories.pet === 'cats' ? true : false),
    dogs: () => (product.categories.pet === 'dogs' ? true : false),
  };

  const checkSubcategory = {
    food: () => (product.categories.subcategory === 'food' ? true : false),
    toys: () => (product.categories.subcategory === 'toys' ? true : false),
    hygene: () => (product.categories.subcategory === 'hygene' ? true : false),
    beds: () => (product.categories.subcategory === 'beds' ? true : false),
    other: () => (product.categories.subcategory === 'other' ? true : false),
  };

  return (
    <div>
      {!isLoading && (
        <form onSubmit={handleSubmit}>
          <label htmlFor='name'>Name</label>
          <input
            type='text'
            id='name'
            required
            defaultValue={product.name}
            onChange={handleSetName}
          />
          <img src={product.img} alt='' width='150px' />
          <label htmlFor='img'>Image URL</label>
          <input
            type='text'
            id='img'
            required
            defaultValue={product.img}
            onChange={handleSetImg}
          />
          <label htmlFor='desc'>Description</label>
          <input
            type='text'
            id='desc'
            required
            defaultValue={product.description}
            onChange={handleSetDescription}
          />
          <p>Categories</p>
          <p>Pet</p>
          <div>
            <input
              type='radio'
              id='cats'
              name='pet'
              value='cats'
              required
              defaultChecked={checkPet.cats()}
              onChange={handleSetPet}
            />
            <label htmlFor='cats'>Cats</label>
            <input
              type='radio'
              id='dogs'
              name='pet'
              value='dogs'
              defaultChecked={checkPet.dogs()}
              onChange={handleSetPet}
            />
            <label htmlFor='dogs'>Dogs</label>
          </div>
          <p>Subcategory</p>
          <div>
            <input
              type='radio'
              id='food'
              name='subcategory'
              value='food'
              defaultChecked={checkSubcategory.food()}
              required
              onChange={handleSetSubcategory}
            />
            <label htmlFor='food'>Food</label>
            <input
              type='radio'
              id='toys'
              name='subcategory'
              value='toys'
              defaultChecked={checkSubcategory.toys()}
              onChange={handleSetSubcategory}
            />
            <label htmlFor='toys'>Toys</label>
            <input
              type='radio'
              id='hygene'
              name='subcategory'
              value='hygene'
              defaultChecked={checkSubcategory.hygene()}
              onChange={handleSetSubcategory}
            />
            <label htmlFor='hygene'>Hygene</label>
            <input
              type='radio'
              id='beds'
              name='subcategory'
              value='beds'
              defaultChecked={checkSubcategory.beds()}
              onChange={handleSetSubcategory}
            />
            <label htmlFor='beds'>Beds</label>
            <input
              type='radio'
              id='other'
              name='subcategory'
              value='other'
              defaultChecked={checkSubcategory.other()}
              onChange={handleSetSubcategory}
            />
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
            defaultChecked={product.sizes.includes('small') ? true : false}
          />
          <label htmlFor='small'>Small</label>
          <input
            type='checkbox'
            id='medium'
            name='sizes'
            value='medium'
            onChange={handleCheckbox}
            defaultChecked={product.sizes.includes('medium') ? true : false}
          />
          <label htmlFor='medium'>Medium</label>
          <input
            type='checkbox'
            id='large'
            name='sizes'
            value='large'
            onChange={handleCheckbox}
            defaultChecked={product.sizes.includes('large') ? true : false}
          />
          <label htmlFor='large'>Large</label>
          <label htmlFor='price'>Price</label>
          <input
            type='number'
            id='price'
            step='0.01'
            required
            defaultValue={product.price}
            onChange={handleSetPrice}
          />
          <button type='submit'>Submit</button>
        </form>
      )}
    </div>
  );
};

export default EditProduct;
