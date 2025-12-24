import { configureStore } from "@reduxjs/toolkit";
import { StoreActions, type InitialState } from "./datatypes"

const initialState: InitialState = {
  user: null,
  payments: [],
  transactions: [],
};

const reducer = (state = initialState, action: { data: any, type: StoreActions }) => {
  switch (action.type) {
    case StoreActions.UPDATE_USER: {
      return { ...state, user: action.data };
    }
    case StoreActions.ADD_PAYMENT: {
      const newPayments = [...state.payments, action.data];
      return { ...state, payments: newPayments };
    }
    case StoreActions.ADD_TRANSACTION: {
      const newTransactions = [...state.transactions, action.data];
      return { ...state, transactions: newTransactions };
    }
    default: return state;
  }
}

const store = configureStore({ reducer });

export default store;