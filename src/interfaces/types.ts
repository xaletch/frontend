import { MutationTrigger } from "@reduxjs/toolkit/dist/query/react/buildHooks";
import {
  BaseQueryFn,
  FetchArgs,
  FetchBaseQueryError,
  FetchBaseQueryMeta,
  MutationDefinition,
} from "@reduxjs/toolkit/query";
import { Dispatch, SetStateAction } from "react";

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

export interface PartialInlineContent {
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
  children: PartialInlineContent[];
}

export interface Note {
  _id: string;
  name: string;
  imageUrl: string;
  smile: string;
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
    _id: string;
  }[];
  _id: string;
}

export interface UserInterface {
  email: string;
  passwordHash: string;
  username: string;
  __v: number;
  _id: string;
}

export interface DocumentsInterface {
  blocks: Block[];
  imageUrl: string;
  name: string;
  smile: string;
  user: UserInterface[];
  __v: number;
  _id: string;
}

export interface MenuProps {
  selectNote: MutationTrigger<
    MutationDefinition<
      string,
      BaseQueryFn<
        string | FetchArgs,
        unknown,
        FetchBaseQueryError,
        {},
        FetchBaseQueryMeta
      >,
      "CreateNote" | "CheckAuth",
      any,
      "noteApi"
    >
  >;
}

export interface DocInterface {
  _id: string;
  name: string;
  smile: string;
  selectNoteId: string | undefined;
  isOpenNoteControl: boolean;
  setOpenNoteControl: Dispatch<SetStateAction<boolean>>;
  setControlCords: Dispatch<SetStateAction<{ x: number; y: number }>>;
}
