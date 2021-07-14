import {combineReducers} from "redux";
import userReducer from "./userReducer";
import eventReducer from "./eventReducer";
import ticketVariantReducer from "./ticketVariantReducer";
import orderReducer from "./orderReducer";
import authReducer from "./authReducer";

export default combineReducers({
    userData:          userReducer,
    eventData:         eventReducer,
    orderData:         orderReducer,
    ticketVariantData: ticketVariantReducer,
    authData:          authReducer
});
