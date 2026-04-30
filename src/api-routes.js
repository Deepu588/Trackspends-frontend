/*
AUTHENTICATION RELATED ENDPOINTS
*/

export const REGISTER="/api/auth/register"
export const EMAIL_VERIFICATION="/api/auth/verify-email"
export const AUTHENTICATION_REFRESH_CREATE = "/api/auth/refresh/";
export const LOGIN="/api/auth/login"
export const FORGOT_PASSWORD_CREATE = "/api/auth/forgot-password";
export const RESET_PASSWORD_CREATE = "/api/auth/reset-password";
export const LOGOUT="/api/auth/logout"

/*
EXPENSES RELATED ENDPOINTS
*/

export const SAVE_EXPENSE="/api/expense/saveExpense"
export const UPDATE_EXPENSE="/api/expense/updateExpense/"
export const DELETE_EXPENSE="/api/expense/deleteExpense/"
export const GET_EXPENSE_BY_ID="/api/expense/getExpense/"
export const GET_ALL_EXPENSES="/api/expense/getAllExpense"
export const GET_ALL_EXPENSES_WITHIN_RANGE="/api/expense/getExpensesInRange"
export const GET_MONTHLY_SAVINGS="/api/expense/getMonthlySavings"

// DASHBOARD RELATED ENDPOINTS
export const GET_CURRENT_WEEK_EXPENSES_PER_DAY="/api/expense/amountSpentInCurrentWeek"
export const TOTAL_AMOUNT_SPENT_PER_CATEGORY="/api/expense/totalAmountSpentPerCategory"
export const TOTAL_EXPENSES_TODAY="/api/expense/todayTotalExpenses"


/*
FEEDBACK RELATED ENDPOINTS
*/

export const SAVE_FEEDBACK="/api/feedback/save"
export const GET_ALL_FEEDBACKS="/api/feedback/getAllFeedbacks"

/*
USER RELATED ENDPOINTS
*/

export const UPDATE_SALARY_OF_USER="/api/auth/updateSalary"

/*
AI ADVISOR RELATED ENDPOINTS
*/

export const ASK_AI="/api/ai/ask"
export const GET_AI_HISTORY="/api/ai/history"


