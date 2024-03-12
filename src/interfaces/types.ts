interface Blocks {
  id: string;
  type: string;
  props: {
    textColor: string;
    backgroundColor: string;
    textAlignment: string;
  };
  content: Array<{
    type: string;
    text?: string;
    styles?: {};
  }>;
  children: Blocks[];
}

export type Note = {
  _id: string;
  name: string;
  user: {
    _id: string;
    username: string;
    email: string;
    passwordHash: string;
    __v: number;
  };
  __v: number;
  imageUrl: string;
  smile: string;
  blocks: Blocks[];
};
