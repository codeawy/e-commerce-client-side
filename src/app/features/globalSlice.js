import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isOpenCartDrawer: false,
  onOpenCartDrawer: false,
  onCloseCartDrawer: false,
};

const globalSlice = createSlice({
  name: "global",
  initialState,
  reducers: {
    onOpenCartDrawerAction: state => {
      state.onOpenCartDrawer = true;
      state.isOpenCartDrawer = true;
    },
    onCloseCartDrawerAction: state => {
      state.onCloseCartDrawer = false;
      state.isOpenCartDrawer = false;
    },
  },
});

export const { isOpenCartDrawer, onOpenCartDrawerAction, onCloseCartDrawerAction } =
  globalSlice.actions;
export const selectGlobal = ({ global }) => global;
export default globalSlice.reducer;
