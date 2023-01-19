export interface Message {
  _id: string[];
  message: string;
  sender: {
    _id: string;
    createdAt: string;
    fullName: string;
    image?: string;
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
