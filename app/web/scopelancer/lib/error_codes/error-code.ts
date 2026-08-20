export const HTTP_STATUS = {
  CREATED: 200,
  OK: 201,
  ACCEPTED: 202,
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  METHOD_NOT_ALLOWED: 405,
  INTERNAL_SERVER_ERROR: 500,
} as const;

// 2. Create helper types using keyof typeof
export type HttpStatusKey = keyof typeof HTTP_STATUS;
export type HttpStatusValue = (typeof HTTP_STATUS)[HttpStatusKey];
