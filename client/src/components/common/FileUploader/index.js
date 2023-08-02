import { UploadOutlined } from '@ant-design/icons';
import { Button, notification, Upload } from 'antd';
import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage';
import React, { useState } from 'react';
import { storage } from 'utils/firebase';
import { v4 as uuidv4 } from 'uuid';

const FileUploader = ({ onUpload }) => {
  const [fileList, setFileList] = useState([]);
  const [fileUrls, setFileUrls] = useState([]);

  const checkFileSize = file => {
    if (file) {
      const isLt2M = file.size / 1024 / 1024 < 2;
      if (!isLt2M) {
        notification.error({ message: 'File(s) must be smaller than 2MB!' });
      }
      return isLt2M ? true : Upload.LIST_IGNORE;
    }
    return Upload.LIST_IGNORE;
  };

  const handleOnChange = ({ fileList }) => {
    setFileList(fileList);
  };

  const uploadFiles = options => {
    const { onSuccess, onError, file, onProgress } = options;
    if (!file) return;
    const sotrageRef = ref(storage, `files/${file.name}_${uuidv4()}`);
    const uploadTask = uploadBytesResumable(sotrageRef, file);

    uploadTask.on(
      'state_changed',
      snapshot => {
        const prog = Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
        onProgress(prog);
      },
      error => {
        console.log(error);
        onError(error);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then(downloadURL => {
          const tmp = [...fileUrls, downloadURL];
          setFileUrls(tmp);
        });
        onSuccess('Ok');
        onUpload(fileUrls);
      }
    );
  };

  const handleRemove = file => {};

  return (
    <div style={{ gap: '20px', display: 'flex', flexDirection: 'column' }}>
      <Upload
        multiple={true}
        fileList={fileList}
        onChange={handleOnChange}
        beforeUpload={checkFileSize}
        onRemove={handleRemove}
        customRequest={uploadFiles}>
        <Button icon={<UploadOutlined />}>Click to Upload</Button>
      </Upload>
    </div>
  );
};

export default FileUploader;
