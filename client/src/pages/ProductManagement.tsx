import AddProductPopup from 'components/AddProductPopup';
import { useState } from 'react';

const ProductManagement = () => {
  const [isVisible, setIsVisible] = useState(false);

  return (
    <>
      <div>ProductManagement</div>
      <button onClick={() => setIsVisible(true)}>Add Product</button>
      {isVisible && <AddProductPopup />}
    </>
  );
};

export default ProductManagement;
