import userAuthStore from "@/zustand/userAuth";
import profile from "/images/profile.png";
import style from "./profileImage.module.css";
import { FC } from "react";

interface ProfileImageProps {
  onClick?: () => void;
}

const ProfileImage: FC<ProfileImageProps> = (props) => {
  const { onClick } = props;
  const { userImage } = userAuthStore();

  return (
    <>
      <a onClick={onClick} className={style.a}>
        <img src={userImage || profile} className={style.image} />
      </a>
    </>
  );
};

export default ProfileImage;
