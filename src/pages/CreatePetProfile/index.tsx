import { ChangeEvent, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import userAuthStore from "@/zustand/userAuth";
import style from "./createPetProfile.module.css";
import axios from "axios";
import { Button } from "@/components";
import { useNavigate } from "react-router-dom";
import { imageUpload } from "@/utils/imageUpload";
import dog from "/images/dog.png";
import { Pet } from "@/types/user.type";
import { zodResolver } from "@hookform/resolvers/zod";
import { petSchema } from "@/consts/zodSchema";

const petDefaultValues = {
  name: "",
  age: "",
  breed: "",
};

const CreatePetProfile = () => {
  const { userId, setUserPet, userPet } = userAuthStore();
  const navigate = useNavigate();
  const [previewImg, setPreviewImg] = useState<string>(dog);
  const [file, setFile] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: petDefaultValues,
    resolver: zodResolver(petSchema),
  });

  const handleClickFile = () => {
    fileInputRef?.current?.click();
  };

  const handleChangeImg = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const selectedFile = e.target.files[0];
      setFile(selectedFile);

      const previewUrl = URL.createObjectURL(selectedFile);
      setPreviewImg(previewUrl);
    }
  };

  const onSubmit = async (petData: Pet) => {
    let imageUrl = "";

    if (!file) {
      alert("이미지를 선택해주세요.");
      return;
    }

    imageUrl = await imageUpload(file);

    try {
      const response = await axios.post("/api/user/pet/create", {
        userId: userId,
        formData: petData,
        image: imageUrl,
      });

      if (response.status === 200) {
        alert("반려동물 프로필이 저장되었습니다.");
        navigate("/profile");

        const newPet = {
          _id: response.data.pet.id,
          name: response.data.pet.name,
          age: response.data.pet.age,
          breed: response.data.pet.breed,
          image: response.data.pet.image,
        };
        setUserPet([...(userPet || []), newPet]);
      }
    } catch (error) {
      console.error("반려동물 정보 저장 실패", error);
    }
  };

  return (
    <div className={style.petProfile_wrap}>
      <div className={style.petProfile_wrap_div}>
        <p>반려동물 프로필 만들기</p>
      </div>
      <form className={style.form} onSubmit={handleSubmit(onSubmit)}>
        <ul className={style.pet_wrap}>
          <li className={style.img_wrap}>
            <img
              onClick={handleClickFile}
              src={previewImg}
              className={style.img}
            />
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleChangeImg}
              className={style.file}
            />
          </li>
          <div>
            <li>
              <label>이름</label>
              <input type="text" {...register("name", { required: true })} />
              {errors.name && (
                <p className={style.error}>{errors.name.message}</p>
              )}
            </li>
            <li>
              <label>나이</label>
              <input type="text" {...register("age", { required: true })} />
              {errors.age && (
                <p className={style.error}>{errors.age.message}</p>
              )}
            </li>
            <li>
              <label>품종</label>
              <input type="text" {...register("breed", { required: true })} />
              {errors.breed && (
                <p className={style.error}>{errors.breed.message}</p>
              )}
            </li>
          </div>
        </ul>
        <div className={style.button_wrap}>
          <Button type="submit" className={style.button}>
            저장
          </Button>
        </div>
      </form>
    </div>
  );
};

export default CreatePetProfile;
