import { configureStore } from "@reduxjs/toolkit";
import gameReducer from "@redux/elementsStates";

const store = configureStore({
    reducer: {
        gameElement: gameReducer,
    },
});

export default store;
