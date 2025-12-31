
export const AMOUNT_CATEGORIES: { [key: string]: string } = {
  SALARY: "Salary",
  GROCERIES: "Groceries",
  FOOD: "Food",
  ENTERTAINMENT: "Entertainment",
  SHOPPING: "Shopping",
  RENT: "Rent",
  TRANSPORTATION: "Transportation",
  FAMILY: "Family",
  INSURANCE: "Insurance",
  HEALTH: "Health",
  SAVINGS: "Savings",
  DEBT: "Debt",
  OTHER: "Other",
};

export const CATEGORY_COLORS: Record<string, string> = {
  Groceries: "#4CAF50",          // deep organic green · fresh essentials
  Food: "#FF5722",               // rich burnt orange · restaurant vibrance
  Entertainment: "#a639b4ff",      // neon–purple nightlife · fun
  Shopping: "#E11D48",           // luxury ruby pink · bold spending
  Rent: "#D97706",               // deep amber · recurring + priority
  Transportation: "#0284C7",     // deep sky blue · movement
  Family: "#1D4ED8",             // trust blue · warmth + security
  Insurance: "#6D28D9",          // royal violet · protection & premium
  Health: "#B91C1C",             // strong medical danger red
  Savings: "#059669",            // dark emerald · growth + security
  Debt: "#DC2626",               // danger red · financial alert
  Other: "#6B7280",              // elegant muted slate gray
};

export const TIME_PERIODS = [
  {
    label: "7 Days",
    value: 7,
    id: "dataFor7Days",
  },
  {
    label: "30 Days",
    value: 30,
    id: "dataFor30Days",
  },
  {
    label: "6 Months",
    value: 6 * 30,
    id: "dataFor6Months",
  },
  {
    label: "1 Year",
    value: 12 * 30,
    id: "dataFor12Months",
  },
  {
    label: "5 Years",
    value: 5 * 365,
    id: "dataFor5Years",
  },
];

export const MENU_LIST: Array<string> = ['Logout'];

export const MENU_ICON = 'https://img.icons8.com/ios-glyphs/30/menu--v1.png';
export const LOGOUT_ICON = 'https://img.icons8.com/fluency-systems-filled/96/ff5b5b/exit.png';
export const EIDT_ICON = 'https://img.icons8.com/material-rounded/48/25ab55/create-new.png';
export const DELETE_ICON = 'https://img.icons8.com/material/48/ff797e/filled-trash.png';