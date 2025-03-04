import styles from "./comment.module.css";
import { CommentType, ReplyType } from "@/types/post.type";
import Avartar from "@/components/UI/Avartar";
import Accordion from "@/components/UI/Accordion";
import { useState } from "react";
import ArrowDownIcon from "@/assets/icons/arrow_drop_down.svg?react";
import ArrowUpIcon from "@/assets/icons/arrow_drop_up.svg?react";

interface CommentProps {
  comments: CommentType[];
  signinedUserId: string | null;
  handleReply: (comment: CommentType) => void;
  handleDeleteReply: (commentId: string, replyId: string) => void;
  handleUpdateReply: (targetReply: ReplyType) => void;
  handleDeleteComment: (id: string) => void;
  handleUpdateComment: (targetComment: CommentType) => void;
}

const Comment = ({
  comments,
  signinedUserId,
  handleReply,
  handleDeleteReply,
  handleUpdateReply,
  handleDeleteComment,
  handleUpdateComment,
}: CommentProps) => {
  return (
    <ul className={styles.comments_wrapper}>
      {comments.map((comment) => (
        <li key={`post-comment-${comment._id}`}>
          <div className={styles.comment_body}>
            <Avartar
              image={comment.creator.profileImage}
              className={styles.avatar}
              creator={comment.creator}
            />
            <Main comment={comment} handleReply={handleReply} />
            {signinedUserId === comment.creator._id && (
              <ActionMenu
                handleUpdateComment={handleUpdateComment}
                handleDeleteComment={handleDeleteComment}
                comment={comment}
              />
            )}
          </div>
          {!!comment.replies.length && (
            <Replies
              comment={comment}
              signinedUserId={signinedUserId}
              handleReply={handleReply}
              handleUpdateReply={handleUpdateReply}
              handleDeleteReply={handleDeleteReply}
            />
          )}
        </li>
      ))}
    </ul>
  );
};

export default Comment;

function Main({
  comment,
  handleReply,
}: {
  comment: CommentType;
  handleReply: (comment: CommentType) => void;
}) {
  const { creator, createdAt } = comment;
  return (
    <div className={styles.main_wrapper}>
      <p>
        {creator.nickName}{" "}
        <span className={styles.comment_createdAt}>
          {new Date(createdAt).toLocaleDateString()}
        </span>
      </p>
      <p className={styles.description}>{comment.description}</p>
      <p onClick={() => handleReply(comment)} className={styles.reply}>
        답글
      </p>
    </div>
  );
}

function ActionMenu({
  handleUpdateComment,
  handleDeleteComment,
  comment,
}: {
  handleUpdateComment: (comment: CommentType) => void;
  handleDeleteComment: (commentId: string) => void;
  comment: CommentType;
}) {
  return (
    <div className={styles.actionmenu_wrapper}>
      <p onClick={() => handleUpdateComment(comment)}>수정</p>
      <p onClick={() => handleDeleteComment(comment._id)}>삭제</p>
    </div>
  );
}

function Replies({
  comment,
  signinedUserId,
  handleReply,
  handleUpdateReply,
  handleDeleteReply,
}: {
  comment: CommentType;
  signinedUserId: string | null;
  handleReply: (comment: CommentType) => void;
  handleUpdateReply: (reply: ReplyType) => void;
  handleDeleteReply: (commentId: string, replyId: string) => void;
}) {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const handleChangeOpen = (isOpen: boolean) => {
    setIsOpen(isOpen);
  };

  return (
    <Accordion.Root
      className={styles.replies_wrapper}
      onChange={handleChangeOpen}
      defaultOpenStatus={isOpen}
    >
      <Accordion.Title>
        <Accordion.Button className={styles.replies_button}>
          <div className={styles.replies_title}>
            {isOpen ? <ArrowUpIcon /> : <ArrowDownIcon />}
            {comment.replies.length}개의 답글 보기
          </div>
        </Accordion.Button>
      </Accordion.Title>
      <Accordion.Content>
        <ul className={styles.replies_list}>
          {comment.replies.map((reply) => (
            <li key={`post-comment-${reply._id}`}>
              <div className={styles.comment_body}>
                <Avartar
                  image={reply.profileImage}
                  className={styles.avatar}
                  creator={comment.creator}
                />
                <div className={styles.main_wrapper}>
                  <p>
                    {reply.name}{" "}
                    <span className={styles.comment_createdAt}>
                      {new Date(reply.createdAt).toLocaleDateString()}
                    </span>
                  </p>
                  <p className={styles.description}>{reply.description}</p>
                </div>
                {signinedUserId === comment.creator._id && (
                  <ActionMenu
                    handleUpdateComment={() => {
                      handleReply(comment);
                      handleUpdateReply(reply);
                    }}
                    handleDeleteComment={() =>
                      handleDeleteReply(comment._id, reply._id)
                    }
                    comment={comment}
                  />
                )}
              </div>
            </li>
          ))}
        </ul>
      </Accordion.Content>
    </Accordion.Root>
  );
}
