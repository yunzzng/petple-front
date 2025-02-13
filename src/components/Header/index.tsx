import { useNavigate } from "react-router-dom";
import logo from "/images/logo.png";
import style from "./header.module.css";
import userAuthStore from "@/zustand/userAuth";
import profile from "/images/profile.png";

const Header = () => {
  const navigate = useNavigate();
  const { isLoggedIn } = userAuthStore();

  const handleLogout = () => {
    userAuthStore.setState({
      isLoggedIn: false,
      userId: null,
      userEmail: null,
    });
    navigate("/login");
  };

  return (
    <div className={style.total_wrap}>
      <div className={style.content}>
        <div>
          <a onClick={() => navigate("/")}>
            <img src={logo} className={style.img} />
          </a>
        </div>
        <ul>
          {isLoggedIn ? (
            <>
              <li className={style.login}>
                <a onClick={handleLogout}>LOGOUT</a>
              </li>
              <li>
                <a onClick={() => navigate("/profile")}>
                  <img src={profile} className={style.profileImage} />
                </a>
              </li>
            </>
          ) : (
            <>
              <li className={style.login}>
                <a onClick={() => navigate("/login")}>LOGIN</a>
              </li>
              <li className={style.login}>
                <a onClick={() => navigate("/signup")}>SIGNUP</a>
              </li>
            </>
          )}
        </ul>
      </div>
    </div>
  );
};

export default Header;
