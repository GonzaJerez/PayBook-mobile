import { Expense, PrincipalAmountsResponse } from '../../interfaces/Expense';

export interface ExpensesState {
	lastExpenses: Expense[];
	actualExpense: Expense | null;
	principalAmounts: PrincipalAmountsResponse;
	isLoading: boolean;
}

type ExpensesActions =
	| {
			type: 'setPrincipalAmounts';
			payload: { principalAmounts: PrincipalAmountsResponse };
	  }
	| { type: 'setLastExpenses'; payload: { lastExpenses: Expense[] } }
	| { type: 'setExpense'; payload: { expense: Expense } }
	| { type: 'createExpense'; payload: { expense: Expense } }
	| { type: 'updateExpense'; payload: { expense: Expense } }
	| { type: 'removeExpense'; payload: { expense: Expense } }
	| { type: 'startLoading' }
	| { type: 'finishLoading' };

export const ExpensesReducer = (
	state: ExpensesState,
	action: ExpensesActions
): ExpensesState => {
	const currentDate = new Date();

	switch (action.type) {
		case 'setPrincipalAmounts':
			return {
				...state,
				principalAmounts: action.payload.principalAmounts,
			};

		case 'setLastExpenses':
			return {
				...state,
				lastExpenses: action.payload.lastExpenses,
			};

		case 'setExpense':
			return {
				...state,
				actualExpense: action.payload.expense,
			};

		case 'createExpense':
			return {
				...state,
				actualExpense: null,
				lastExpenses: [...state.lastExpenses, action.payload.expense].sort(
					(a, b) => (a.complete_date < b.complete_date ? 1 : -1)
				),
			};

		case 'updateExpense':
			return {
				...state,
				actualExpense: action.payload.expense,
				lastExpenses: state.lastExpenses
					.map((expense) =>
						expense.id === action.payload.expense.id
							? action.payload.expense
							: expense
					)
					.sort((a, b) => (a.complete_date < b.complete_date ? 1 : -1)),
			};

		case 'removeExpense':
			return {
				...state,
				lastExpenses: state.lastExpenses.filter(
					(expense) => expense.id !== action.payload.expense.id
				),
				actualExpense: null,
			};

		case 'startLoading':
			return {
				...state,
				isLoading: true,
			};

		case 'finishLoading':
			return {
				...state,
				isLoading: false,
			};

		default:
			return state;
	}
};
