import { configureStore, createSlice } from '@reduxjs/toolkit'
import { InitialState } from "./Typrs";

const initialState: InitialState = {
    videos: [],
    currentPlaying: null,
    searchTerm: "",
    searchResults: [],
    nextPageToken: null,
    recommendedVideos: []
}

const VideoSlice = createSlice({
    name: "videoApp",
    initialState,
    reducers: {},
    extraReducers: (builder) => { }
});

export const store = configureStore({
    reducer: {
        videoApp: VideoSlice.reducer,
    }
})

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;