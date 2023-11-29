import React, { Dispatch, SetStateAction } from 'react'

interface ActionInterface {
    action: boolean;
    setAction: Dispatch<SetStateAction<boolean>>;
    handleDeleteNote: (id: string) => void;
    handleUpdate: any;
    id: string;
};

export const Action: React.FC<ActionInterface> = ({ action, setAction, handleDeleteNote, id, handleUpdate }) => {
    // const handleClose = () => {
    //     setAction(false);
    // };

    return (
        <div>
            
        </div>
    )
}
