import { PetType } from "./user.type";

export type ChatMessageType = {
  from: {
    id: string;
    nickName: string;
    profileImage: string;
    userPet: PetType[];
  };
  to: {
    id: string;
    nickName: string;
    profileImage: string;
    userPet: PetType[];
  };
  text: string;
};
