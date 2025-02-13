import { Outlet } from 'react-router-dom';
import '../index.css';
import Header from './Header';
import Footer from './Footer';

const BaseLayout = () => {
  return (
    <>
      <div className="wrapper">
        <Header />
        <div className="content">
          <Outlet />
        </div>
        <Footer />
      </div>
    </>
  );
};

export default BaseLayout;
