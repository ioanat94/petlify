import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Home from 'pages/Home/Home';
import Admin from 'pages/Admin/Admin';
import ProductManagement from 'pages/ProductManagement/ProductManagement';
import EditProduct from 'pages/EditProduct/EditProduct';
import UserManagement from 'pages/UserManagement/UserManagement';
import User from 'pages/User/User';
import AdminManagement from 'pages/AdminManagement/AdminManagement';
import EditAdmin from 'pages/EditAdmin/EditAdmin';
import AdminLogin from 'pages/AdminLogin/AdminLogin';
import Unauthorized from 'pages/Unauthorized/Unauthorized';
import ProductPage from 'pages/ProductPage/ProductPage';
import CartPage from 'pages/CartPage/CartPage';
import OrderPage from 'pages/OrderPage/OrderPage';
import OrderManagement from 'pages/OrderManagement/OrderManagement';

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
