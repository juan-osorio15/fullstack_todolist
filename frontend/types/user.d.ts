export type User = {
  id: number;
  username: string;
  email: string;
};

export type LoginResponse = {
  data: {
    token: string;
    user: User;
  };
};
