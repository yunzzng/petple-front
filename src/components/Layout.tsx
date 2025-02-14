import { Outlet } from "react-router-dom";
import "../index.css";
import Header from "./Header";
import MenuBar from "./MenuBar";

const BaseLayout = () => {
  return (
    <>
      <div className="wrapper">
        <Header />
        <div className="content">
          <Outlet />
        </div>
        <MenuBar />
      </div>
    </>
  );
};

export default BaseLayout;
