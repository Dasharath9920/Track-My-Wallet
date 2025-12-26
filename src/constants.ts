import { AMOUNT_CATEGORIES } from "./components/Dashboard/data";
import type { AmountByCategory } from "./datatypes";

export const USERID = 'user_id';

export const initialTotals: AmountByCategory = Object.keys(AMOUNT_CATEGORIES)
  .reduce((acc, key) => {
    acc[AMOUNT_CATEGORIES[key]] = 0;
    return acc;
  }, {} as AmountByCategory);