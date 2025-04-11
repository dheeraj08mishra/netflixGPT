import { createSlice } from "@reduxjs/toolkit";

const gptSlice = createSlice({
  name: "gpt",
  initialState: {
    gptResponse: [], // <-- changed from null to []
    loading: false,
    error: null,
  },
  reducers: {
    setGptResponse: (state, action) => {
      state.gptResponse = action.payload;
    },
    setLoading: (state) => {
      state.loading = !state.loading;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
  },
});

export const { setGptResponse, setLoading, setError } = gptSlice.actions;
export default gptSlice.reducer;
