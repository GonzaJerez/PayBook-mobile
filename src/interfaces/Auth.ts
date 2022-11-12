

export interface LoginUser {
  email: string;
  password: string;
}

export interface PasswordRecovery {
  email: string;
}

export interface ValidateSecurityCode {
  code: string;
  email: string;
}

export interface RenewPassword {
  email: string;
  password: string;
}

export interface ForgotPasswordResponse {
  ok: boolean;
  message: string;
  statusCode?: number;
  error?:     string;
}