import { createSlice } from "@reduxjs/toolkit";

const uploadSlice = createSlice({
  name: "upload",
  initialState: {
    isVisible: false,
    files: [],
  },
  reducers: {
    showUploader(state) {
      state.isVisible = true;
    },
    hideUploader(state) {
      state.isVisible = false;
    },
    addUploadFile(state, action) {
      state.files.push(action.payload);
    },
    removeUploadFile(state, action) {
      state.files = state.files.filter((f) => f.id !== action.payload);
    },
    changeUploadFile(state, action) {
      const file = state.files.find((f) => f.id === action.payload.id);
      if (file) file.progress = action.payload.progress;
    },
  },
});

export const {
  showUploader,
  hideUploader,
  addUploadFile,
  removeUploadFile,
  changeUploadFile,
} = uploadSlice.actions;
export default uploadSlice.reducer;
