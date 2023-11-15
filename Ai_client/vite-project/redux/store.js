import { configureStore } from "@reduxjs/toolkit";

import rootReducer from "./reducers/rootReducer";

export default configureStore({
  reducer: rootReducer,
});

// import { createStore } from "redux";
// import reducer from "./reducer";
// import { Reducer } from "react";
// import firstReducer from "./reducer";

// import initialState from "./initialState";

// const store = createStore(firstReducer, initialState);

// export default store;
