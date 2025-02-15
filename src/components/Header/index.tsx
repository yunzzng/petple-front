import { useNavigate } from "react-router-dom";
import logo from "/images/logo.png";
import style from "./header.module.css";
import userAuthStore from "@/zustand/userAuth";
import profile from "/images/profile.png";
import axios from "axios";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useEffect } from "react";

const getUserInfo = async () => {
  try {
    const response = await axios.get("/api/user/info");

    if (response.status === 200) {
      const user = response.data.user;
      return user;
    }
  } catch (error) {
    console.error("유저 정보 가져오기 실패", error);
  }
};

const Header = () => {
  const navigate = useNavigate();
  const { isLoggedIn } = userAuthStore();
  const queryClient = useQueryClient();

  const loginStatus = Boolean(document.cookie.split("=")[1]);

  const query = useQuery({
    queryKey: ["userInfo"],
    queryFn: getUserInfo,
    enabled: loginStatus,
  });

  useEffect(() => {
    queryClient.invalidateQueries({ queryKey: ["userInfo"] });

    if (query.data) {
      userAuthStore.setState({
        isLoggedIn: true,
        userId: query.data.id,
        userEmail: query.data.email,
        userNickName: query.data.nickName,
        userImage: query.data.image,
      });
    }
  }, [query.data]);

  const handleLogout = async () => {
    try {
      const response = await axios.post("/api/user/logout");

      if (response.status === 200) {
        userAuthStore.setState({
          isLoggedIn: false,
          userId: null,
          userEmail: null,
        });
        queryClient.removeQueries({ queryKey: ["userInfo"] });
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
