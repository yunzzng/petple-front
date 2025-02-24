import { ChatMessageType } from "@/types/chat.type";
import styles from "./chatmessage.module.css";
import { useMemo } from "react";

interface ChatMessageProps {
  message: ChatMessageType;
  nickname?: string | null;
}

const ChatMessage = ({ message, nickname }: ChatMessageProps) => {
  const isMyMessage = useMemo(
    () => message.from.nickname === nickname,
    [message.from, nickname]
  );

  return isMyMessage ? (
    <MyMessage message={message} />
  ) : (
    <OtherMessage message={message} />
  );
};

export default ChatMessage;

const MyMessage = ({ message }: { message: ChatMessageType }) => {
  return (
    <li>
      {message.from.nickname}:{message.text}
    </li>
  );
};

const OtherMessage = ({ message }: { message: ChatMessageType }) => {
  console.log(message);
  return (
    <li>
      {message.from.nickname}:{message.text}
    </li>
  );
};
