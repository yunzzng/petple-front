import { Post } from "@/types/post.type";
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

const getPostById = async (id: string) => {
  try {
    const response = await baseInstance.get(`/posts/${id}`);
    if (!response.data.success) {
      throw new Error(response.data.message);
    }
    return response.data.post;
  } catch (error) {
    throw error;
  }
};

const updatePostById = async ({ post, id }: { post: Post; id: string }) => {
  try {
    const response = await baseInstance.put(`/posts/${id}`, post);
    if (!response.data.success) {
      throw new Error(response.data.message);
    }
  } catch (error) {
    throw error;
  }
};

const deletePostById = async (id: string) => {
  try {
    const response = await baseInstance.delete(`/posts/${id}`);
    if (!response.data.success) {
      throw new Error(response.data.message);
    }
  } catch (error) {
    throw error;
  }
};

export { addPost, getPostById, updatePostById, deletePostById };
