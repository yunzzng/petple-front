import { Outlet } from 'react-router-dom';
import '../index.css';

const BaseLayout = () => {
  return (
    <>
      <div className="wrapper">
        <div className="content">
          <Outlet />
        </div>
      </div>
    </>
  );
};

export default BaseLayout;
