import { createContext, useContext, useEffect, useReducer } from 'react';
import {
	createAccountApi,
	getAccountsApi,
	joinToAccountApi,
	leaveAccountApi,
	pushoutApi,
	removeAccountApi,
	updateAccountApi,
} from '../../api/accounts-api';
import {
	AccountResponse,
	CreateAccount,
	GetAccountsProps,
	UpdateAccount,
} from '../../interfaces/Account';
import { AuthContext } from '../auth/AuthContext';
import { RequestsStatusContext } from '../requests-status/RequestsStatusContext';
import { AccountsReducer, AccountsState } from './AccountsReducer';

interface AccountsContextProps extends AccountsState {
	changeActualAccount: (idAccount: string) => void;
	createAccount: (body: CreateAccount) => Promise<string | undefined>;
	updateAccount: (body: UpdateAccount) => Promise<string | undefined>;
	updateUsersInAccount: (
		body: UpdateAccount,
		uids: string[]
	) => Promise<string | undefined>;
	joinToAccount: (access_key: string) => Promise<string | undefined>;
	leaveAccount: () => Promise<string | undefined>;
	removeAccount: () => Promise<string | undefined>;
}

const initialValues: AccountsState = {
	actualAccount: null,
	allAccounts: [],
	isLoading: false,
};

export const AccountsContext = createContext({} as AccountsContextProps);

export const AccountsProvider = ({
	children,
}: {
	children: JSX.Element | JSX.Element[];
}) => {
	const { token } = useContext(AuthContext);
	const { showNotification, handleConnectionFail } = useContext(
		RequestsStatusContext
	);

	const [state, dispatch] = useReducer(AccountsReducer, initialValues);

	useEffect(() => {
		setAccounts();
	}, []);

	const setAccounts = async () => {
		if (!token) return;
		startLoading()
		try {
			const resp: GetAccountsProps = await getAccountsApi(token);
			if (!resp.message) {
				dispatch({ type: 'setAccounts', payload: { accounts: resp.accounts } });
			}
		} 
		catch (error) {
			handleConnectionFail();
		}
		finally{
			finishLoading()
		}
	};

	const changeActualAccount = (idAccount: string) => {
		dispatch({ type: 'changeActualAccount', payload: { idAccount } });
	};

	const createAccount = async (body: CreateAccount) => {
		if (!token) return;

		startLoading();

		try {
			const resp: AccountResponse = await createAccountApi(body, token);
			if (resp.message) {
				return resp.message;
			} else {
				dispatch({ type: 'createAccount', payload: { account: resp.account } });
				showNotification('Cuenta creada');
			}
		} catch (error) {
			handleConnectionFail();
		} finally {
			finishLoading();
		}
	};

	const updateAccount = async (body: UpdateAccount) => {
		if (!state.actualAccount || !token) return;

		startLoading();

		try {
			const resp: AccountResponse = await updateAccountApi(
				body,
				state.actualAccount.id,
				token
			);
      
			if (resp.message) {
				return resp.message;
			} else {
				dispatch({ type: 'updateAccount', payload: { account: resp.account } });
				showNotification('Cuenta actualizada');
			}
		} catch (error) {
			handleConnectionFail();
		} finally {
			finishLoading();
		}
	};

	const updateUsersInAccount = async (body: UpdateAccount, uids: string[]) => {
		if (!state.actualAccount || !token) return;

		startLoading();

		try {
			const respUpdate: AccountResponse = await updateAccountApi(
				body,
				state.actualAccount.id,
				token
			);
			const respPushout: AccountResponse = await pushoutApi(
				uids,
				state.actualAccount.id,
				token
			);
			if (respPushout.error) {
				return respPushout.message;
			} else if (respUpdate.error) {
				return respUpdate.message;
			} else {
				dispatch({
					type: 'updateAccount',
					payload: { account: respPushout.account },
				});
				showNotification('Cuenta actualizada');
			}
		} catch (error) {
			handleConnectionFail();
		} finally {
			finishLoading();
		}
	};

	const joinToAccount = async (access_key: string) => {
		if (!token) return;

		startLoading();

		try {
			const resp: AccountResponse = await joinToAccountApi(access_key, token);
			
			if (resp.message) {
				return resp.message;
			} else {
				dispatch({ type: 'joinToAccount', payload: { account: resp.account } });
				showNotification('Te uniste a la cuenta');
			}
		} catch (error) {
			handleConnectionFail();
		} finally {
			finishLoading();
		}
	};

	const leaveAccount = async () => {
		if (!state.actualAccount || !token) return;

		startLoading();

		try {
			const resp: AccountResponse = await leaveAccountApi(
				state.actualAccount.id,
				token
			);
			if (resp.message) {
				return resp.message;
			} else {
				dispatch({
					type: 'leaveAccount',
					payload: { idAccount: state.actualAccount.id },
				});
				showNotification('Abandonaste la cuenta');
			}
		} catch (error) {
			handleConnectionFail();
		} finally {
			finishLoading();
		}
	};

	const removeAccount = async () => {
		if (!state.actualAccount || !token) return;

		startLoading();

		try {
			const resp: AccountResponse = await removeAccountApi(
				state.actualAccount.id,
				token
			);
			if (resp.message) {
				return resp.message;
			} else {
				dispatch({
					type: 'leaveAccount',
					payload: { idAccount: state.actualAccount.id },
				});
				showNotification('Cuenta eliminada');
			}
		} catch (error) {
			handleConnectionFail();
		} finally {
			finishLoading();
		}
	};

	const startLoading = () => {
		dispatch({ type: 'startLoading' });
	};

	const finishLoading = () => {
		dispatch({ type: 'finishLoading' });
	};

	return (
		<AccountsContext.Provider
			value={{
				...state,
				changeActualAccount,
				createAccount,
				updateAccount,
				updateUsersInAccount,
				joinToAccount,
				leaveAccount,
				removeAccount,
			}}
		>
			{children}
		</AccountsContext.Provider>
	);
};
