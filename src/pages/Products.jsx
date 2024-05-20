import style from '../css/Detail.module.css';
import { Tab, Tabs } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import Button from 'react-bootstrap/Button';
import { Swiper, SwiperSlide } from 'swiper/react';
import Modal from 'react-bootstrap/Modal';

import 'swiper/css';
import 'swiper/css/pagination';
import { Pagination } from 'swiper/modules';

import { useAsyncError, useNavigate, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';

import ListCard from '../components/ListCard';
import { addItem } from '../store/cartStore';

const Products = () => {
  const { id } = useParams();
  console.log('useparams', id);

  const [products, setProducts] = useState([]);
  const [similarList, setSimilarList] = useState([]);
  const [count, setCount] = useState(1);

  let navigate = useNavigate();

  // id가 일치하는 하나의 상품
  const getProductList = async () => {
    try {
      let url = `http://localhost:5000/products/${id}`;
      let response = await fetch(url);
      let data = await response.json();
      setProducts(data);

      let url2 = `http://localhost:5000/products?category=${data.category}`;
      let response2 = await fetch(url2);
      let data2 = await response2.json();
      setSimilarList(data2);
    } catch (error) {
      console.error('오류가 발생했습니다:', error);
    }
  };

  useEffect(() => {
    getProductList();
  }, [id]);

  const increase = () => {
    setCount(count + 1);
  };

  const decrease = () => {
    setCount(count - 1);
  };

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  let dispatch = useDispatch();
  return (
    <main className="mw">
      <h2>상품 상세 페이지</h2>
      <section className={style.productCon}>
        <div className={style.imgCon}>
          <img src={`/img/${products?.img}`} alt={products?.title} />
        </div>
        <div className={style.pInfo}>
          <p>상품명 : {products?.title}</p>
          <p>가격 : {Number(products?.price).toLocaleString()}원</p>
          <p>할인률 : {products?.discount}%</p>
          <div className={style.count}>
            <span>수량</span>
            {count === 1 ? (
              <button onClick={decrease} disabled>
                -
              </button>
            ) : (
              <button onClick={decrease}>-</button>
            )}

            <span>{count}</span>
            <button onClick={increase}>+</button>
          </div>
          <button
            onClick={() => {
              handleShow();
            }}
          >
            장바구니
          </button>
        </div>
      </section>
      <section className={style.pDesc}>
        <Tabs
          defaultActiveKey="Description"
          id="fill-tab-example"
          className="mb-3"
        >
          <Tab eventKey="Description" title="Description">
            Tab content for Home
          </Tab>
          <Tab eventKey="Addtional information" title="Addtional information">
            Tab content for Profile
          </Tab>
          <Tab eventKey="Reviews" title="Reviews">
            Tab content for Loooonger Tab
          </Tab>
        </Tabs>
      </section>
      <section>
        <Swiper
          slidesPerView={4}
          spaceBetween={30}
          pagination={{
            clickable: true,
          }}
          modules={[Pagination]}
          className="mySwiper"
        >
          {similarList.map((p) => (
            <SwiperSlide key={p.id}>
              <ListCard product={p} />
            </SwiperSlide>
          ))}
        </Swiper>
      </section>

      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>장바구니에 추가되는 상품 정보</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          추가되는 상품 정보를 다시 보여줄 수도 있음
          <p>{products?.title}</p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button
            variant="primary"
            onClick={() => {
              dispatch(
                addItem({
                  id: products.id,
                  title: products.title,
                  img: products.img,
                  price: products.price,
                  category: products.category,
                  discount: products.discount,
                  count: count,
                })
              );
              navigate('/cart');
            }}
          >
            Understood
          </Button>
        </Modal.Footer>
      </Modal>
    </main>
  );
};

export default Products;
