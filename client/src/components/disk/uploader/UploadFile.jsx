import React, { useState } from "react";
import "./uploader.css";
import { useDispatch } from "react-redux";
import { removeUploadFile } from "../../../reducers/uploadReducer";
import sizeFormat from "../../../utils/sizeFormat";

const UploadFile = ({ file }) => {
  const dispatch = useDispatch();
  const [isRemoving, setIsRemoving] = useState(false);

  const handleRemove = () => {
    setIsRemoving(true);
    setTimeout(() => {
      dispatch(removeUploadFile(file.id));
    }, 500);
  };

  return (
    <div className={`upload-file ${isRemoving ? "removing" : ""}`}>
      <div className="upload-file__header">
        <div className="upload-file__icon">
          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M13 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9z" />
            <polyline points="13 2 13 9 20 9" />
          </svg>
        </div>
        <div className="upload-file__info">
          <div className="upload-file__name">{file.name}</div>
          <div className="upload-file__size">{sizeFormat(file.size || 0)}</div>
        </div>
        <div className="upload-file__status">
          {file.progress < 100 ? (
            <span className="upload-file__percent">{file.progress}%</span>
          ) : (
            <span className="upload-file__complete">✓</span>
          )}
        </div>
        <button className="upload-file__remove" onClick={handleRemove}>
          X
        </button>
      </div>
      <div className="upload-file__progress-bar">
        <div
          className="upload-file__upload-bar"
          style={{ width: file.progress + "%" }}
        />
      </div>
    </div>
  );
};

export default UploadFile;
