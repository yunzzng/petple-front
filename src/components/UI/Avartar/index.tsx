import style from "./avartar.module.css";
import { FC } from "react";

interface AvartarProps {
  onClick?: () => void;
  image?: string | null;
  className?: string | null;
  alt?: string;
}

const Avartar: FC<AvartarProps> = (props) => {
  const { onClick, image, className, alt } = props;

  return (
    <>
      <a onClick={onClick} className={style.a}>
        <img
          src={image || "/images/profile.png"}
          className={className || style.image}
          alt={alt || "프로필 이미지"}
        />
      </a>
    </>
  );
};

export default Avartar;
