export type User = {
  _id: string;
  email: string;
  emailVerified: boolean;
  provider: string;
  providerId: string | null;
  password: string;
};
