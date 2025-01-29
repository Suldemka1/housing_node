declare module 'express-session' {
  interface SessionData {
    views: number;
    token: string;
    accountability: IAccountability;
  }
}

export {};
