import { createSlice } from "@reduxjs/toolkit";

// Initial state
const initialState = {
  button: false,
  winner: {
    playersObj: {
      player1: false,
      item1: "",
      player2: false,
      item2: "",
      fullObj: {
        item1: "",
        item2: "",
        player1: false,
        player2: false,
      },
    },
  },
  borderColor: "blue",
  scorePlayerNum: 0,
  scoreComputerNum: 0,
  scorePlayerArr: ["0"],
  scoreComputerArr: ["0"],
  theme: {
    light: {
      active: true,
      background: "orange",
    },
    dark: {
      active: false,
      background: "#222222",
    },
  },
};

// Create the slice
const gameSlice = createSlice({
  name: "game",
  initialState,
  reducers: {
    // Non-async reducers
    toggle: (state, action) => {
      state.button = action.payload;
    },
    winner: (state, action) => {
      state.winner = action.payload;
    },
    borderColor: (state, action) => {
      state.borderColor = action.payload;
    },
    changeTheme: (state, action) => {
      if (action.payload === "light") {
        state.theme.light.active = true;
        state.theme.dark.active = false;
      } else {
        state.theme.dark.active = true;
        state.theme.light.active = false;
      }
    },
    incrementPlayerScore: (state) => {
      state.scorePlayerNum += 1;
      state.scorePlayerArr = state.scorePlayerNum.toString().split("");
    },
    incrementComputerScore: (state) => {
      state.scoreComputerNum += 1;
      state.scoreComputerArr = state.scoreComputerNum.toString().split("");
    },
  },
  extraReducers: (builder) => {
    // Add cases for async actions here using the builder callback notation
    // builder.addCase(someAsyncAction.fulfilled, (state, action) => {
    //   // Handle async action
    // });
  },
});

// Export actions and reducer
export const {
  toggle,
  winner,
  borderColor,
  incrementPlayerScore,
  incrementComputerScore,
  changeTheme,
} = gameSlice.actions;

export default gameSlice.reducer;
