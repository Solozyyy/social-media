import { createSlice } from "@reduxjs/toolkit"

const userSlice = createSlice({
    name: "user",
    initialState: {
        currentUser: JSON.parse(localStorage.getItem("currentUser") || null),
        socket: null, onlineUsers: []
    },
    reducers: {
        changeCurrentUser: (state, action) => {
            state.currentUser = action.payload
        },
        setSocket: (state, action) => {
            state.socket = action.payload
        },
        setOnlineUsers: (state, action) => {
            state.onlineUsers = action.payload
        }
    }
})

export const userActions = userSlice.actions

export default userSlice
