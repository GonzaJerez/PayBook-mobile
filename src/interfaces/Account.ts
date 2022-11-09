import {Category} from "./Category";
import {User} from "./User";

export interface Account {
    name:          string;
    description:   string;
    access_key:    string;
    categories:    Category[];
    id:            string;
    max_num_users: number;
    isActive:      boolean;
    users:         User[];
    creator_user:  User;
    admin_user:    User;
}

export interface GetAccountsProps {
    accounts:      Account[];
    totalAccounts?:number;
    statusCode?:   number;
    message?:      string;
    error?:        string
}

export interface AccountResponse {
    account:       Account;
    statusCode?:   number;
    message?:      string;
    error?:        string
}

export interface CreateAccount {
    name:           string;
    description?:   string;
    max_num_users?: number;
}

export interface UpdateAccount {
    name?:          string;
    description?:   string;
    max_num_users?: number; 
}