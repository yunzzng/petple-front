import style from "../../Profile/profile.module.css";
import { Avartar } from "@/components";

interface SelectedProfileFormProps {
  userImage: string;
  userNickName: string;
}

const SelectedProfileForm = (props: SelectedProfileFormProps) => {
  const { userImage, userNickName } = props;
  return (
    <ul className={style.userUl}>
      <div className={style.userUl_div}>
        <Avartar
          image={userImage || ""}
          className={style.basic_img}
          alt="프로필 이미지"
        />
        <div className={style.userName_box}>
          <p>{userNickName}</p>
        </div>
      </div>
    </ul>
  );
};

export default SelectedProfileForm;
