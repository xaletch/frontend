import axios from 'axios';
import React, { useRef, useState } from 'react'

import test from "../../../../upload/1699256910919-img_eLPbscxMaAfL0EmYnS0m.png"

export const UploadingImg = () => {
    const [file, setFile] = useState(null);
    const [uploaded, setUploaded] = useState("");
    const fileRef = useRef(null);

    const handleChange = (event) => {
        setFile(event.target.files[0]);
        setUploaded(file);
    };

    // console.log(file);

    const handleUpload = async () => {
        const formData = new FormData();
        formData.append('file', file);

        try {
            const res = await axios.post('http://localhost:8000/upload', formData);
            const data = res.data;
            setUploaded(data);
          } catch (error) {
            console.error('Ошибка при выполнении запроса:', error);
          }
    };

    // console.log('uploaded: ', uploaded)

    const handleOpenFile = () => {
        if (fileRef.current) {
            fileRef.current.click();
        };
    };

    // console.log('uploaded.filePath: ', uploaded.filePath);

    return (
        <>
            <input type='file' ref={fileRef} onChange={handleChange} hidden accept='image/*, .png, .jpg, .gif, .web' />
            <button className='p-2 border rounded border-light-grey' onClick={handleOpenFile}>открыть</button>
            <button className='p-2 border rounded border-black' onClick={handleUpload}>Загрузить</button>
        
            {/* {uploaded && (
                <div>
                    <h1>{uploaded.fileName}</h1>
                    <img src={`../../../../upload/${uploaded.fileName}`} alt={uploaded.filePath} />
                </div>
            )} */}
        </>
    )
}
