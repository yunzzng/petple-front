import { config } from "@/consts/config";
import { ChatMessageType } from "@/types/chat.type";
import { AuthStore, UserType } from "@/types/user.type";
import { useEffect, useRef, useState } from "react";
import { io, Socket } from "socket.io-client";

const useChatSocket = (user: AuthStore, targetUser: UserType) => {
  const [isConnected, setIsConnected] = useState(false);
  const [roomId, setRoomId] = useState("");
  const [messages, setMessages] = useState<ChatMessageType[]>([]);
  const socketRef = useRef<Socket>(null);

  const sendMessage = (text: string) => {
    if (!text || !roomId || !socketRef.current) return;
    socketRef.current.emit("send_message", {
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

  const scrollToBottom = () => {
    window.scrollTo({
      top: document.documentElement.scrollHeight,
      behavior: "smooth",
    });
  };

  useEffect(() => scrollToBottom(), [messages]);
  useEffect(() => {
    const socket = io(`${config.app.backendUrl}/chat`, {
      transports: ["websocket"],
      reconnectionDelayMax: 10000,
    });
    socketRef.current = socket;

    socket.on("connect", () => {
      socket.on("prev_message", (prevMessage) => {
        if (!prevMessage?.messages.length) return;
        setMessages(prevMessage.messages);
      });

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

  useEffect(() => {
    if (socketRef.current && user && user.userId) {
      const roomId = [user.userId, targetUser._id].sort().join("-");
      setRoomId(roomId);
      socketRef.current.emit("join_room", roomId);
    }
  }, [user, socketRef]);

  return { messages, isConnected, sendMessage };
};

export default useChatSocket;
