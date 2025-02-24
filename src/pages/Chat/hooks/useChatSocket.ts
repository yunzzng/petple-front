import { config } from "@/consts/config";
import { ChatMessageType } from "@/types/chat.type";
import { AuthStore, ChatUser } from "@/types/user.type";
import { useEffect, useState } from "react";
import { io, Socket } from "socket.io-client";

const useChatSocket = (user: AuthStore, targetUser: ChatUser) => {
  const [isConnected, setIsConnected] = useState(false);
  const [roomId, setRoomId] = useState("");
  const [messages, setMessages] = useState<ChatMessageType[]>([]);
  const [socket, setSocket] = useState<Socket>();

  const sendMessage = (text: string) => {
    if (!text || !roomId || !socket) return;
    socket.emit("send_message", {
      roomId,
      text,
      from: user.userNickName,
      to: targetUser.nickName,
    });
  };

  useEffect(() => {
    const socket = io(`${config.app.backendUrl}/chat`, {
      transports: ["websocket"],
      reconnectionDelayMax: 10000,
    });
    setSocket(socket);

    socket.on("connect", () => {
      const roomId = [user.userId, targetUser._id].sort().join("-");
      console.log("myId", user.userId);
      console.log("other", targetUser._id);
      socket?.emit("join_room", roomId);
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
