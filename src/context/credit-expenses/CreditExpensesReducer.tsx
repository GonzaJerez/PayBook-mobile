import { CreditPayment } from '../../interfaces/CreditExpenses';

export interface CreditExpenseState {
	actualCreditExpense: CreditPayment | null;
	allCreditExpenses: CreditPayment[];
	isLoading: boolean;
}

type CreditExpenseActions =
	| { type: 'setCreditExpenses'; payload: { creditExpenses: CreditPayment[] } }
	| {
			type: 'setActualCreditExpense';
			payload: { creditExpense: CreditPayment };
	  }
	| { type: 'updateCreditExpense'; payload: { creditExpense: CreditPayment } }
	| { type: 'removeCreditExpense'; payload: { idCreditExpense: string } }
	| { type: 'startLoading' }
	| { type: 'finishLoading' };

export const CreditExpensesReducer = (
	state: CreditExpenseState,
	action: CreditExpenseActions
): CreditExpenseState => {
	switch (action.type) {
		case 'setCreditExpenses':
			return {
				...state,
				allCreditExpenses: action.payload.creditExpenses,
			};

		case 'setActualCreditExpense':
			return {
				...state,
				actualCreditExpense: action.payload.creditExpense,
			};

		case 'updateCreditExpense':
			return {
				...state,
				actualCreditExpense: action.payload.creditExpense,
				allCreditExpenses: state.allCreditExpenses.map((credExp) =>
					credExp.id === action.payload.creditExpense.id
						? action.payload.creditExpense
						: credExp
				),
			};

		case 'removeCreditExpense':
			return {
				...state,
				allCreditExpenses: state.allCreditExpenses.filter(
					(credExp) => credExp.id !== action.payload.idCreditExpense
				),
				actualCreditExpense: null,
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
