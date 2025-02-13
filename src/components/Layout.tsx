import { Outlet } from 'react-router-dom';
import '../index.css';
import Header from './Header';

const BaseLayout = () => {
  return (
    <>
      <div className="wrapper">
        <Header />
        <div className="content">
          <Outlet />
        </div>
      </div>
    </>
  );
};

export default BaseLayout;
