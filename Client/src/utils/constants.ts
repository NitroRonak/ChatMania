export const HOST: string = import.meta.env.VITE_SERVER_URL
export const AUTH_ROUTES: string = `/api/auth`
export const SIGNUP_ROUTE: string = `${AUTH_ROUTES}/signup`
export const SIGNIN_ROUTE: string = `${AUTH_ROUTES}/login`
export const GET_USER_INFO = `${AUTH_ROUTES}/user-info`