import baseInstance from "./axios";

const updateLikes = async (data: { likeStatus: boolean; postId: string }) => {
  try {
    await baseInstance.patch(`/posts/post/${data.postId}`, {
      likeStatus: data.likeStatus,
    });
  } catch (error) {
    throw error;
  }
};

export { updateLikes };
