interface Block {
  id: string;
  type: string;
  props: {
    textColor: string;
    backgroundColor: string;
    textAlignment: string;
  };
  content: {
    type: string;
    text: string;
    styles: {};
  }[];
  children: any[];
}

export interface Note {
  _id: string;
  name: string;
  blocks: Block[];
  user: string;
  __v: number;
}

export interface NoteData {
  _id: string;
  notes: Note;
  __v: number;
}

export interface ApiNoteResponse {
  data: NoteData;
  success: boolean;
  message: string | null;
}

export interface CartItemInterface {
  notes: {
    smile: string;
    name: string;
  }[];
}
