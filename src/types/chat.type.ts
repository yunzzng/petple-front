export type ChatMessageType = {
  from: {
    id: string;
    nickname: string;
  };
  to: {
    id: string;
    nickname: string;
  };
  text: string;
};
