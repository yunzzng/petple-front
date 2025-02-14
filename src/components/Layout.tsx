import { Outlet } from "react-router-dom";
import "../index.css";
import Header from "./Header";
import Footer from "./Footer";

const BaseLayout = () => {
  return (
    <div className="wrraper">
      <Header />
      <main className="content">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default BaseLayout;
