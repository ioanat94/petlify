import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import { useAppDispatch, useAppSelector } from 'redux/hooks';
import {
  fetchProductThunk,
  updateProductThunk,
} from 'redux/services/product.service';
import { RootState } from 'redux/store';
import { ProductData } from 'components/AddProductPopup/AddProductPopup';
import AdminNavbar from 'components/AdminNavbar/AdminNavbar';
import AdminSideNav from 'components/AdminSideNav/AdminSideNav';

const EditProduct = () => {
  const { products, adminAuth } = useAppSelector((state: RootState) => state);
  const product = products.singleProduct;
  const isLoading = products.isLoading;
  const adminToken = adminAuth.adminToken;
  const loggedInAdmin = adminAuth.loggedInAdmin;

  const navigate = useNavigate();

  useEffect(() => {
    if (!adminToken) {
      navigate('/admin/login');
      return;
    }

    if (!loggedInAdmin.roles.includes('admins-write')) {
      navigate('/admin/unauthorized');
    }
  }, [adminToken, navigate, loggedInAdmin.roles]);

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
      if (productData.sizes.length === 0) {
        const newSizes = [...product.sizes, e.target.value];
        setProductData({ ...productData, sizes: newSizes });
      } else {
        const newSizes = [...productData.sizes, e.target.value];
        setProductData({ ...productData, sizes: newSizes });
      }
    } else {
      if (productData.sizes.length === 0) {
        const newSizes = product.sizes.filter(
          (size) => size !== e.target.value
        );
        setProductData({ ...productData, sizes: newSizes });
      } else {
        const newSizes = productData.sizes.filter(
          (size) => size !== e.target.value
        );
        setProductData({ ...productData, sizes: newSizes });
      }
    }
  };

  const handleSubmit = (e: React.ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();
    const updatedProduct: { [index: string]: any } = {
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

    Object.keys(updatedProduct.categories).forEach((key) => {
      if (updatedProduct.categories[key] === '')
        delete updatedProduct.categories[key];
    });

    if (Object.keys(updatedProduct.categories).length === 0)
      delete updatedProduct.categories;

    Object.keys(updatedProduct).forEach((key) => {
      if (
        updatedProduct[key] === '' ||
        updatedProduct[key] === 0 ||
        updatedProduct[key].length === 0
      )
        delete updatedProduct[key];
    });

    const data = { productId: productId, updatedProduct: updatedProduct };
    dispatch(updateProductThunk(data));
  };

  const handleRenderVariants = () => {
    return productData.variants.map((variant) => (
      <span className='border border-adminLightBlue rounded px-3 py-1'>
        {variant}
      </span>
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
      <AdminNavbar />
      <div className='flex flex-col pb-10 md:pb-0 md:flex-row min-h-[calc(100vh-64px)] bg-adminBlue'>
        <AdminSideNav />
        {!isLoading && (
          <div className='flex flex-col gap-4 px-10 md:p-10 text-white md:min-w-[700px]'>
            <p className='text-3xl font-medium'>Edit Product</p>
            <form onSubmit={handleSubmit} className='flex flex-col gap-4'>
              <div className='flex flex-col gap-4 md:gap-0 md:flex-row-reverse md:items-center justify-between'>
                <img
                  src={product.img}
                  alt=''
                  width='150px'
                  className='self-start'
                />
                <div className='flex flex-col gap-4 md:w-2/3'>
                  <div className='flex flex-col md:flex-row justify-between'>
                    <label htmlFor='name'>Name</label>
                    <input
                      type='text'
                      id='name'
                      className='rounded text-black indent-2'
                      required
                      defaultValue={product.name}
                      onChange={handleSetName}
                    />
                  </div>
                  <div className='flex flex-col md:flex-row justify-between'>
                    <label htmlFor='img'>Image URL</label>
                    <input
                      type='text'
                      id='img'
                      required
                      className='rounded text-black indent-2'
                      defaultValue={product.img}
                      onChange={handleSetImg}
                    />
                  </div>
                  <div className='flex flex-col md:flex-row justify-between'>
                    <label htmlFor='desc'>Description</label>
                    <input
                      type='text'
                      id='desc'
                      required
                      className='rounded text-black indent-2'
                      defaultValue={product.description}
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
                          defaultChecked={checkPet.cats()}
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
                          defaultChecked={checkPet.dogs()}
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
                            defaultChecked={checkSubcategory.food()}
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
                            defaultChecked={checkSubcategory.toys()}
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
                            defaultChecked={checkSubcategory.hygene()}
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
                            defaultChecked={checkSubcategory.beds()}
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
                            defaultChecked={checkSubcategory.other()}
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
                          defaultChecked={
                            product.sizes.includes('small') ? true : false
                          }
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
                          defaultChecked={
                            product.sizes.includes('medium') ? true : false
                          }
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
                          defaultChecked={
                            product.sizes.includes('large') ? true : false
                          }
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
                      defaultValue={product.price}
                      onChange={handleSetPrice}
                    />
                  </div>
                </div>
              </div>
              <button
                type='submit'
                className='w-max bg-adminLightBlue px-2 py-1 border border-adminBlue rounded text-adminBlue font-medium transition-all hover:border-adminLightBlue hover:bg-adminBlue hover:text-adminLightBlue'
              >
                Submit
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};

export default EditProduct;
