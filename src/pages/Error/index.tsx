import { useNavigate } from "react-router-dom";
import styles from "./error.module.css";
// import logo from "/images/logo.png";
import { Button } from "@/components";
import { useRouteError } from "react-router-dom";
import { AxiosError } from "axios";

const DEFAULT_ERROR_MESSAGE =
  "존재하지 않는 주소를 입력하셨거나, 요청하신 페이지의 주소가 변경, 삭제되어 찾을 수 없습니다.";

const ErrorPage = () => {
  const navigate = useNavigate();
  const error = useRouteError();

  let errorMessage = DEFAULT_ERROR_MESSAGE;
  let errorStatus: number | null = null;

  if (error instanceof AxiosError && error.response) {
    errorMessage = error.response.data.message || DEFAULT_ERROR_MESSAGE;
    errorStatus = error.response.status;
  } else if (error instanceof Error) {
    errorMessage = error.message;
  }

  return (
    <div className={styles.errorWrapper}>
      <div className={styles.errorContainer}>
        <img src={"/images/logo.png"} alt="PETPLE Logo" className={styles.logo} />
        {errorStatus && (
          <h1 className={styles.errorTitle}>{errorStatus} ERROR</h1>
        )}
        <p className={styles.errorMessage}>{errorMessage}</p>
        <Button
          className={styles.homeButton}
          onClick={() => navigate("/", { replace: true })}
        >
          홈으로
        </Button>
      </div>
    </div>
  );
};

export default ErrorPage;
