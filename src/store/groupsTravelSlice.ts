import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import { type group } from '../services/supabase/supabaseGetUser';

export interface GroupState {
    currentGroup: group | null;
    selectedGroup: number | null,
    currentQuestionaireName: string | null
}

const initialState: GroupState = {
    currentGroup: null,
    selectedGroup: null,
    currentQuestionaireName: null
};

const groupSlice = createSlice({
    name: 'group',
    initialState,
    reducers: {
        setGroup: (state, action: PayloadAction<group>) => {
            state.currentGroup = action.payload;
        },
        clearGroup: (state) => {
            state.currentGroup = null;
        },
        setSelectedGroup: (state, action: PayloadAction<number>) => {
            state.selectedGroup = action.payload
        },
        clearSelectedGroup: (state) => {
            state.selectedGroup = null
        },
        setCurrentQuestionaireName: (state, action: PayloadAction<string>) => {
            state.currentQuestionaireName = action.payload
        },
    }
});

export const { setGroup, setSelectedGroup, clearGroup, clearSelectedGroup, setCurrentQuestionaireName } = groupSlice.actions;

export default groupSlice.reducer;
