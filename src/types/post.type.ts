import { CommentSchema, postFormSchema } from "@/consts/zodSchema";
import { z } from "zod";

/* Post comment type */
export type ReplyType = {
  creatorId: string;
  name: string;
  profileImage: string;
  email: string;
  description: string;
  tag: string;
  hasParent: boolean;
  _id: string;
  createdAt: Date;
};

export type CommentType = {
  _id: string;
  creator: {
    _id: string;
    name: string;
    email: string;
    nickName: string;
    image: string;
  };
  post: PostItem;
  description: string;
  replies: ReplyType[];
  hasParent: boolean;
  createdAt: string;
};

export type PostFormData = {
  tags: Array<string>;
  images: Array<string>;
  description: string;
  _id: string;
};

export type PostItem = PostFormData & {
  creator: {
    _id: string;
    name: string;
    email: string;
    nickName: string;
    profileImage: string;
  };
  comments: string[];
  likes: string[];
  likesCount: number;
  createdAt: Date;
};

export type CommentSubmitType =
  | "ADD_COMMENT"
  | "UPDATE_COMMENT"
  | "ADD_REPLY"
  | "UPDATE_REPLY";

export type PostFormFields = z.infer<typeof postFormSchema>;
export type CommentFormFields = z.infer<typeof CommentSchema>;
