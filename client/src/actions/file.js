import axios from "axios";
import { addFile, deleteFileAction, setFiles } from "../reducers/fileReducer";
import {
  addUploadFile,
  changeUploadFile,
  showUploader,
  removeUploadFile,
  hideUploader,
} from "../reducers/uploadReducer";
import { hideLoader, showLoader } from "../reducers/appReducer";

const API_URL = import.meta.env.VITE_API_URL;

export function getFiles(dirId, sort) {
  return async (dispatch) => {
    try {
      dispatch(showLoader());
      const params = new URLSearchParams();
      if (dirId) params.append("parent", dirId);
      if (sort) params.append("sort", sort);
      const query = params.toString() ? `?${params.toString()}` : "";
      const response = await axios.get(`${API_URL}/api/files${query}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      dispatch(setFiles(response.data));
    } catch (e) {
      alert(e?.response?.data?.message);
    } finally {
      dispatch(hideLoader());
    }
  };
}

export function createDir(dirId, name) {
  return async (dispatch) => {
    try {
      const response = await axios.post(
        `${API_URL}/api/files`,
        {
          name,
          parent: dirId,
          type: "dir",
        },
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        },
      );
      dispatch(addFile(response.data));
    } catch (e) {
      alert(e?.response?.data?.message);
    }
  };
}

export function uploadFile(file, dirId) {
  return async (dispatch, getState) => {
    try {
      const formData = new FormData();
      formData.append("file", file);
      if (dirId) formData.append("parent", dirId);

      const uploadFileId = Date.now();
      const uploadEntry = {
        name: file.name,
        size: file.size,
        progress: 0,
        id: uploadFileId,
      };
      dispatch(showUploader());
      dispatch(addUploadFile(uploadEntry));

      const response = await axios.post(
        `${API_URL}/api/files/upload`,
        formData,
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
          onUploadProgress: (progressEvent) => {
            if (progressEvent.total) {
              const progress = Math.round(
                (progressEvent.loaded * 100) / progressEvent.total,
              );
              dispatch(changeUploadFile({ id: uploadFileId, progress }));
            }
          },
        },
      );
      dispatch(addFile(response.data));

      // Auto-hide uploader after 5 seconds
      setTimeout(() => {
        dispatch(removeUploadFile(uploadFileId));
        const state = getState();
        if (state.upload.files.length <= 1) {
          dispatch(hideUploader());
        }
      }, 5000);
    } catch (e) {
      alert(e?.response?.data?.message);
    }
  };
}

export async function downloadFile(file) {
  const response = await fetch(`${API_URL}/api/files/download?id=${file._id}`, {
    headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
  });
  if (response.status === 200) {
    const blob = await response.blob();
    const downloadUrl = window.URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = downloadUrl;
    link.download = file.name;
    document.body.appendChild(link);
    link.click();
    link.remove();
  }
}

export function deleteFile(file) {
  return async (dispatch) => {
    try {
      const response = await axios.delete(
        `${API_URL}/api/files?id=${file._id}`,
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        },
      );
      dispatch(deleteFileAction(file._id));
      alert(response.data.message);
    } catch (e) {
      alert(e?.response?.data?.message);
    }
  };
}

export function searchFiles(search) {
  return async (dispatch) => {
    try {
      const response = await axios.get(
        `${API_URL}/api/files/search?search=${search}`,
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        },
      );
      dispatch(setFiles(response.data));
    } catch (e) {
      alert(e?.response?.data?.message);
    } finally {
      dispatch(hideLoader());
    }
  };
}
