import baseInstance from "./axios";

const getPrevMessages = async (targetUserNickname: string) => {
  try {
    const response = await baseInstance.get(
      `/chat/messages/${targetUserNickname}`
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

export { getPrevMessages };
