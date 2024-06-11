import { configureStore } from "@reduxjs/toolkit";
import gameReducer from "./elementsStates";

const store = configureStore({
    reducer: {
        gameElement: gameReducer,
    },
});

export default store;
