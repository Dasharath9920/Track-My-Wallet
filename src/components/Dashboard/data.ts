export const data = [
  {
    heading: 'Total Balance',
    title: '₹8420',
    subTitle: '+₹1230 This Month',
    backgroundColor: '#3f6e86',
  },
  {
    heading: 'Monthly Spending',
    title: '₹2350',
    subTitle: '-₹1210 This Month',
    backgroundColor: '#515f90',
  },
  {
    heading: 'Top Category',
    title: 'Food & Dining',
    subTitle: '+₹4500 This Month',
    backgroundColor: '#c88d2b',
  },
  {
    heading: 'Upcoming Bills',
    title: '3 Bills Due',
    subTitle: '₹14700',
    backgroundColor: '#97385b',
  },
]

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
  Entertainment: "#C026D3",      // neon–purple nightlife · fun
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