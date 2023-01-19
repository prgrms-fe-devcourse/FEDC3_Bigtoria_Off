export interface Message {
  _id: string[];
  message: string;
  sender: {
    createdAt: string;
    fullName: string;
  };
  receiver: {
    createdAt: string;
    fullName: string;
    _id: string;
    image?: string;
  };
  seen: boolean;
  createdAt: string;
  updatedAt: string;
}
