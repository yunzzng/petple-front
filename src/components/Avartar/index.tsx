import profile from "/images/profile.png";
import style from "./avartar.module.css";
import { FC } from "react";

interface AvartarProps {
  onClick?: () => void;
  image?: string;
}

const Avartar: FC<AvartarProps> = (props) => {
  const { onClick, image } = props;

  return (
    <>
      <a onClick={onClick} className={style.a}>
        <img src={image || profile} className={style.image} />
      </a>
    </>
  );
};

export default Avartar;
