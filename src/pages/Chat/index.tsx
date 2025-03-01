import styles from "./chat.module.css";
import Header from "@/components/Header";
import ChatInput from "./components/ChatInput";
import ChatList from "./components/ChatList";
import useChatSocket from "./hooks/useChatSocket";
import userAuthStore from "@/zustand/userAuth";
import { useSuspenseQuery } from "@tanstack/react-query";
import { useNavigate, useParams } from "react-router-dom";
import { getUserByNickname } from "@/apis/profile.api";

const ChatPage = () => {
  const { nickname } = useParams();
  const navigate = useNavigate();
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
        <div className={styles.chat_header}>
          <div
            className={styles.back_button}
            onClick={() => navigate("/petfriends")}
          >
            <img src="/images/prev.png" alt="뒤로가기 버튼 아이콘" />
          </div>
          <h1>
            {targetUser.userPet[0]?.name ?? targetUser.nickName}님 과의 대화방
          </h1>
        </div>
        <ChatList messages={messages} user={user} />
        <ChatInput sendMessage={sendMessage} />
      </div>
    )
  );
};

export default ChatPage;
