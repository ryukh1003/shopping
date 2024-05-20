import { Link, Outlet } from 'react-router-dom';

const Company = () => {
  return (
    <section className="mw">
      <h2 style={{ fontSize: '2rem', padding: '2rem 0' }}>Our Story</h2>
      <div style={{ height: '300px', backgroundColor: 'lightcoral' }}>
        원 뎁스에 관련된 이미지가 들어가는 곳
      </div>
      <nav
        style={{
          display: 'flex',
          justifyContent: 'center',
          gap: '2rem',
          padding: '2rem 0',
        }}
      >
        <Link to="/company/ceo">CEO 인사말</Link>
        <Link to="/company/organization">조직도 소개</Link>
        <Link to="/company/ci">CI</Link>
      </nav>
      <Outlet></Outlet>
    </section>
  );
};

export default Company;
