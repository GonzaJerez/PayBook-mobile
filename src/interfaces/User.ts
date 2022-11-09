// Generated by https://quicktype.io

import {Account} from "./Account";
import {ValidRoles} from "./ValidRoles";

export interface UserResponse {
    user:      User;
    token:     string;
    statusCode?: number;
    message?:   string;
    error?:     string
}

export interface User {
    email:    string;
    fullName: string;
    accounts: Account[];
    id:       string;
    isActive: boolean;
    roles:    ValidRoles[];
    google:   boolean;
}

export interface CreateUser{
    fullName:   string;
    email1:     string;
    email2:     string;
    password1:  string;
    password2:  string;
}

export interface UpdateUser {
    email?:    string;
    fullName?: string;
    password?: string;
    newPassword?: string;
}