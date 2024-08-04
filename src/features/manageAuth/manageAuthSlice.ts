import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { IAuthState, ILoginReturn } from "../../types/features/auth.types";
import { adminLogin, adminLogout } from "./manageAuthAction";

const initialState: IAuthState = {
  error: false,
  loading: false,
  status: 'idle',
  message: null,
}

export const authSlice = createSlice({
  name: 'authentication',
  initialState,
  reducers: {
    resetAuthState: (state: IAuthState) => {
      state.error = false;
      state.loading = false;
      state.status = 'idle';
      state.message = null;
    },
    logout: (state: IAuthState) => {
      state.error = false;
      state.loading = false;
      state.status = 'success';
      state.message = `You're logged out!`;
    }
  },
  extraReducers(builder) {
    builder
      .addCase(adminLogin.fulfilled, (state: IAuthState, { payload }: PayloadAction<ILoginReturn>) => {
        state.error = false;
        state.loading = false;
        state.status = 'success';
        state.message = payload.message;
      })
      .addCase(adminLogin.pending, (state: IAuthState) => {
        state.loading = true;
        state.status = 'loading'
      })
      .addCase(adminLogin.rejected, (state: IAuthState, { payload }: PayloadAction<any>) => {
        state.error = true;
        state.loading = false;
        state.status = 'error';
        state.message = payload.message;
      })

    builder.addCase(adminLogout.fulfilled, (state: IAuthState, { payload }: { payload: string }) => {
      state.error = false;
      state.loading = false;
      state.status = 'success'
      state.message = payload;
      localStorage.removeItem('token');
    }).addCase(adminLogout.pending, (state: IAuthState) => {
      state.loading = true;
      state.status = 'loading';
    }).addCase(adminLogout.rejected, (state: IAuthState, { payload }: { payload: any }) => {
      state.error = true;
      state.loading = false;
      state.status = 'error';
      state.message = payload.message;
    })

  },
})

export const { resetAuthState, logout } = authSlice.actions;
export default authSlice.reducer;