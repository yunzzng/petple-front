export type ChatMessageType = {
  from: {
    id: string;
    nickName: string;
  };
  to: {
    id: string;
    nickName: string;
  };
  text: string;
};
