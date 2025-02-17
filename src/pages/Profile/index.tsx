import profileImg from "/images/profile.png";
import { useForm } from "react-hook-form";
import userAuthStore from "@/zustand/userAuth";
import { Button } from "@/components";
import axios from "axios";
import { ChangeEvent, useEffect, useRef, useState } from "react";
import style from "./profile.module.css";
import { imageUpload } from "@/utils/imageUpload";
import plus from "/images/plus.png";

const Profile = () => {
  const { userNickName, userImage } = userAuthStore();

  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues,
    setError,
    setValue,
  } = useForm({
    defaultValues: {
      nickName: userNickName || "",
    },
  });

  const [previewImg, setPreviewImg] = useState<string>(profileImg);
  const [file, setFile] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (userImage) {
      setPreviewImg(userImage);
    }
  }, []);

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

  // 회원정보 수정
  const onSubmitUser = async () => {
    const nickName = getValues("nickName");
    let imageUrl = userImage;

    if (file) {
      imageUrl = await imageUpload(file);
    }

    // 수정 전 닉네임, 이메일과 같으면 api요청 x
    if (nickName === userNickName && imageUrl === userImage) {
      alert("회원정보 수정 완료");
      return;
    }

    try {
      const response = await axios.post("/api/user/info/update", {
        userNickName: nickName,
        profileImg: imageUrl,
      });

      if (response.status === 200) {
        alert("회원정보 수정 완료");
      }

      userAuthStore.setState({
        userNickName: nickName,
        userImage: imageUrl,
      });
    } catch (error) {
      console.error("회원정보 수정 실패", error);
    }
  };

  const onSubmitPet = () => {}; //반려동물 정보 저장,수정

  // 닉네임 중복 확인
  const nickNameConfirm = async () => {
    const nickName = getValues("nickName");

    if (!nickName) {
      alert("닉네임을 입력해주세요.");
      return;
    }

    try {
      const response = await axios.post("/api/user/nickname/check", {
        nickName,
      });

      if (response.status === 200) {
        setError("nickName", { message: "사용 가능한 닉네임입니다." });
      }
    } catch (error) {
      setError("nickName", { message: "이미 사용 중인 닉네임입니다." });
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit(onSubmitUser)} className={style.form}>
        <ul className={style.userUl}>
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
          <li className={style.nickname_wrap}>
            <div className={style.nickName_div}>
              <input
                className={style.input}
                {...register("nickName", {
                  required: true,
                })}
              />
              <Button
                type="button"
                onClick={nickNameConfirm}
                className={style.button}
              >
                중복확인
              </Button>
            </div>
            <p className={style.error}>{errors.nickName?.message}</p>
          </li>
          <Button type="submit" className={style.button}>
            회원정보 수정
          </Button>
        </ul>
        <div className={style.pet_wrap}>
          <div className={style.pet_div}>
            <p>나의 반려동물 프로필</p>
            <img src={plus} className={style.plus} />
          </div>
          {/* <form>
            <ul className={style.pet_ul}>
              <li>
                <input className={style.input} placeholder="이름" />
              </li>
              <li>
                <input className={style.input} placeholder="나이" />
              </li>
              <li>
                <input className={style.input} placeholder="품종" />
              </li>
              <li>
                <input className={style.input} placeholder="성별" />
              </li>
            </ul>
          </form> */}
        </div>
      </form>
    </>
  );
};

export default Profile;
