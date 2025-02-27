// import profile from "/images/profile.png";
import style from "./avartar.module.css";
import { FC } from "react";

interface AvartarProps {
  onClick?: () => void;
  image?: string | null;
  className?: string | null;
}

const Avartar: FC<AvartarProps> = (props) => {
  const { onClick, image, className } = props;

  return (
    <>
      <a onClick={onClick} className={style.a}>
        <img src={image || "/images/profile.png"} className={className || style.image} />
      </a>
    </>
  );
};

export default Avartar;
