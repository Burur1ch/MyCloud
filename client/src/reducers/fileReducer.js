import { createSlice } from "@reduxjs/toolkit";

const fileSlice = createSlice({
  name: "files",
  initialState: {
    files: [],
    currentDir: null,
    popupDisplay: "none",
    dirStack: [],
    view: "list",
  },
  reducers: {
    setFiles(state, action) {
      state.files = action.payload;
    },
    setCurrentDir(state, action) {
      state.currentDir = action.payload;
    },
    addFile(state, action) {
      state.files.push(action.payload);
    },
    setPopupDisplay(state, action) {
      state.popupDisplay = action.payload;
    },
    pushToStack(state, action) {
      state.dirStack.push(action.payload);
    },
    deleteFileAction(state, action) {
      state.files = state.files.filter((f) => f._id !== action.payload);
    },
    setFileView(state, action) {
      state.view = action.payload;
    },
  },
});

export const {
  setFiles,
  setCurrentDir,
  addFile,
  setPopupDisplay,
  pushToStack,
  deleteFileAction,
  setFileView,
} = fileSlice.actions;
export default fileSlice.reducer;
