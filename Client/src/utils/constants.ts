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

export const MESSAGE_ROUTES:string = `/api/messages`
export const GET_MESSAGES_ROUTE:string = `${MESSAGE_ROUTES}/get-messages`

export const GET_CONTACTS_FOR_DM_LIST_ROUTE:string = `${CONTACT_ROUTES}/get-contacts-for-dm`

export const UPLOAD_FILE_ROUTE:string = `${MESSAGE_ROUTES}/upload-file`

export const GET_ALL_CONTACTS_ROUTE:string = `${CONTACT_ROUTES}/get-all-contacts`

export const CHANNEL_ROUTES:string = `/api/channel`
export const CREATE_CHANNEL_ROUTE:string = `${CHANNEL_ROUTES}/create-channel`
export const GET_USER_CHANNELS_ROUTE:string = `${CHANNEL_ROUTES}/get-user-channels`

export const GET_CHANNEL_MESSAGES_ROUTE:string = `${CHANNEL_ROUTES}/get-channel-messages`
