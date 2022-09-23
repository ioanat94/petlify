import AddProductPopup from 'components/AddProductPopup';
import ProductsTable from 'components/ProductsTable';
import { useState } from 'react';

const ProductManagement = () => {
  const [isVisible, setIsVisible] = useState(false);

  const handleSetVisible = () => {
    setIsVisible(!isVisible);
  };

  return (
    <>
      <div>ProductManagement</div>
      <button onClick={handleSetVisible}>Add Product</button>
      {isVisible && <AddProductPopup />}
      <ProductsTable />
    </>
  );
};

export default ProductManagement;
