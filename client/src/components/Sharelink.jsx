import React from 'react';
import IconButton from '@mui/material/IconButton';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import './Sharelink.css';

const CopyUrlButton = () => {
  const handleCopyUrl = () => {
    const url = window.location.href;
    navigator.clipboard.writeText(url).then(() => {
      alert('URL copiato negli appunti!');
    }, (err) => {
      console.error('Errore nel copiare l\'URL: ', err);
    });
  };

  return (
    <IconButton onClick={handleCopyUrl} aria-label="copy url">
      <ContentCopyIcon />
    </IconButton>
  );
};

export default CopyUrlButton;
