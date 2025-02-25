import { ChatMessageType } from "@/types/chat.type";
import styles from "./chatList.module.css";
import { AuthStore } from "@/types/user.type";
import ChatMessage from "./ChatMessage";

interface ChatListProps {
  messages: ChatMessageType[];
  user: AuthStore;
}

const ChatList = ({ messages, user }: ChatListProps) => {
  return (
    <main className={styles.wrapper}>
      <ul className={styles.chat_list}>
        {messages.map((message, index) => (
          <ChatMessage
            message={message}
            nickname={user.userNickName}
            key={index}
          />
        ))}
      </ul>
    </main>
  );
};

export default ChatList;
