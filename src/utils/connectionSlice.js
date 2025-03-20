import { createSlice } from "@reduxjs/toolkit";

const connectionSlice = createSlice({
    name: "connection",
    initialState: [],
    reducers: {
        addConnections: (state, action) => {
            console.log("Updating Redux state with:", action.payload); // Debugging

            if (Array.isArray(action.payload)) {
                return [...state, ...action.payload]; // ✅ Append if array
            } else if (action.payload) {
                return [...state, action.payload]; // ✅ Handle single user addition
            }
            return state;
        },
        removeConnection: (state, action) => state.filter(c => c._id !== action.payload),
        clearConnections: () => []
    }
});

export const { addConnections, removeConnection, clearConnections } = connectionSlice.actions;
export default connectionSlice.reducer;
