export const HOST: string = import.meta.env.VITE_SERVER_URL
export const AUTH_ROUTES: string = `/api/auth`
export const CONTACT_ROUTES: string = `/api/contacts`
export const SIGNUP_ROUTE: string = `${AUTH_ROUTES}/signup`
export const SIGNIN_ROUTE: string = `${AUTH_ROUTES}/login`
export const GET_USER_INFO:string = `${AUTH_ROUTES}/user-info`

export const UPDATE_PROFILE_ROUTE:string = `${AUTH_ROUTES}/update-profile`

export const UPDATE_PROFILE_IMAGE_ROUTE:string = `${AUTH_ROUTES}/update-profile-image`

export const REMOVE_PROFILE_IMAGE_ROUTE:string = `${AUTH_ROUTES}/remove-profile-image`

export const LOGOUT_ROUTE:string = `${AUTH_ROUTES}/logout`

export const SEARCH_CONTACT_ROUTE:string = `${CONTACT_ROUTES}/search`   