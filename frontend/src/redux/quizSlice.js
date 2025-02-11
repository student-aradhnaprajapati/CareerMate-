import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    fields:[],4
};


    reducers: {
        setField(state, action) {

            state.fields = action.payload;
        },
        setFieldSubjects(state,actio) {
            s
        },
        set
        applyJob(state, action) {
            state.appliedJobs.push(action.payload);
        },
    },
});

export const { setUserDetails, setAppliedJobs } = userSlice.actions;

export default userSlice.reducer;
