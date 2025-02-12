import baseInstance from "./axios";

const addPost = async (data: {
  tags: Array<string>;
  images: Array<string>;
  description: string;
}) => {
  try {
    const response = await baseInstance.post("/posts", data);
    if (!response.data.success) {
      throw new Error(response.data.message);
    }
  } catch (error) {
    throw error;
  }
};

export { addPost };
