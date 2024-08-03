import { configureStore } from '@reduxjs/toolkit';
// Reducers importing
import authReducer from '../features/manageAuth/manageAuthSlice';
import secretReducer from '../features/manageSecretCode/manageSecretCode.slice';


const store = configureStore({
  reducer: {
    secret: secretReducer,
    auth: authReducer
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;

// Exporting the store by default
export default store;
