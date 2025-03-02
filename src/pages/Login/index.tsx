import style from "./signup.module.css";

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
              <img
                src={"/images/googleCircle.png"}
                className={style.img}
                alt="구글 자동 로그인"
              />
            </a>
            <a onClick={handleKakaoLogin}>
              <img
                src={"/images/icons/btn_kakao.svg"}
                className={style.img}
                alt="카카오톡 로그인"
              />
            </a>
            <a onClick={handleNaverLogin}>
              <img
                src={"/images/btn_naver.png"}
                className={style.img}
                alt="네이버 자동 로그인"
              />
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
