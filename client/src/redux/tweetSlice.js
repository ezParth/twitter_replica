import { createSlice } from "@reduxjs/toolkit";

const tweetSlice = createSlice({
    name: "tweet",
    initialState: {
        tweets: null,
    },
    reducers:{
        getAllTweet:(state, action) => {
            state.tweets = action.payload;
        }
    }
})

export const {getAllTweet} = tweetSlice.actions;
export default tweetSlice.reducer;