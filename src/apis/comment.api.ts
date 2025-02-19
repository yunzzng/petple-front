import baseInstance from "./axios";

const addComment = async (data: {
  postId: string;
  description: string;
  hasParent: boolean;
}) => {
  try {
    await baseInstance.post("/comments", data);
  } catch (error) {
    throw error;
  }
};

const deleteComment = async (data: { postId: string; commentId: string }) => {
  try {
    await baseInstance.delete(
      `/posts/${data.postId}/comments/${data.commentId}`
    );
  } catch (error) {
    throw error;
  }
};

const updateComment = async (data: {
  _id: string;
  description: string;
  postId: string;
}) => {
  try {
    await baseInstance.patch(`/comments/${data._id}`, {
      description: data.description,
      postId: data.postId,
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
    await baseInstance.post("/comments/replies", data);
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
