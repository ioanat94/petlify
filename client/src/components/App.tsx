import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from 'pages/Home';
import Product from 'pages/Product';
import Admin from 'pages/Admin';
import ProductManagement from 'pages/ProductManagement';

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/products/:productId' element={<Product />} />
        <Route path='/admin' element={<Admin />} />
        <Route path='/admin/products' element={<ProductManagement />} />
      </Routes>
    </BrowserRouter>
  );
};
export default App;
