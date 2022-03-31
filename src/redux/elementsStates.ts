// Redux
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

// Initial state and reducers
export const gameSlice = createSlice({
  name: "gameReducers",
  initialState: initialState,
  reducers: {
    // Add your non-async reducers here
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
        state.theme.light.active = action.payload;
        state.theme.dark.active = !action.payload;
      } else {
        state.theme.dark.active = action.payload;
        state.theme.light.active = !action.payload;
      }
    },
    incrementPlayerScore: (state) => {
      // Increment player's score
      state.scorePlayerNum += 1;

      // Score string to array
      const a = state.scorePlayerNum.toString();
      state.scorePlayerArr = a.split("");
    },
    incrementComputerScore: (state) => {
      // Increment player's score
      state.scoreComputerNum += 1;

      // Score string to array
      const a = state.scoreComputerNum.toString();
      state.scoreComputerArr = a.split("");
    },
  },
  extraReducers: {},
});

// Each case under reducers becomes an action
export const {
  toggle,
  winner,
  borderColor,
  incrementPlayerScore,
  incrementComputerScore,
  changeTheme,
} = gameSlice.actions;

export default gameSlice.reducer;
