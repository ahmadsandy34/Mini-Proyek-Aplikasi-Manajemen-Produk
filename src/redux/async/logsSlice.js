import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const API_URL = "http://localhost:3000/logs";

export const fetchLogs = createAsyncThunk("products/fetchLogs", async () => {
    const response = await axios.get(API_URL);
    return response.data;
});
export const addLog = createAsyncThunk("products/addLog", async (log) => {
    const response = await axios.post(API_URL, log);
    return response.data;
});

const initialState = {
    logs: [],
    loading: false,
    error: null,
    isSuccess: false,
};

const productsSlice = createSlice({
    name: "logs",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(fetchLogs.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(fetchLogs.fulfilled, (state, action) => {
            state.loading = false;
            state.logs = action.payload;
        });
        builder.addCase(fetchLogs.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload || "Something went wrong";
        });
        // add product
        builder.addCase(addLog.pending, (state) => {
            state.loading = true;
            state.isSuccess = false;
        });
        builder.addCase(addLog.fulfilled, (state) => {
            state.loading = false;
            state.isSuccess = true;
        });
        builder.addCase(addLog.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload || "Something went wrong";
        });
    },
});

export default productsSlice.reducer;
