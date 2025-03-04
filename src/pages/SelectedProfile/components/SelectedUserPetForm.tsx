import style from "../selectedProfile.module.css";

import { FC } from "react";

import { Pet } from "@/types/user.type";

const SelectedUserPetForm: FC<Pet> = (props) => {
  const { name, age, image, breed } = props;

  return (
    <div className={style.petForm_total_wrap}>
      <ul className={style.pet_ul}>
        <li>
          <img src={image} className={style.img} alt="반려동물 사진" />
        </li>
        <li>
          <p>
            {name} / {age} / {breed}
          </p>
        </li>
      </ul>
    </div>
  );
};

export default SelectedUserPetForm;
