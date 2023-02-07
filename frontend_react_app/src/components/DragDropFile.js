import React, {useEffect, useState} from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { MdUpload } from 'react-icons/md';
import axios from "axios";
import { useGlobalContext } from '../context';
import {useDropzone} from 'react-dropzone';

const DragDropFile = () => {
    const [uploadedVideo, setUploadedVideo] = useState(null)
    const {acceptedFiles, getRootProps, getInputProps} = useDropzone(
        {
            accept: {'video/*': []},
            maxFiles: 1
    
    }
    );
    const files = acceptedFiles.map(file => {
        console.log(acceptedFiles)
        return(
            <li key={file.path}>
                {file.path} - {file.size} bytes
            </li>
        )}
    );
    
    useEffect(() => {
        setUploadedVideo(acceptedFiles)
    }, [acceptedFiles])

    const handleSubmit = async (event) => {
        event.preventDefault()
        const formData = new FormData();
        formData.append("file", uploadedVideo[0]);
        try {
            const response = await axios({
            method: "post",
            url: "http://127.0.0.1:8000/utube/video/upload",
            data: formData,
            headers: { "Content-Type": "multipart/form-data" },
            });
        } catch(error) {
            console.log(error)
        }
    }

    return (
        <Box className='upload-box-styling'>
            <section className="container">
                <div {...getRootProps({className: 'dropzone'})}>
                <input {...getInputProps()} />
                    <div className='upload-box-styling'>
                        <div className='upload-icon-styling'>
                            <MdUpload size={80} style={{opacity: '0.7'}}/>
                        </div>
                        <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                            Drag and drop video files to upload
                        </Typography>
                    </div> 
                </div>
            </section>
        </Box>
    );
}

export default DragDropFile