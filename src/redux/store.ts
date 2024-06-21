import { configureStore } from "@reduxjs/toolkit";
import gameReducer from "@redux/elementsStates";

const store = configureStore({
    reducer: {
        game: gameReducer,
    },
});

export default store;
