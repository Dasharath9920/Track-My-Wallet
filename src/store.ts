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
    case StoreActions.UPDATE_PAYMENTS: {
      return { ...state, payments: action.data };
    }
    case StoreActions.UPDATE_TRANSACTIONS: {
      return { ...state, transactions: action.data };
    }
    default: return state;
  }
}

const store = configureStore({ reducer });

export default store;