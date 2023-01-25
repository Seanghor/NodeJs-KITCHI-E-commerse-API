import { RoleEnumType } from "@prisma/client";
import { Decimal } from "@prisma/client/runtime";

export interface TokenPayload {
  exp: number;
  username: string;
  email: string;
  phone: string;
  Role: string;
  userId: number;
  jti?: string;
}


export interface AdminCredentialInput {
  username: string;
  email: string;
  password: string;
  phone: string;
}

export interface CustomerRegister {
  username: string;
  email: string;
  password: string;
  phone: string;
  Role: RoleEnumType;
  work: string;
  street: number;
  zipcode: number;
  city: string;
  province: string
}

export interface ProductCreateInput {
  name: string;
  description: string;
  category_id: number;
  discount_id: number;
  discount_active: boolean;
  price: Decimal;
  quantity: number;
  createByAdminId: number;
  modifiedByIdminId: number;
}

export interface ProductOutput {
  id: number;
  name: string;
  description: string;
  category: string;
  discount_percent: number;
  discount_active: boolean;
  price: Decimal;
  discount_price: Decimal;
  quantity: number;
}
declare global {
  namespace Express {
    interface Request {
      payload: TokenPayload;
    }
  }
}
