import { MenteeApplication } from "@/model/MenteeApplicationModel";
import { Participant, ParticipantFilters } from "@/types/participant";

import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../user/store";
import { create } from "domain";
import { AuthService } from "@/service/authService/authService";

interface ParticipantState {
    participants: Participant[];
    filters: ParticipantFilters;
    loading: boolean;
    error: string | null;
    total: number;
    page: number;
    limit: number;
    hasNext: boolean;
    hasPrev: boolean;
    mentors: MenteeApplication | null; // Store mentor details keyed by user ID
}

const initialState: ParticipantState = {
    participants: [],
    filters: {},
    loading: false,
    error: null,
    total: 0,
    page: 1,
    limit: 10,
    hasNext: false,
    hasPrev: false,
    mentors: null
};

// create thunk to fetch mentor details by user ID
export const fetchMentorData = createAsyncThunk("participant/fetchMentorData", async (userId: string) => {
    // Simulate API call to fetch mentor details
    const response = await AuthService.getMentorsDetails(userId);
    console.log("fetchMentorData response:", response);
    return response;
});
const participantSlice = createSlice({
    name: "participant",
    initialState,
    reducers: {
        setParticipants(state, action: PayloadAction<Participant[]>) {
            state.participants = action.payload;
        },
        setFilters(state, action: PayloadAction<ParticipantFilters>) {
            state.filters = action.payload;
        },
        setLoading(state, action: PayloadAction<boolean>) {
            state.loading = action.payload;
        },
        setError(state, action: PayloadAction<string | null>) {
            state.error = action.payload;
        },
        setPagination(
            state,
            action: PayloadAction<{
                total: number;
                page: number;
                limit: number;
                hasNext: boolean;
                hasPrev: boolean;
            }>
        ) {
            state.total = action.payload.total;
            state.page = action.payload.page;
            state.limit = action.payload.limit;
            state.hasNext = action.payload.hasNext;
            state.hasPrev = action.payload.hasPrev;
        },
        resetFilters(state) {
            state.filters = {};
        },
    },
    extraReducers: (builder) => {
        builder.addCase(fetchMentorData.fulfilled, (state, action) => {
            state.mentors = action.payload ? action.payload[0] : null; // Assuming response is an array
        });
        builder.addCase(fetchMentorData.rejected, (state, action) => {
            state.error = action.error.message || "Failed to fetch mentor data";
            state.mentors = null;
        });
    }
});

export const {
    setParticipants,
    setFilters,
    setLoading,
    setError,
    setPagination,
    resetFilters,
} = participantSlice.actions;

export default participantSlice.reducer;