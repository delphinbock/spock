import React from "react";
import ReactDOM from "react-dom";
import "./index.scss";
import App from "./App";
import reportWebVitals from "./reportWebVitals";

// Redux
import { Provider } from "react-redux";

// Measuring Performance (set of useful metrics that aim to capture the user experience of a web page)
import { configureStore } from "@reduxjs/toolkit";

// Redux reducers
import reducerGame from "./redux/elementsStates";

// Redux store
const store = configureStore({
  reducer: {
    gameElement: reducerGame
  },
});

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
