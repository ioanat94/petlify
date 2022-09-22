import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from 'pages/Home';
import Product from 'pages/Product';
import Admin from 'pages/Admin';
import ProductManagement from 'pages/ProductManagement';
import EditProduct from 'pages/EditProduct';
import UserManagement from 'pages/UserManagement';
import User from 'pages/User';

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/products/:productId' element={<Product />} />
        <Route path='/users/:userId' element={<User />} />
        <Route path='/admin' element={<Admin />} />
        <Route path='/admin/products' element={<ProductManagement />} />
        <Route path='/admin/products/:productId' element={<EditProduct />} />
        <Route path='/admin/users' element={<UserManagement />} />
      </Routes>
    </BrowserRouter>
  );
};
export default App;
