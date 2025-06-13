import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import { type UserProfile } from '../services/supabase/supabaseGetUser';

export interface UserState {
    profile: UserProfile | null;
    loading: boolean;
    error: string | null;
}

const initialState: UserState = {
    profile: null,
    loading: false,
    error: null,
};

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setUser: (state, action: PayloadAction<UserProfile>) => {
            state.profile = action.payload;
            state.error = null;
        },
        clearUser: (state) => {
            state.profile = null;
            state.error = null;
        },
    }
});

export const { setUser, clearUser } = userSlice.actions;

export default userSlice.reducer;
