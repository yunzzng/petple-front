import { Button } from "@/components";
import styles from "./formheader.module.css";
import { useNavigate } from "react-router-dom";

interface FormHeaderProps {
  onClickSubmit: () => void;
  onClickDelete?: () => void;
  reqeustType: "create" | "update";
  isButtonDisabled?: boolean;
}

const FormHeader = ({
  onClickSubmit,
  onClickDelete,
  reqeustType,
  isButtonDisabled,
}: FormHeaderProps) => {
  const navigate = useNavigate();
  return (
    <header className={styles.form_header}>
      <div>
        <button className={styles.cancel_button} onClick={() => navigate(-1)}>
          취소
        </button>
        {reqeustType === "update" && (
          <button className={styles.delete_button} onClick={onClickDelete}>
            삭제 하기
          </button>
        )}
      </div>
      <Button
        type="submit"
        label={reqeustType === "create" ? "등록 하기" : "수정 하기"}
        onClick={onClickSubmit}
        className={styles.post_button}
        disabled={isButtonDisabled}
      />
    </header>
  );
};

export default FormHeader;
