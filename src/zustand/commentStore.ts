import { CommentSubmitType, CommentType, ReplyType } from "@/types/post.type";
import { create } from "zustand";

interface CommentStore {
  postId: string | null;
  targetComment: CommentType | null;
  targetReply: ReplyType | null;
  submitType: CommentSubmitType;
  resetForm: () => void;

  setPostId: (postId: string) => void;
  setTargetComment: (targetComment: CommentType | null) => void;
  setTargetReply: (targetReply: ReplyType | null) => void;
  setSubmitType: (submitType: CommentSubmitType) => void;
  setResetForm: (resetFn: () => void) => void;
  initState: () => void;
}

export const useCommentStore = create<CommentStore>((set) => ({
  postId: null,
  targetComment: null,
  targetReply: null,
  submitType: "ADD_COMMENT",
  resetForm: () => {},

  setPostId: (postId: string) => set({ postId }),
  setTargetComment: (targetComment: CommentType | null) =>
    set({ targetComment }),
  setTargetReply: (targetReply: ReplyType | null) => set({ targetReply }),
  setSubmitType: (submitType: CommentSubmitType) => set({ submitType }),
  setResetForm: (resetFn: () => void) => set({ resetForm: resetFn }),
  initState: () =>
    set({
      submitType: "ADD_COMMENT",
      targetComment: null,
      targetReply: null,
    }),
}));
