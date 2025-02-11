import Header from "@/components/Header/Header";
import style from "./css/signup.module.css";
import google from "/images/google.png";
import { useForm } from "react-hook-form";
import { ChangeEvent } from "react";
import { useNavigate } from "react-router-dom";

type SignupFields = {
  email: string;
  name: string;
  password: string;
  passwordConfirm: string;
};

const defaultLoginFormValues = {
  email: "",
  password: "",
  name: "",
  passwordConfirm: "",
};

const Signup = () => {
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
    setError,
    clearErrors,
  } = useForm<SignupFields>({
    defaultValues: defaultLoginFormValues,
  });
  const navigate = useNavigate();

  const onSubmit = (data: SignupFields) => {
    if (data.password !== data.passwordConfirm) {
      alert("비밀번호가 일치하지 않습니다!");
      return;
    }
    alert("회원가입 성공!");
  };

  const handleChangePasswordConfirm = (e: ChangeEvent<HTMLInputElement>) => {
    const password = watch("password");
    setValue("passwordConfirm", e.target.value);

    if (e.target.value !== password) {
      setError("passwordConfirm", { message: "비밀번호가 일치하지 않습니다!" });
    } else {
      clearErrors("passwordConfirm");
    }
  };

  const handleSubmitError = (errors: any) => {
    console.log("유효성 검사 실패", errors);
  };

  return (
    <div className={style.total_wrap}>
      <Header />
      <div className={style.content}>
        <ul>
          <h1>회원가입</h1>
          <form
            className={style.form}
            onSubmit={handleSubmit(onSubmit, handleSubmitError)}
          >
            <li>
              <input
                placeholder="이름"
                {...register("name", {
                  required: true,
                })}
              />
            </li>
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
            <li>
              <input
                type="password"
                placeholder="비밀번호 확인"
                value={watch("passwordConfirm")}
                onChange={handleChangePasswordConfirm}
              />
              {errors.passwordConfirm && (
                <p>{errors.passwordConfirm.message}</p>
              )}
            </li>

            <button className={style.signupBtn}>회원가입</button>
            <p onClick={() => navigate("/login")} className={style.navigate}>
              이미 계정이 있으신가요?
            </p>
          </form>
          <div className={style.oauth}>
            <p>sns로 로그인하기</p>
          </div>
          <button className={style.googleBtn}>
            <img src={google} />
          </button>
        </ul>
      </div>
    </div>
  );
};

export default Signup;
