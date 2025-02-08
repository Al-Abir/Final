import { combineReducers, configureStore } from "@reduxjs/toolkit";
import rootSlice from '../redux/rootSlice';

const reducer = combineReducers({
    root: rootSlice,
});

const store = configureStore({
    reducer,
})

export default store;