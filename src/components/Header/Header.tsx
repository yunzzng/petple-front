import { useNavigate } from "react-router-dom";
import logo from "/images/logo.png";
import style from "./css/header.module.css";

const Header = () => {
  const navigate = useNavigate();
  return (
    <div className={style.total_wrap}>
      <div className={style.content}>
        <div>
          <a onClick={() => navigate("/")}>
            <img src={logo} className={style.img} />
          </a>
        </div>
        <ul>
          <li>
            <a onClick={() => navigate("/")}>펫톡</a>
          </li>
          <li>
            <a onClick={() => navigate("/")}>펫메디</a>
          </li>
          <li>
            <a onClick={() => navigate("/")}>펫플레이스</a>
          </li>
          <li className={style.login}>
            <a onClick={() => navigate("/login")}>LOGIN</a>
          </li>
          <li className={style.login}>
            <a onClick={() => navigate("/signup")}>SIGNUP</a>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Header;
