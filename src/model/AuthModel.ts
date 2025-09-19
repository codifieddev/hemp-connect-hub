// Import User and UserProfile types


export interface LoginCredentials {
  email: string;
  password: string;
}


export class AuthError extends Error {
  public status?: number;
  public code?: string;

  constructor(error: { message: string; status?: number; code?: string }) {
    super(error.message);
    this.name = "AuthError";
    this.status = error.status;
    this.code = error.code;

    // Maintains proper stack trace for where our error was thrown (only available on V8)
    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, AuthError);
    }
  }
}

export interface AuthUser {
  id: string;
  aud: string;
  role: string;
  email: string;
  email_confirmed_at: string;
  phone: string;
  confirmed_at: string;
  last_sign_in_at: string;
  app_metadata: {
    provider: string;
    providers: string[];
  };
  user_metadata: {
    email: string;
    email_verified: boolean;
    phone_verified: boolean;
    sub: string;
  };
  identities: Array<{
    identity_id: string;
    id: string;
    user_id: string;
    identity_data: {
      email: string;
      email_verified: boolean;
      phone_verified: boolean;
      sub: string;
    };
    provider: string;
    last_sign_in_at: string;
    created_at: string;
    updated_at: string;
    email: string;
  }>;
  created_at: string;
  updated_at: string;
  is_anonymous: boolean;
}

export interface AuthSessionModel {
  access_token: string;
  token_type: string;
  expires_in: number;
  expires_at: number;
  refresh_token: string;
  user: AuthUser;
  weak_password: string | null;
}


export type UserStatus = "active" | "inactive" | "suspended" | "pending";
export interface User {
  id: string;
  email: string;
  password?: string;
  profile: number;
  is_active?: boolean;
  status?: UserStatus;
  last_login?: string;
  created_at: string;
  modified_at: string;
  role?:string;
  name?: string; // Optional field for display name
  // UUID reference to session
}