import React, { useState } from 'react';
import axios from 'axios';
import './index.css';

export const FileUploader = () => {
  const [image, setImage] = useState();
  const [imageURL, setImageURL] = useState();
  const fileReader = new FileReader();
  fileReader.onloadend = () => {
    setImageURL(fileReader.result);
  };
  const handleOnChange = (event) => {
    event.preventDefault();
    if (event.target.files && event.target.files.length) {
      const file = event.target.files[0];
      const fileName = event.target.files[0].name;
      setImage(file);
      fileReader.readAsDataURL(file);
      const formData = new FormData();
      formData.append('my-image-file', file, fileName);
      console.log(formData);
      axios.post('http://localhost:4000/image-upload', formData).then((res) => {
        console.log('Axios response: ', file);
      });
    }
  };

  const handleDrop = (event) => {
    event.preventDefault();
    event.stopPropagation();
    if (event.dataTransfer.files && event.dataTransfer.files.length) {
      setImage(event.dataTransfer.files[0]);
      fileReader.readAsDataURL(event.dataTransfer.files[0]);
      const file = event.dataTransfer.files[0];
      const fileName = event.dataTransfer.files[0].name;
      const formData = new FormData();
      formData.append('my-image-file', file, fileName);
      console.log(formData);
      axios.post('http://localhost:4000/image-upload', formData).then((res) => {
        console.log('Axios response: ', file);
      });
    }
  };

  const handleDragEmpty = (event) => {
    event.preventDefault();
    event.stopPropagation();
  };

  return (
    <form className="file-uploader">
      <label
        htmlFor="file-loader-button"
        className="file-uploader__custom-button"
      >
        Загрузить файл
      </label>
      <input
        id="file-loader-button"
        type="file"
        className="file-uploader__upload-button"
        onChange={handleOnChange}
      />
      <img
        src={imageURL ? imageURL : 'no_photo.jpg'}
        className="file-uploader__preview"
        alt="preview"
        onDrop={handleDrop}
        onDragEnter={handleDragEmpty}
        onDragOver={handleDragEmpty}
      />
      <div className="file-uploader__file-name">{image ? image.name : ''}</div>
    </form>
  );
};
