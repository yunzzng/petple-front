import profileImg from "/images/profile.png";
import { useForm } from "react-hook-form";
import userAuthStore from "@/zustand/userAuth";
import { Button } from "@/components";
import { ChangeEvent, useEffect, useRef, useState } from "react";
import style from "@/pages/Profile/profile.module.css";
import { imageUpload } from "@/utils/imageUpload";
import pencil from "/images/pencil.png";
import prev from "/images/prev.png";
import { checkNickName, updateUserInfo } from "@/apis/profile.api";
import { zodResolver } from "@hookform/resolvers/zod";
import { userSchema } from "@/consts/zodSchema";
import AddressForm from "@/components/AddressForm";
import { AddressType } from "@/types/user.type";

const addressDefaultValue: AddressType = {
  jibunAddress: "",
  location: {
    type: "Point",
    coordinates: [null, null],
  },
};

const UserProfileForm = () => {
  const { userNickName, userImage, userEmail, userAddress } = userAuthStore();

  const { handleSubmit, getValues, setValue, watch, reset } = useForm({
    defaultValues: {
      nickName: userNickName || "",
    },
    resolver: zodResolver(userSchema),
  });

  const fileInputRef = useRef<HTMLInputElement>(null);
  const [previewImg, setPreviewImg] = useState<string>(userImage || profileImg);
  const [file, setFile] = useState<File | null>(null);
  const [updating, setUpdating] = useState(false);
  const [isNickNameConfirm, setIsNickNameConfirm] = useState<boolean>(false);
  const [confirmedNickName, setConfirmedNickName] = useState<string | null>(
    userNickName || ""
  );
  const [selectedAddress, setSelectedAddress] = useState<AddressType>(
    userAddress ?? addressDefaultValue
  );

  useEffect(() => {
    if (userImage) {
      setPreviewImg(userImage);
    }
  }, [userImage]);

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

  const handleChangeNickName = (e: ChangeEvent<HTMLInputElement>) => {
    setValue("nickName", e.target.value);
    setIsNickNameConfirm(false);
  };

  // 회원정보 수정
  const onSubmitUser = async () => {
    const nickName = getValues("nickName");
    let imageUrl = userImage;

    if (file) {
      imageUrl = await imageUpload(file);
      if (imageUrl) {
        userAuthStore.setState({ userImage: imageUrl });
      }
    }

    const isNickNameChanged = nickName !== userNickName;

    if (
      isNickNameChanged &&
      (!isNickNameConfirm || nickName !== confirmedNickName)
    ) {
      alert("닉네임 중복 확인을 해주세요.");
      return;
    }

    if (
      nickName === userNickName &&
      imageUrl === userImage &&
      JSON.stringify(selectedAddress) === JSON.stringify(userAddress)
    ) {
      setUpdating(false);
      return;
    }

    const success = await updateUserInfo(
      userEmail,
      nickName,
      imageUrl ?? "",
      selectedAddress
    );

    if (success) {
      userAuthStore.setState({
        userNickName: nickName,
        userImage: imageUrl,
        userAddress: selectedAddress,
      });

      alert("회원정보 수정 완료");
      setUpdating(false);
    } else {
      alert("회원정보 수정에 실패했습니다.");
    }
  };

  // 닉네임 중복 확인
  const nickNameConfirm = async () => {
    const nickName = getValues("nickName");

    if (nickName === userNickName) {
      setIsNickNameConfirm(true);
      setConfirmedNickName(nickName);
    }

    if (!nickName) {
      alert("닉네임을 입력해주세요.");
      return;
    }

    if (nickName.length > 10) {
      alert("닉네임은 10글자 이하로 입력해주세요.");
      return;
    }

    if (nickName === userNickName) {
      setIsNickNameConfirm(true);
      alert("사용가능한 닉네임 입니다.");
      return;
    }

    const isAvailable = await checkNickName(nickName);
    if (isAvailable) {
      setIsNickNameConfirm(true);
      setConfirmedNickName(nickName);
      alert("사용가능한 닉네임 입니다.");
    } else {
      setIsNickNameConfirm(false);
      setConfirmedNickName(null);
      alert("이미 사용 중인 닉네임입니다.");
    }
  };

  const handlePrevProfile = () => {
    setUpdating(false);
    setPreviewImg(userImage || "");
    reset({
      nickName: userNickName || "",
    });
  };

  const [isOpen, setIsOpen] = useState<boolean>(false);

  const handleCloseModal = () => {
    setIsOpen(false);
  };

  const handleOpenModal = () => {
    setIsOpen(true);
  };

  const handleSelectAddress = (address: AddressType) => {
    setSelectedAddress(address);
  };

  return (
    <form onSubmit={handleSubmit(onSubmitUser)} className={style.form}>
      {updating ? (
        <ul className={style.userUl}>
          <img onClick={handlePrevProfile} src={prev} className={style.prev} />
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
            <label>닉네임</label>
            <div className={style.nickName_div}>
              <input
                className={style.input}
                value={watch("nickName")}
                placeholder="닉네임은 1글자 이상, 10글자 이하"
                onChange={handleChangeNickName}
              />
              <Button
                type="button"
                onClick={nickNameConfirm}
                className={style.button}
              >
                중복확인
              </Button>
            </div>
          </li>
          <li className={style.nickname_wrap}>
            <label>주소</label>
            <div className={style.nickName_div}>
              <input
                value={selectedAddress.jibunAddress}
                className={style.input}
                onClick={handleOpenModal}
              />
              <AddressForm
                closeModal={handleCloseModal}
                openModal={handleOpenModal}
                isOpen={isOpen}
                onSelectAddress={handleSelectAddress}
              />
            </div>
          </li>
          <Button type="submit" className={style.button}>
            회원정보 수정
          </Button>
        </ul>
      ) : (
        <ul className={style.userUl}>
          <div className={style.userUl_div}>
            <img src={userImage || ""} className={style.basic_img} />
            <div className={style.userName_box}>
              <p>{userNickName}</p>
              <img
                onClick={() => setUpdating(true)}
                src={pencil}
                className={style.pencil}
              />
            </div>
            <p className={style.address}>{selectedAddress.jibunAddress}</p>
          </div>
        </ul>
      )}
    </form>
  );
};

export default UserProfileForm;
