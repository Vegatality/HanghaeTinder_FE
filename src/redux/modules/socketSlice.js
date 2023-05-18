import { createSlice } from "@reduxjs/toolkit";

const socketSlice = createSlice({
    name: "authToken",
    initialState: {
        isConnected: false,
        socket: "",
        // accessToken: null,
        // expireTime: null,
    },
    // Refresh Token 은 브라우저 저장소(cookie)에, Access Token은 Redux를 이용하여 store에 사용.
    reducers: {
        SET_SOCKET: (state, action) => {
            state.isConnected = true;
            state.socket = action.payload.socket;
            // state.accessToken = action.payload;
            // state.expireTime = new Date().getTime()
        },
        DISCONNECT_SOCKET: (state) => {
            state.isConnected = false;
            state.socket = null;
            // state.accessToken = null;
            // state.expireTime = null;
        },
    },
});

export const { SET_SOCKET, DISCONNECT_SOCKET } = socketSlice.actions;
export default socketSlice.reducer;
