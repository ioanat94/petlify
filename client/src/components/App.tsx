import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from 'pages/Home/Home';
import Product from 'pages/Product/Product';
import Admin from 'pages/Admin/Admin';
import ProductManagement from 'pages/ProductManagement/ProductManagement';
import EditProduct from 'pages/EditProduct/EditProduct';
import UserManagement from 'pages/UserManagement/UserManagement';
import User from 'pages/User/User';
import AdminManagement from 'pages/AdminManagement/AdminManagement';
import EditAdmin from 'pages/EditAdmin/EditAdmin';

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
        <Route path='/admin/admins' element={<AdminManagement />} />
        <Route path='/admin/admins/:adminId' element={<EditAdmin />} />
      </Routes>
    </BrowserRouter>
  );
};
export default App;
