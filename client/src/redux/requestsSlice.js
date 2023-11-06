import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

//api environment variable
const API_ENDPOINT = import.meta.env.VITE_API_ENDPOINT;

export const fetchRequests = createAsyncThunk(
    'requests/fetchRequests', 
    async () => {
        const response = await axios.get(`${API_ENDPOINT}/api/requests`);
        return response.data.requests;
    }
);

export const createNewRequest = createAsyncThunk(
    'requests/createNewRequest', 
    async({ name, email, reason, date }) => {
        const reqBody = { name, email, reason, date };
        const reponse = await axios.post(`${API_ENDPOINT}/api/requests/create_request`, reqBody);
        return reponse.data;
    }
);

export const updateRequest = createAsyncThunk(
    'requests/updateRequest',
    async ({ id, status }) => {
        const reqBody = { id, status };
        const reponse = await axios.patch(`${API_ENDPOINT}/api/requests/${id}`, reqBody);
        return reponse.data;
    }
)

const requestsSlice = createSlice({
    name: 'requests',
    initialState: {
        list: []
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchRequests.fulfilled, (state, action) => {
                state.list = action.payload;
            })
            .addCase(createNewRequest.fulfilled, (state, action) => {
                state.list.push(action.payload);
            })
            .addCase(updateRequest.fulfilled, (state, action) => {
                state.list.map((request) => {
                    if (request.id === action.payload.id) {
                        request.status = action.payload.status;
                    }
                })
            })
    }
});

export const selectRequests = (state) => state.requests.list;
export default requestsSlice.reducer;