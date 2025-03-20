import { createSlice } from '@reduxjs/toolkit';

const requestSlice = createSlice({
  name: 'request', 
  initialState: [], 
  reducers: {
    addRequests: (state, action) => {
      return action.payload; // Overwrite with new requests
    },
    removeRequest: (state, action) => {
      return state.filter(r => r._id !== action.payload); // Remove specific request
    }
  }
});

export const { addRequests, removeRequest } = requestSlice.actions;
export default requestSlice.reducer;
