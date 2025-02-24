import style from "../Signup/signup.module.css";
import google from "/images/googleCircle.png";
import kakao from "/images/icons/btn_kakao.svg";
import naver from "/images/btn_naver.png";

const Login = () => {
  const handleGoogleLogin = () => {
    window.location.href = "/api/oauth/google";
  };

  const handleKakaoLogin = () => {
    window.location.href = "/api/oauth/kakao";
  };

  const handleNaverLogin = () => {
    window.location.href = "/api/oauth/naver";
  };

  return (
    <div className={style.total_wrap}>
      <div className={style.content}>
        <ul>
          <div className={style.oauth_btn}>
            <a onClick={handleGoogleLogin} className={style.googleBtn}>
              <img src={google} className={style.img} />
            </a>
            <a onClick={handleKakaoLogin}>
              <img src={kakao} className={style.img} />
            </a>
            <a onClick={handleNaverLogin}>
              <img src={naver} className={style.img} />
            </a>
          </div>
          <div className={style.oauth}>
            <p>sns로 로그인하기</p>
          </div>
        </ul>
      </div>
    </div>
  );
};

export default Login;
