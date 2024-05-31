import React from 'react';
import { Button, Box } from '@mui/material';
import UploadFileIcon from '@mui/icons-material/UploadFile';

const FileUploader = ({ onFileUpload }) => {
    const handleFileUpload = (event) => {
        const file = event.target.files[0];
        if (file) {
            onFileUpload(file);
        }
    };

    return (
        <Box>
            <input
                accept=".csv, .json"
                style={{ display: 'none' }}
                id="file-upload"
                type="file"
                onChange={handleFileUpload}
            />
            <label htmlFor="file-upload">
                <Button variant="contained" component="span" startIcon={<UploadFileIcon />}>
                    Upload File
                </Button>
            </label>
        </Box>
    );
};

export default FileUploader;
