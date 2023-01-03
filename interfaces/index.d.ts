export interface TokenPayload {
    exp: number;
    email: string;
    role: string;
    userId: number;
    jti?: string;
  }
  declare global {
    namespace Express {
      interface Request {
        payload: TokenPayload;
      }
    }
  }
  