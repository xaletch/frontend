/* eslint-disable @typescript-eslint/no-empty-object-type */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { PartialBlock } from "@blocknote/core";
import {
  FetchBaseQueryError,
} from "@reduxjs/toolkit/query";
import { Dispatch, RefObject, SetStateAction } from "react";

export interface MenuInterface {
  selectNoteId: string | undefined;
  username: string;
  isOpenNoteControl: boolean;
  setOpenNoteControl: Dispatch<SetStateAction<boolean>>;
  setOpenNoteCart: Dispatch<SetStateAction<boolean>>;
  setOpenSearch: Dispatch<SetStateAction<boolean>>;
  setControlCords: Dispatch<SetStateAction<{ x: number; y: number }>>;
  note: DocumentsInterface[] | undefined;
  navbarRef: RefObject<HTMLDivElement>;
  setCloseMenu: Dispatch<SetStateAction<boolean>>;
  collapse: any;
  resetWidth: any;
  sidebarRef: RefObject<HTMLDivElement>;
}

export interface DataNotes {
  _id: string;
  notes: {
    _id: string;
    name: string;
    blocks: {
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
    }[];
    user: string;
    __v: number;
  }[];
  __v: number;
}

export interface SubNotesInterface {
  _id: string;
  name: string;
  smile: string;
  subnotes: SubNotesInterface[];
}

export interface NoteItem {
  _id: string;
  name: string;
  smile: string;
  subnotes: SubNotesInterface[];
}

export interface HomeInterface {
  username: string;
  isUserDataSuccess: boolean;
  setUserDataSuccess: Dispatch<SetStateAction<boolean>>;
  userDataTrigger: any;
}

export interface UserDataTriggerInterface {
  userDataTrigger: any;
}

export interface Block {
  id: string;
  type: "image";
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
  children: any[];
}

export interface PartialInlineContent {
  id: string;
  type: "image";
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
  smile: string;
  name: string;
  _id: string;
}

export interface CartItemsInterface {
  smile: string;
  name: string;
  _id: string;
  handleDeleteNote: any;
  handleRecoveryNote: any;
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
  subnotes: SubNotesInterface[];
  __v: number;
  _id: string;
}

export interface MenuProps {
  selectNote: (
    arg: string
  ) => Promise<
    {
      data?: any;
      error?: FetchBaseQueryError;
    }
  >;
}


export interface DocInterface {
  _id: string;
  name: string;
  smile: string;
  subnotes: SubNotesInterface[];
  selectNoteId: string | undefined;
  isOpenNoteControl: boolean;
  setOpenNoteControl: Dispatch<SetStateAction<boolean>>;
  setControlCords: Dispatch<SetStateAction<{ x: number; y: number }>>;
  l: number;
}

export interface SearchInterface {
  smile: string;
  name: string;
  _id: string;
}

export interface DocumentHeadInterface {
  id: string;
  smile: string;
  noteName: string;
  closeMenu: boolean;
  resetWidth: any;
  noteNateRef?: React.MutableRefObject<HTMLHeadingElement | null>;
  handleInput: any;
  isRead?: boolean;
  isPublic: boolean;
}

export interface SearchProps {
  setOpenSearch: Dispatch<SetStateAction<boolean>>;
  note: DocumentsInterface[] | undefined;
}

export type RegistrationValue = {
  username: string;
  email: string;
  password: string;
};

export interface UserDataTriggerInterface {
  userDataTrigger: any;
}

export type ControlTypes = {
  name: string;
  _id: string;
  username: string;
  createNote: string;
  controlCords: { x: number; y: number };
  setOpenNoteControl: Dispatch<SetStateAction<boolean>>;
};

export interface EditorProps {
  onChange: (value: string) => void;
  initialContent?: PartialBlock[] | string;
  isEditable: boolean;
}

export type HeaderTypes = {
  menuOpen: boolean;
  name: string | undefined;
  smile: string | undefined;
};

export interface NoteContentInterface {
  imageUrl: string;
  name: string;
  smile: string;
  _id: string;
  blocks: PartialBlock[];
  isSelectNoteSuccess: boolean;
  resetWidth: any;
  closeMenu: boolean;
  isPublic: boolean;
}

export type LoginValue = {
  email: string;
  password: string;
};

export interface HeaderInterface {
  isMenu: boolean;
  setMenu: Dispatch<SetStateAction<boolean>>;
  username: string;
  isUserDataSuccess: boolean;
}

export interface CartInterface {
  setOpenNoteCart: Dispatch<SetStateAction<boolean>>;
}

export interface User {
  username: string;
}

export type NoteDataInterface = {
  _id: string;
  imageUrl: string;
  name: string;
  title: string;
  smile: string;
  createNote: string;
  user: User;
  blocks: PartialBlock[];
  isPublic: boolean;
};

export interface Username {
  username: string;
}

export interface BgImageInterface {
  imageUrl: string;
  handleOpenFile?: () => void;
  handleRemoveImg?: () => Promise<void>;
  isRead?: boolean;
}

export interface SmileInterface {
  smile: string;
  handleRemoveSmile: () => void;
  isRead?: boolean;
}

export interface ControlButtonInterface {
  smile: string;
  setShowEmoji: Dispatch<SetStateAction<boolean>>;
  handleOpenFile: () => void;
  imageUrl: string;
}

export interface NoteNameInterface {
  handleInput: (e: React.ChangeEvent<HTMLHeadingElement>) => void;
  noteNateRef?: React.MutableRefObject<HTMLHeadingElement | null>;
  noteName: string;
  readOnly?: boolean;
}

export interface MenuHeadInterface {
  username: string;
  collapse: any;
}

export interface ButtonProps {
  text: string;
  svg: React.ReactNode;
  handleClick: () => void;
}

export interface SearchItemsInterface {
  searchData: SearchInterface[];
  setOpenSearch: Dispatch<SetStateAction<boolean>>;
  note: DocumentsInterface[] | undefined;
  searchDataLoading: boolean;
  value: string;
}

export interface LogoutMenuInterface {
  username: string;
  handleLogout: () => void;
}

export interface HomeWelcomeInterface {
  isUserDataSuccess: boolean;
}
