import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { createSecretCode, deleteSecretCode, getSecretCode } from "./manageSecretCode.action";

export type ISecretCodeState = {
    status: 'idle' | 'success' | 'error' | 'loading';
    message: string | null;
    data: any[]
}

const initialState: ISecretCodeState = {
    status: 'idle',
    message: null,
    data: []
}

export const secretCodeSlice = createSlice({
    name: 'secretCode',
    initialState,
    reducers: {
        resetSecret: (state: ISecretCodeState) => {
            state.status = 'idle';
            state.message = null;
        }
    }, 
    extraReducers: (builder) => {
        builder
            .addCase(createSecretCode.fulfilled, (state: ISecretCodeState, {payload}: PayloadAction<string>) => {
                state.status = 'success';
                state.message = payload;
            })
            .addCase(createSecretCode.pending, (state: ISecretCodeState) => {
                state.status = 'loading'
            })
            .addCase(createSecretCode.rejected, (state:ISecretCodeState, {payload}: PayloadAction<any>) => {
                state.status = 'error';
                state.message = payload;
            })

            .addCase(getSecretCode.fulfilled, (state: ISecretCodeState, {payload}: PayloadAction<any>) => {
                state.status = 'success';
                state.data = payload;
            })
            .addCase(getSecretCode.pending, (state: ISecretCodeState) => {
                state.status = 'loading'
            })
            .addCase(getSecretCode.rejected, (state:ISecretCodeState, {payload}: PayloadAction<any>) => {
                state.status = 'error';
                state.message = payload;
            })

            .addCase(deleteSecretCode.fulfilled, (state: ISecretCodeState, {payload}: PayloadAction<any>) => {
                state.status = 'success';
                state.message = payload;
            })
            .addCase(deleteSecretCode.pending, (state: ISecretCodeState) => {
                state.status = 'loading'
            })
            .addCase(deleteSecretCode.rejected, (state:ISecretCodeState, {payload}: PayloadAction<any>) => {
                state.status = 'error';
                state.message = payload;
            })
    }
})

export const {resetSecret} = secretCodeSlice.actions;
export default secretCodeSlice.reducer;