export interface AuthPayload {
  user: {
    name: string | null;
    email: string | null;
    role: "admin" | "viewer"; 
  };
  token: string;
}

export interface AuthCredentials {
  email: string;
  password: string;
}

export interface RegisterCredentials extends AuthCredentials {
  name: string;
}
