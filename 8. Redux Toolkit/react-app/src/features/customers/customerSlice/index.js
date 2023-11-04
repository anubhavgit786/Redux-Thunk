import { CUSTOMER_CREATE_CUSTOMER, CUSTOMER_UPDATE_NAME } from "./actions";

export const createCustomer = (fullName, nationalID)=>
{
    return { type: CUSTOMER_CREATE_CUSTOMER, payload: { fullName, nationalID, createdAt : new Date().toISOString() } };
}

export const updateCustomer = (fullName)=>
{
    return { type: CUSTOMER_UPDATE_NAME, payload: fullName };
}


const initialState = { fullName: "", nationalID: "", createdAt: "" };

const customerReducer = (state = initialState, action) =>
{
    switch(action.type)
    {
        case CUSTOMER_CREATE_CUSTOMER:
            return { ...state, fullName: action.payload.fullName, nationalID: action.payload.nationalID, createdAt: action.payload.createdAt };
        case CUSTOMER_UPDATE_NAME:
            return { ...state, fullName: action.payload };
        default:
            return state;
    }
}


export default customerReducer;