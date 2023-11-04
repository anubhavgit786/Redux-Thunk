import { createSlice } from "@reduxjs/toolkit";
import { convertor } from "../../../utilities";

const initialState = { balance : 0, loan: 0, loanPurpose: "", isLoading: false };

const accountSlice = createSlice(
{
    name: "account",
    initialState, 
    reducers: 
    {
        deposit(state, action)
        {
            state.balance += action.payload;
            state.isLoading = false;
        },

        withdraw(state, action)
        {
            if(action.payload > state.balance)
            {
                return;
            }

            state.balance -= action.payload;
        },

        requestLoan:
        {
            prepare(amount, purpose)
            {
                return { payload: { amount, purpose } };
            },

            reducer(state, action)
            {
                if(state.loan > 0)
                {
                    return;
                }

                state.loan = action.payload.amount;
                state.loanPurpose = action.payload.purpose;
                state.balance += action.payload.amount;
            }
        }, 

        payLoan(state, action) 
        {
            state.balance -= state.loan;
            state.loan =  0;
            state.loanPurpose = "";

        }, 

        convertingCurrency(state, action)
        {
            state.isLoading = true;
        }

    }  
});


export const { withdraw, requestLoan, payLoan } = accountSlice.actions;

export const deposit = (amount, currency)=>
{
    if(currency === "USD")
    {
        return { type: "account/deposit", payload: amount };
    }

    return async (dispatch, getState)=>
    {
        dispatch({ type: "account/convertingCurrency" });
        const convertedAmount = await convertor(amount, currency);
        dispatch({ type: "account/deposit", payload: convertedAmount });
    }
}

export default accountSlice.reducer;




