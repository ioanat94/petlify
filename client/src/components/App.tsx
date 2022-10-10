import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Home from 'pages/Home';
import Admin from 'pages/Admin';
import ProductManagement from 'pages/ProductManagement';
import EditProduct from 'pages/EditProduct';
import UserManagement from 'pages/UserManagement';
import User from 'pages/User';
import AdminManagement from 'pages/AdminManagement';
import EditAdmin from 'pages/EditAdmin';
import AdminLogin from 'pages/AdminLogin';
import Unauthorized from 'pages/Unauthorized';
import ProductPage from 'pages/Product';
import CartPage from 'pages/Cart';
import OrderPage from 'pages/Order';
import OrderManagement from 'pages/OrderManagement';

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/products/:productId' element={<ProductPage />} />
        <Route path='/users/:userId' element={<User />} />
        <Route path='/cart' element={<CartPage />} />
        <Route path='/orders/:orderId' element={<OrderPage />} />
        <Route path='/admin' element={<Admin />} />
        <Route path='/admin/login' element={<AdminLogin />} />
        <Route path='/admin/products' element={<ProductManagement />} />
        <Route path='/admin/products/:productId' element={<EditProduct />} />
        <Route path='/admin/users' element={<UserManagement />} />
        <Route path='/admin/orders' element={<OrderManagement />} />
        <Route path='/admin/admins' element={<AdminManagement />} />
        <Route path='/admin/admins/:adminId' element={<EditAdmin />} />
        <Route path='/admin/unauthorized' element={<Unauthorized />} />
      </Routes>
    </BrowserRouter>
  );
};
export default App;
