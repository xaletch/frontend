import axios from 'axios';
import React, { useRef, useState } from 'react'

export const UploadingImg = () => {
    const [file, setFile] = useState(null);
    const [uploaded, setUploaded] = useState("");
    const fileRef = useRef(null);

    const handleChange = (event) => {
        // if (event.target.files && event.target.files.length > 0) {
            setFile(event.target.files[0]);
        // }
    };

    console.log(file);

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

    console.log('uploaded: ', uploaded)

    const handleOpenFile = () => {
        if (fileRef.current) {
            fileRef.current.click();
        };
    };

    console.log('uploaded.filePath: ', uploaded.filePath);

    return (
        <>
            <input type='file' ref={fileRef} onChange={handleChange} accept='image/*, .png, .jpg, .gif, .web' />
            <button className='p-2 border rounded border-light-grey' onClick={handleOpenFile}>открыть</button>
            <button className='p-2 border rounded border-black' onClick={handleUpload}>Загрузить</button>
        
            {/* {uploaded && ( */}
                <div>
                    {/* <h1>{uploaded.fileName}</h1> */}
                    <img src={`${uploaded.filePath}`} alt={uploaded.filePath} />
                </div>
            {/* )} */}
        </>
    )
}
