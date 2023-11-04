import { ACCOUNT_DEPOSIT, ACCOUNT_WITHDRAW, ACCOUNT_REQUEST_LOAN, ACCOUNT_PAY_LOAN } from "./actions";
import { convertor } from "../../../utilities";

export const deposit = (amount, currency)=>
{
    if(currency === "USD")
    {
        return { type: ACCOUNT_DEPOSIT, payload: amount };
    }

    return async (dispatch, getState)=>
    {
        const convertedAmount = await convertor(amount, currency);
        dispatch({ type: ACCOUNT_DEPOSIT, payload: convertedAmount });
    }
}

export const withdraw = (amount)=>
{
    return { type: ACCOUNT_WITHDRAW, payload: amount };
}

export const requestLoan = (amount, purpose)=>
{
    return { type: ACCOUNT_REQUEST_LOAN, payload: { amount, purpose } };
}

export const payLoan = ()=>
{
    return { type: ACCOUNT_PAY_LOAN };
}


const initialState = { balance: 0, loan: 0, loanPurpose: "" };

const accountReducer = (state = initialState, action) =>
{
    switch(action.type)
    {
        case ACCOUNT_DEPOSIT:
            return { ...state, balance: state.balance + action.payload};
        case ACCOUNT_WITHDRAW:
            return action.payload > state.balance ? state : { ...state, balance: state.balance - action.payload};
        case ACCOUNT_REQUEST_LOAN:
            return state.loan > 0 ? state: {...state, loan: action.payload.amount, loanPurpose: action.payload.purpose, balance: state.balance + action.payload.amount };
        case ACCOUNT_PAY_LOAN:
            return { ...state, loan: 0, loanPurpose : "", balance: state.balance - state.loan };
        default:
            return state;
    }
}

export default accountReducer;