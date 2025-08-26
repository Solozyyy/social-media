import { createSlice } from "@reduxjs/toolkit"

const initialState =
{
    themeModalIsOpen: false,
    editProfileModalOpen: false,
    editPostModalOpen: false,
    editPostId: "",
    theme: JSON.parse(localStorage.getItem("theme")) || { primaryColor: "", backgroundColor: "" }
}

const uiSlice = createSlice({
    name: "ui",
    initialState,
    reducers: {
        openThemeModal: state => {
            state.themeModalIsOpen = true
        },
        closeThemeModal: state => {
            state.themeModalIsOpen = false
        },
        changeTheme: (state, action) => {
            state.theme = action.payload
        },
        openEditProfileModalOpen: state => {
            editProfileModalOpen = true
        },
        closeEditProfileModalOpen: state => {
            editProfileModalOpen = false
        },
        openEditPostModalOpen: state => {
            editPostModalOpen = true
        },
        closeEditPostModalOpen: state => {
            editPostModalOpen = false
        },
        changeEditPostId: (state, action) => {
            state.editPostId = action.payload
        }
    }
})

export const uiSliceActions = uiSlice.actions

export default uiSlice