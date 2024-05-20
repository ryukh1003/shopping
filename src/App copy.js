import 'bootstrap/dist/css/bootstrap.min.css';
import './css/my_reset.css';
import './css/App.css';

import Header from './components/Header';
import Footer from './components/Footer';
import Main from './pages/Main';
import Company from './pages/Company';
import ShopAll from './pages/ShopAll';
import Products from './pages/Products';
import Cart from './pages/Cart';

import Ceo from './pages/Ceo';
import Organization from './pages/Organization';
import Ci from './components/Ci';

import { useEffect, useState } from 'react';

import { Route, Routes } from 'react-router-dom';

function App() {
  const [products, setProducts] = useState([]);

  const getProductList = async () => {
    try {
      let url = `http://localhost:5000/products?category=new`;
      let response = await fetch(url);
      let data = await response.json();
      setProducts(data);
    } catch (error) {
      console.error('오류가 발생했습니다:', error);
    }
  };

  useEffect(() => {
    getProductList();
  }, []);

  return (
    <div className="App">
      <Header />
      <Routes>
        <Route path="/" element={<Main products={products} />} />
        <Route path="/shopall" element={<ShopAll />} />
        <Route path="/products/:id" element={<Products />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/company" element={<Company />}>
          <Route path="ceo" element={<Ceo />} />
          <Route path="organization" element={<Organization />} />
          <Route path="ci" element={<Ci />} />
        </Route>
        <Route path="*" element={<h1> 페이지가 없습니다 </h1>} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
