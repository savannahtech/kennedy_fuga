import Cookie from "js-cookie";
import SSRCookie from "cookie";
import {
  AUTH_CRED,
  PERMISSIONS,
  STAFF,
  STORE_OWNER,
  SUPER_ADMIN,
  TOKEN,
} from "./constants";
import { Shop } from "@/ts-types/generated";

export const allowedRoles = [SUPER_ADMIN, STORE_OWNER, STAFF];
export const adminAndOwnerOnly = [SUPER_ADMIN, STORE_OWNER];
export const adminOwnerAndStaffOnly = [SUPER_ADMIN, STORE_OWNER, STAFF];
export const adminOnly = [SUPER_ADMIN];
export const ownerOnly = [STORE_OWNER];

interface IMeData {
  _id: string
  first_name: string;
  last_name: string;
  other_names?: string;
  email: string;
  password?: string;
  profile?: any;
  permission: string[];
  is_active: boolean;
  shop_id: string;
  shops?: [Shop]
  managed_shop?: Shop;
  address: [];
  created_at: string | Date;
  updated_at: string | Date;
}
export function setAuthCredentials(
  token: string,
  permissions: any,
  meData: IMeData
) {
  Cookie.set(AUTH_CRED, JSON.stringify({ token, permissions, meData }));
}

export function getAuthCredentials(context?: any): {
  token: string | null;
  permissions: string[] | null;
  meData: IMeData | null
} {
  let authCred;
  if (context) {
    authCred = parseSSRCookie(context)[AUTH_CRED];
  } else {
    authCred = Cookie.get(AUTH_CRED);
  }
  if (authCred) {
    return JSON.parse(authCred);
  }
  return { token: null, permissions: null, meData: null };
}

export function parseSSRCookie(context: any) {
  return SSRCookie.parse(context.req.headers.cookie ?? "");
}

export function hasAccess(
  _allowedRoles: string[],
  _userPermissions: string[] | undefined | null
) {
  if (_userPermissions) {
    return Boolean(
      _allowedRoles?.find((aRole) => _userPermissions.includes(aRole))
    );
  }
  return false;
}
export function isAuthenticated(_cookies: any) {
  return (
    !!_cookies[TOKEN] &&
    Array.isArray(_cookies[PERMISSIONS]) &&
    !!_cookies[PERMISSIONS].length
  );
}
