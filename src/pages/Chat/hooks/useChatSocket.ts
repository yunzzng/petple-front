import { config } from "@/consts/config";
import { ChatMessageType } from "@/types/chat.type";
import { AuthStore, UserType } from "@/types/user.type";
import { useEffect, useState } from "react";
import { io, Socket } from "socket.io-client";

const useChatSocket = (user: AuthStore, targetUser: UserType) => {
  const [isConnected, setIsConnected] = useState(false);
  const [roomId, setRoomId] = useState("");
  const [messages, setMessages] = useState<ChatMessageType[]>([]);
  const [socket, setSocket] = useState<Socket>();

  const sendMessage = (text: string) => {
    if (!text || !roomId || !socket) return;
    socket.emit("send_message", {
      roomId,
      text,
      from: {
        id: user.userId,
        nickName: user.userNickName,
        userPet: user.userPet,
        profileImage: user.userImage,
      },
      to: {
        id: targetUser._id,
        nickName: targetUser.nickName,
        userPet: targetUser.userPet,
        profileImage: targetUser.profileImage,
      },
    });
  };

  const scorllToBottom = () => {
    window.scrollTo({
      top: document.documentElement.scrollHeight,
      behavior: "smooth",
    });
  };

  useEffect(() => scorllToBottom(), [messages]);
  useEffect(() => {
    const socket = io(`${config.app.backendUrl}/chat`, {
      transports: ["websocket"],
      reconnectionDelayMax: 10000,
    });
    setSocket(socket);

    socket.on("connect", () => {
      const roomId = [user.userId, targetUser._id].sort().join("-");

      socket.on("prev_message", (prevMessage) => {
        if (!prevMessage?.messages.length) return;
        setMessages(prevMessage.messages);
      });

      socket.emit("join_room", roomId);
      setRoomId(roomId);
      setIsConnected(true);
    });

    socket.on("receive_message", (message) => {
      setMessages((prev) => [...prev, message]);
    });

    socket.on("disconnect", () => setIsConnected(false));
    return () => {
      socket.disconnect();
    };
  }, []);

  return { messages, isConnected, sendMessage };
};

export default useChatSocket;
