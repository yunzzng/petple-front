import profileImg from "/images/profile.png";
import { useForm } from "react-hook-form";
import userAuthStore from "@/zustand/userAuth";
import Buttons from "@/components/Button";

// const { userNickName } = userAuthStore();

// type NicknameFields = {
//   nickName?: string | null;
// };

// // const defaultNickname = {
// //   nickName: userNickName,
// // };

const Profile = () => {
  // const {
  //   register,
  //   handleSubmit,
  //   formState: { errors },
  // } = useForm<NicknameFields>({ defaultValues: defaultNickname });

  // const onSubmitUser = () => {}; // 회원정보 수정

  // const onSubmitPet = () => {}; //반려동물 정보 저장,수정

  // const nickNameConfirm = () => {}; // 닉네임 중복 확인

  return (
    <>
      {/* <form onSubmit={handleSubmit(onSubmitUser)}>
        <ul>
          <li>
            <img src={profileImg} />
          </li>
          <li>
            <input
              {...register("nickName", {
                required: true,
              })}
            />
            <Buttons onClick={nickNameConfirm}>중복확인</Buttons>
          </li>
          <Buttons>회원정보 수정</Buttons>
        </ul>
      </form> */}
    </>
  );
};

export default Profile;
