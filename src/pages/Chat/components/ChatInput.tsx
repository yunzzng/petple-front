import { ChangeEvent, FormEvent, useState } from "react";
import styles from "./chatinput.module.css";
import { Button } from "@/components";

interface ChatInputProps {
  sendMessage: (message: string) => void;
}

const ChatInput = ({ sendMessage }: ChatInputProps) => {
  const [message, setMessage] = useState("");
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    sendMessage(message);
    setMessage("");
  };
  return (
    <>
      <form className={styles.comment_input} onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="메시지를 작성해보세요."
          value={message}
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            setMessage(e.target.value)
          }
        />
        <Button label="채팅" type="submit" />
      </form>
    </>
  );
};

export default ChatInput;
