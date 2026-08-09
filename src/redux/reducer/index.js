import { combineReducers } from "@reduxjs/toolkit";
import flightReducer from "../slices/flightSlice";
import authReducer from "../slices/auth";
import hotelReducer from '../slices/hotelSlice'
import loginReducer from '../slices/login';

// import flightReducer from "../slices/flightSlice";


const rootReducer = combineReducers({
  flight: flightReducer,
  auth:authReducer,
  hotel:hotelReducer,
  authenticate: loginReducer,

});

export default rootReducer;
