export type User = {
  _id: string;
  email: string;
  emailVerified: boolean;
  provider: string;
  providerId: string | null;
  password?: string;
  payPeriodStart?: number;
  payPeriodType?: string;
  createdAt: Date;
  updateAt: Date;
};

export type Shift = {
  _id: string;
  start: number;
  length: number;
  breaks: number;
  user: string;
  createdAt: Date;
  updateAt: Date;
};
