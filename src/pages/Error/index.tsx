import { useNavigate } from "react-router-dom";
import styles from "./error.module.css";
import logo from "/images/logo.png";
import { Button } from "@/components";

const ErrorPage = () => {
  const navigate = useNavigate();

  const handleHomeClick = () => {
    navigate("/", { replace: true });
  };

  return (
    <div className={styles.errorWrapper}>
      <div className={styles.errorContainer}>
        <img src={logo} alt="PETPLE Logo" className={styles.logo} />
        <h1 className={styles.errorTitle}>404 ERROR</h1>
        <p className={styles.errorMessage}>
          죄송합니다. 페이지를 찾을 수 없습니다.
        </p>
        <p className={styles.errorMessage}>
          존재하지 않는 주소를 입력하셨거나, 요청하신 페이지의 주소가 변경,
          삭제되어 찾을 수 없습니다.
        </p>
        <Button className={styles.homeButton} onClick={handleHomeClick}>
          홈으로
        </Button>
      </div>
    </div>
  );
};

export default ErrorPage;
