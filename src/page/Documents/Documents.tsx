import React from 'react'
import { Menu } from '../../components/Documents/Menu'
import { useNavigate } from 'react-router-dom';
import Axios from '../../axios';

type DocType = {
    _id: string;
    name: string;
    smile: string;
}

type DocumentsType = {
    documents:DocType[];
}

export const Documents: React.FC<DocumentsType> = ({ documents }) => {
    const navigate = useNavigate();
    
    const handleSelectNote = async (id: any) => {
        await Axios.get(`/notes/oneNote/${id}`);
        navigate(`/documents/${id}`)
    };
    
    return (
        <div className='relative'>
            <Menu documents={documents} handleSelectNote={handleSelectNote} />
        </div>
    )
}
