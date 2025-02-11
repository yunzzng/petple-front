import { useNavigate } from "react-router-dom";
import logo from "/images/logo.png";
import style from "./css/header.module.css";

const Header = () => {
  const navigate = useNavigate();
  return (
    <div className={style.total_wrap}>
      <div className={style.content}>
        <div>
          <img src={logo} className={style.img} />
        </div>
        <ul>
          <li onClick={() => navigate("/")}>펫톡</li>
          <li onClick={() => navigate("/")}>펫메디</li>
          <li onClick={() => navigate("/")}>펫플레이스</li>
          <li onClick={() => navigate("/")} className={style.login}>
            LOGIN
          </li>
          <li onClick={() => navigate("/")} className={style.login}>
            SIGNUP
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Header;
