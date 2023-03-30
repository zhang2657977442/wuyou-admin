// @ts-ignore
/* eslint-disable */

declare namespace LoginType {
  type User = {
    id?: string;
    username: string;
    mobile: string;
    avatar: string;
    role: string;
    companyId: string;
    authId: string;
    registerDate: string;
  };

  type LoginResult = {
    token: string;
  };

  type LoginParams = {
    username: string;
    password: string;
  };
}
