import { useEffect, useState } from 'react';
import ListCard from '../components/ListCard';

const ShopAll = () => {
  const [products, setProducts] = useState([]);

  // 전체상품 가져오기
  const getProductList = async () => {
    try {
      let url = `http://localhost:5000/products`;
      let response = await fetch(url);
      let data = await response.json();
      setProducts(data);
    } catch (error) {
      console.error('오류가 발생했습니다:', error);
    }
  };

  const getNewList = async () => {
    try {
      let url = `http://localhost:5000/products?category=new`;
      let response = await fetch(url);
      let data = await response.json();
      setProducts(data);
    } catch (error) {
      console.error('오류가 발생했습니다:', error);
    }
  };

  const getTopList = async () => {
    try {
      let url = `http://localhost:5000/products?category=top`;
      let response = await fetch(url);
      let data = await response.json();
      setProducts(data);
    } catch (error) {
      console.error('오류가 발생했습니다:', error);
    }
  };

  const getLowPrice = () => {
    products.sort((a, b) => {
      return a.price - b.price;
    });
    setProducts([...products]);
  };

  const getHighPrice = () => {
    products.sort((a, b) => {
      return b.price - a.price;
    });
    setProducts([...products]);
  };

  const getDiscountPrice = () => {
    products.sort((a, b) => {
      return b.discount - a.discount;
    });
    setProducts([...products]);
  };

  useEffect(() => {
    getProductList();
  }, []);

  return (
    <main className="mw shopAll">
      <h2>ShopAll</h2>
      <nav>
        <button onClick={getProductList}>모든 상품</button>
        <button onClick={getNewList}>신상품</button>
        <button onClick={getTopList}>인기상품</button>
        <hr />
        <button onClick={getLowPrice}>낮은 가격순</button>
        <button onClick={getHighPrice}>높은 가격순</button>
        <button onClick={getDiscountPrice}>높은 할인률</button>
      </nav>
      <ul className="listCon">
        {products.map((product) => {
          return (
            <li key={product.id}>
              <ListCard product={product} />
            </li>
          );
        })}
      </ul>
    </main>
  );
};

export default ShopAll;
