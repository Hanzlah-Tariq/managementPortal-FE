import React from 'react';
import PropsTypes from 'prop-types';

import { message, Upload } from 'antd';
import { PlusOutlined } from '@ant-design/icons';

const getBase64 = (img, callback) => {
  const reader = new FileReader();
  reader.addEventListener('load', () => callback(reader.result));
  reader.readAsDataURL(img);
};

const ImageHandle = ({ setImgData, setImgPreview, imgPreview }) => {
  const handleChange = ({ fileList }) => {
    const file = fileList.slice(-1);
    const { type, size } = file[0].originFileObj;
    const isJpgOrPng = type === 'image/jpeg' || type === 'image/png' || type === 'image/jpg';
    const isLt2M = size / 1024 / 1024 <= 2;
    if (!isJpgOrPng) {
      message.error('You can only upload JPG/PNG file!');
    } else if (!isLt2M) {
      message.error('Image must be smaller than or equal to 2MB!');
    } else {
      setImgData(file[0].originFileObj);
      getBase64(file[0].originFileObj, (imageUrl) => setImgPreview(imageUrl));
    }
  };
  const uploadButton = (
    <div className="ant-upload-text">
      <PlusOutlined />
      Image
    </div>
  );
  return (
    <Upload
      name="file"
      listType="picture-card"
      showUploadList={false}
      beforeUpload={() => false}
      onChange={handleChange}
    >
      {imgPreview ? (
        <img
          src={imgPreview}
          alt="avatar"
          style={{ width: '100%' }}
        />
      ) : (
        uploadButton
      )}
    </Upload>
  );
};

ImageHandle.defaultProps = {
  imgPreview: null,
};

ImageHandle.propTypes = {
  setImgData: PropsTypes.any.isRequired,
  setImgPreview: PropsTypes.any.isRequired,
  imgPreview: PropsTypes.string,
};

export default ImageHandle;
