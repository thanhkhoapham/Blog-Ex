import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { RootState } from "store";
import { Post } from "types/blog.type";


interface PostFormState {
    isOpen: boolean
    formData: Post | null
}

const initialState: PostFormState = {
    isOpen: false,
    formData: null
}

const postFormSlice = createSlice({
    name: "form",
    initialState,
    reducers: {
        openForm: (state, action: PayloadAction<Post | null>) => ({...state, isOpen: !state.isOpen, formData: action.payload})
    }
})

export const { openForm } = postFormSlice.actions;
const formReducer = postFormSlice.reducer;

export const isOpenFormSelector = (state: RootState) => state.form.isOpen;
export const postFormDataSelector = (state: RootState) => state.form.formData;

export default formReducer;
