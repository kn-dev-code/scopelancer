export type RegisterUser = {
  email: string;
  password: string;
};

export type LoginUser = {
  email: string;
  password: string;
};

export type User = {
  id: string;
  email: string;
  createdAt: Date;
  updatedAt: Date;
  emailVerified: boolean;
  name: string;
  image?: string | null | undefined;
};
