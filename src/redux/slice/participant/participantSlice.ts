import { Participant, ParticipantFilters } from "@/types/participant";

import { createSlice, PayloadAction } from "@reduxjs/toolkit";

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
};

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