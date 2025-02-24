import { useNavigate } from "react-router-dom";
import logo from "/images/logo.png";
import style from "./header.module.css";
import userAuthStore from "@/zustand/userAuth";
import axios from "axios";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useEffect } from "react";
import Avartar from "../Avartar";
import { recieveUserInfo } from "@/apis/profile.api";

const getUserInfo = async () => {
  try {
    const response = await recieveUserInfo();
    if (response) {
      const user = response;
      return user;
    }
  } catch (error) {
    console.error("유저 정보 가져오기 실패", error);
  }
};

const Header = () => {
  const navigate = useNavigate();
  const { userImage } = userAuthStore();
  const queryClient = useQueryClient();

  const loginStatus = Boolean(document.cookie.split("=")[1]); //예외처리 추가

  const query = useQuery<any>({
    queryKey: ["userInfo"],
    queryFn: getUserInfo,
    enabled: loginStatus,
  });

  useEffect(() => {
    if (query.data) {
      userAuthStore.setState({
        userId: query.data.id,
        userEmail: query.data.email,
        userNickName: query.data.nickName,
        userImage: query.data.image,
        userPet: query.data.pet,
        userAddress: query.data.address,
      });
    }
  }, [query.data]);

  const handleLogout = async () => {
    try {
      const response = await axios.post("/api/user/logout");

      if (response.status === 200) {
        userAuthStore.setState({
          userId: null,
          userEmail: null,
          userNickName: null,
          userImage: null,
          userPet: null,
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
          {loginStatus ? (
            <>
              <li className={style.login}>
                <a onClick={handleLogout}>LOGOUT</a>
              </li>
              <li>
                <Avartar
                  onClick={() => navigate("/profile")}
                  image={userImage}
                  className={style.avartar}
                />
              </li>
            </>
          ) : (
            <>
              <li className={style.login}>
                <a onClick={() => navigate("/login")}>LOGIN</a>
              </li>
            </>
          )}
        </ul>
      </div>
    </header>
  );
};

export default Header;
