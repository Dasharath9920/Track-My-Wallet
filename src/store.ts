import { configureStore } from "@reduxjs/toolkit";
import { StoreActions, type InitialState } from "./datatypes"
import { getEmptyStats } from "./utils";

const initialState: InitialState = {
  user: null,
  payments: [] = [],
  transactions: [],
  statistics: getEmptyStats(),
  overviewChart: [],
  pieChart: [],
  upcomingPayments: [],
  hideAmount: true,
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
    case StoreActions.UPDATE_STATISTICS: {
      return { ...state, statistics: action.data };
    }
    case StoreActions.UPDATE_OVERVIEW_CHART: {
      return { ...state, overviewChart: action.data };
    }
    case StoreActions.UPDATE_PIE_CHART: {
      return { ...state, pieChart: action.data };
    }
    case StoreActions.UPDATE_UPCOMING_PAYMENTS: {
      return { ...state, upcomingPayments: action.data };
    }
    case StoreActions.UPDATE_HIDE_AMOUNT: {
      return { ...state, hideAmount: action.data };
    }
    default: return state;
  }
}

const store = configureStore({ reducer });

export default store;