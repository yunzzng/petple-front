import userAuthStore from "@/zustand/userAuth";
import profile from "/images/profile.png";
import style from "./avartar.module.css";
import { FC } from "react";

interface AvartarProps {
  onClick?: () => void;
}

const Avartar: FC<AvartarProps> = (props) => {
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

export default Avartar;
