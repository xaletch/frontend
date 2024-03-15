import React, { useEffect, useState } from "react";
import { Menu } from "../../components/Documents/Menu";
import { NoteContent } from "../../components/Notes/NoteContent";
import { useParams } from "react-router-dom";
import { useGetOneNoteMutation } from "../../redux/api";
// import { useGetOneNoteQuery } from "../../redux/api";

export const Documents: React.FC = () => {
  const { _id } = useParams();

  const [selectNoteData, setSelectNoteData] = useState();
  const [selectNoteId, setSelectNoteId] = useState<string>();

  const [selectNote, { data: noteData, isSuccess: isSelectNoteSuccess }] =
    useGetOneNoteMutation();

  useEffect(() => {
    if (_id && _id !== selectNoteId) {
      selectNote(_id);
    }
  }, [_id, selectNote, selectNoteId]);

  useEffect(() => {
    if (isSelectNoteSuccess) {
      setSelectNoteData(noteData);
      setSelectNoteId(noteData._id);
    }
  }, [isSelectNoteSuccess, noteData]);

  return (
    <div className="relative">
      <Menu />
      {/* <NoteContent
        imageUrl={selectNote?.imageUrl}
        name={selectNote?.name}
        smile={selectNote?.smile}
        _id={selectNote?._id}
        blocks={selectNote?.blocks}
      /> */}
    </div>
  );
};
