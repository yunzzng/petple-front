import styles from "./chat.module.css";
import Header from "@/components/Header";
import ChatInput from "./components/ChatInput";
import ChatList from "./components/ChatList";
import useChatSocket from "./hooks/useChatSocket";
import userAuthStore from "@/zustand/userAuth";
import { useSuspenseQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { getUserByNickname } from "@/apis/profile.api";

const ChatPage = () => {
  const { nickname } = useParams();
  const user = userAuthStore();
  const { data: targetUser } = useSuspenseQuery({
    queryKey: ["user", nickname],
    queryFn: () => nickname && getUserByNickname(nickname),
  });
  const { messages, isConnected, sendMessage } = useChatSocket(
    user,
    targetUser
  );

  return (
    isConnected && (
      <div className={styles.wrapper}>
        <Header />
        <ChatList messages={messages} user={user} />
        <ChatInput sendMessage={sendMessage} />
      </div>
    )
  );
};

export default ChatPage;
