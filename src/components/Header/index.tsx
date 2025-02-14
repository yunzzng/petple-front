import { useNavigate } from "react-router-dom";
import logo from "/images/logo.png";
import style from "./header.module.css";
import userAuthStore from "@/zustand/userAuth";
import profile from "/images/profile.png";
import axios from "axios";

const Header = () => {
  const navigate = useNavigate();
  const { isLoggedIn } = userAuthStore();

  const handleLogout = async () => {
    try {
      const response = await axios.post("/api/user/logout");

      if (response.status === 200) {
        userAuthStore.setState({
          isLoggedIn: false,
          userId: null,
          userEmail: null,
        });
        navigate("/login");
      }
    } catch (error) {
      console.error("로그아웃 실패", error);
    }
  };

  return (
    <header className={style.total_wrap}>
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
    </header>
  );
};

export default Header;
