import Header from "@/components/Header";
import style from "./signup.module.css";
import google from "/images/google.png";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Buttons from "@/components/Button";
import userAuthStore from "@/zustand/userAuth";

type SignupFields = {
  email: string;
  password: string;
};

const defaultLoginFormValues = {
  email: "",
  password: "",
};

const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignupFields>({
    defaultValues: defaultLoginFormValues,
  });
  const navigate = useNavigate();

  const onSubmit = async (data: SignupFields) => {
    try {
      const response = await axios.post("/api/user/login", {
        email: data.email,
        password: data.password,
      });

      if (response.status === 200) {
        alert("로그인 성공");

        userAuthStore.setState({
          isLoggedIn: true,
          userId: response.data.user.id,
          userEmail: response.data.user.email,
        });
        console.log(response.data.user);
        console.log(response.data.user.id);
        navigate("/");
        console.log("로그인 상태:", userAuthStore.getState());
      }
    } catch (error) {
      alert("로그인 실패, 다시 시도해주세요.");
      console.error("로그인 실패");
    }
  };

  const handleGoogleLogin = () => {
    window.location.href = "/api/oauth/google";
  };

  return (
    <div className={style.total_wrap}>
      <Header />
      <div className={style.content}>
        <ul>
          <h1>로그인</h1>
          <form className={style.form} onSubmit={handleSubmit(onSubmit)}>
            <li>
              <input
                placeholder="이메일"
                {...register("email", {
                  required: true,
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                    message: "올바른 이메일 형식을 입력해주세요!",
                  },
                })}
              />
              {errors.email && <p>{errors.email.message}</p>}
            </li>
            <li>
              <input
                type="password"
                placeholder="비밀번호"
                {...register("password", {
                  required: true,
                  pattern: {
                    value:
                      /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[@&!%*?&])[A-Za-z\d@&!%*?&]{8,}$/,
                    message:
                      " 비밀번호는 영문,숫자,특수문자 포함 8자 이상이어야 합니다!",
                  },
                })}
              />
              {errors.password && <p>{errors.password.message}</p>}
            </li>
            <button className={style.signupBtn}>로그인</button>
            <p onClick={() => navigate("/signup")} className={style.navigate}>
              계정이 없으신가요?
            </p>
          </form>
          <div className={style.oauth}>
            <p>sns로 로그인하기</p>
          </div>
          <Buttons className={style.googleBtn} onClick={handleGoogleLogin}>
            <img src={google} />
          </Buttons>
        </ul>
      </div>
    </div>
  );
};

export default Login;
