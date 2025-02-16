import baseInstance from "./axios";

const addComment = async (data: {
  postId: string;
  description: string;
  hasParent: false;
}) => {
  try {
    const response = await baseInstance.post("/comments", data);
    if (!response.data.success) {
      throw new Error(response.data.message);
    }
  } catch (error) {
    throw error;
  }
};

const deleteComment = async (id: string) => {
  try {
    await baseInstance.delete(`/comments/${id}`);
  } catch (error) {
    throw error;
  }
};

const updateComment = async (data: { _id: string; description: string }) => {
  try {
    await baseInstance.patch(`/comments/${data._id}`, {
      description: data.description,
    });
  } catch (error) {
    throw error;
  }
};

const addReply = async (data: {
  targetCommentId: string;
  description: string;
  tag: string;
}) => {
  try {
    await baseInstance.post("/comments/reply", data);
  } catch (error) {
    throw error;
  }
};

const deleteReply = async (data: { commentId: string; replyId: string }) => {
  try {
    await baseInstance.delete(
      `/comments/${data.commentId}/replies/${data.replyId}`
    );
  } catch (error) {
    throw error;
  }
};

const updateReply = async (data: {
  description: string;
  commentId: string;
  replyId: string;
}) => {
  try {
    await baseInstance.patch(
      `/comments/${data.commentId}/replies/${data.replyId}`,
      { description: data.description }
    );
  } catch (error) {
    throw error;
  }
};

export {
  addComment,
  deleteComment,
  updateComment,
  addReply,
  deleteReply,
  updateReply,
};
