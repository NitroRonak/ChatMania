interface UserInfo {
    id: string;
    email: string;
    profileSetup: boolean;
    firstName?:string;
    lastName?:string;
    color?:number;
    image?:string | null;

}

export interface AuthSlice {
    userInfo: UserInfo | undefined;
    setUserInfo: (userInfo: UserInfo | undefined) => void;
}

export const createAuthSlice = (set: (partialState: Partial<AuthSlice>) => void): AuthSlice => ({
    userInfo: undefined,
    setUserInfo: (userInfo) => set({ userInfo }),
});
