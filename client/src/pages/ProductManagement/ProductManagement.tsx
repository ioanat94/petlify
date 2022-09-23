import { useState } from 'react';

import AddProductPopup from 'components/AddProductPopup/AddProductPopup';
import ProductsTable from 'components/ProductsTable/ProductsTable';

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
