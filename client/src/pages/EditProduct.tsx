import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from 'redux/hooks';
import {
  fetchProductThunk,
  updateProductThunk,
} from 'redux/slices/productsSlice';
import { RootState } from 'redux/store';

const EditProduct = () => {
  const product = useAppSelector(
    (state: RootState) => state.products.singleProduct
  );
  const isLoading = useAppSelector(
    (state: RootState) => state.products.isLoading
  );

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
  const params = useParams();
  const productId: string | undefined = params.productId!;

  useEffect(() => {
    dispatch(fetchProductThunk(productId));
  }, [dispatch, productId]);

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
    const updatedProduct = {
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
    const data = { productId: productId, updatedProduct: updatedProduct };
    dispatch(updateProductThunk(data));
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
            onChange={(e) => setName(e.target.value)}
          />
          <img src={product.img} alt='' width='150px' />
          <label htmlFor='imgurl'>Image URL</label>
          <input
            type='text'
            id='imgurl'
            required
            defaultValue={product.img}
            onChange={(e) => setImageUrl(e.target.value)}
          />
          <label htmlFor='desc'>Description</label>
          <input
            type='text'
            id='desc'
            required
            defaultValue={product.description}
            onChange={(e) => setDescription(e.target.value)}
          />
          <p>Categories</p>
          <p>Pet</p>
          <div onChange={(e) => setPet((e.target as HTMLInputElement).value)}>
            <input
              type='radio'
              id='cats'
              name='pet'
              value='cats'
              required
              defaultChecked={product.categories.pet === 'cats' ? true : false}
            />
            <label htmlFor='cats'>Cats</label>
            <input
              type='radio'
              id='dogs'
              name='pet'
              value='dogs'
              defaultChecked={product.categories.pet === 'dogs' ? true : false}
            />
            <label htmlFor='dogs'>Dogs</label>
          </div>
          <p>Subcategory</p>
          <div
            onChange={(e) =>
              setSubcategory((e.target as HTMLInputElement).value)
            }
          >
            <input
              type='radio'
              id='food'
              name='subcategory'
              value='food'
              defaultChecked={
                product.categories.subcategory === 'food' ? true : false
              }
              required
            />
            <label htmlFor='food'>Food</label>
            <input
              type='radio'
              id='toys'
              name='subcategory'
              value='toys'
              defaultChecked={
                product.categories.subcategory === 'toys' ? true : false
              }
            />
            <label htmlFor='toys'>Toys</label>
            <input
              type='radio'
              id='hygene'
              name='subcategory'
              value='hygene'
              defaultChecked={
                product.categories.subcategory === 'hygene' ? true : false
              }
            />
            <label htmlFor='hygene'>Hygene</label>
            <input
              type='radio'
              id='beds'
              name='subcategory'
              value='beds'
              defaultChecked={
                product.categories.subcategory === 'beds' ? true : false
              }
            />
            <label htmlFor='beds'>Beds</label>
            <input
              type='radio'
              id='other'
              name='subcategory'
              value='other'
              defaultChecked={
                product.categories.subcategory === 'other' ? true : false
              }
            />
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
          <ul>
            {product.variants.map((variant) => (
              <li key={variant}>{variant}</li>
            ))}
          </ul>
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
            defaultValue={product.price}
            onChange={(e) => setPrice(parseFloat(e.target.value))}
          />
          <button type='submit'>Submit</button>
        </form>
      )}
    </div>
  );
};

export default EditProduct;
