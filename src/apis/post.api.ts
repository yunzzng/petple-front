import { Post } from "@/types/post.type";
import baseInstance from "./axios";

const getPosts = async (pageParam: number) => {
  try {
    const response = await baseInstance.get(`/posts?page=${pageParam}`);
    if (!response.data.success) {
      throw new Error(response.data.message);
    }
    return response.data;
  } catch (error) {
    throw error;
  }
};

const getPostById = async (id: string) => {
  try {
    const response = await baseInstance.get(`/posts/post/${id}`);
    if (!response.data.success) {
      throw new Error(response.data.message);
    }
    return response.data.post;
  } catch (error) {
    throw error;
  }
};

const addPost = async (data: {
  tags: Array<string>;
  images: Array<string>;
  description: string;
}) => {
  try {
    const response = await baseInstance.post("/posts/post", data);
    if (!response.data.success) {
      throw new Error(response.data.message);
    }
  } catch (error) {
    throw error;
  }
};

const updatePostById = async ({ post, id }: { post: Post; id: string }) => {
  try {
    const response = await baseInstance.put(`/posts/post/${id}`, post);
    if (!response.data.success) {
      throw new Error(response.data.message);
    }
  } catch (error) {
    throw error;
  }
};

const deletePostById = async (id: string) => {
  try {
    const response = await baseInstance.delete(`/posts/post/${id}`);
    if (!response.data.success) {
      throw new Error(response.data.message);
    }
  } catch (error) {
    throw error;
  }
};

export { addPost, getPostById, updatePostById, deletePostById, getPosts };
